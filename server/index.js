const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(`${process.env.STRIPE_SK}`);

// ssl commerce integration
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

// middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("12 server Is Running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a5mfktt.mongodb.net/?retryWrites=true`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    const categoriesCollection = client.db("iceCream").collection("categories");
    const productsCollection = client.db("iceCream").collection("products");
    const cartCollection = client.db("iceCream").collection("cart");
    const orderCollection = client.db("iceCream").collection("order");
    const wishlistCollection = client.db("iceCream").collection("wishlist");
    const districtsCollection = client.db("iceCream").collection("districts");
    const upazilasCollection = client.db("iceCream").collection("upazilas");

    // older
    const usersCollection = client.db("summerCamp").collection("users");
    const instructorCollection = client
      .db("summerCamp")
      .collection("instructors");
    const selectedCollection = client.db("summerCamp").collection("selected");
    const paymentsCollection = client.db("summerCamp").collection("payments");
    const enrolledCollection = client.db("summerCamp").collection("enrolled");

    // get flase sale
    app.get("/flashsale", async (req, res) => {
      const result = await productsCollection
        .find({ flashSale: true })
        .toArray();
      res.send(result);
    });

    // get for you
    app.get("/foryou", async (req, res) => {
      const result = await productsCollection.find({ forYou: true }).toArray();
      res.send(result);
    });

    // payment related work start from here
    const tran_id = new ObjectId().toString();
    app.post("/order", async (req, res) => {
      try {
        const {
          name,
          number,
          userEmail,
          currency,
          district,
          upazila,
          shippingAddress,
          orderName,
        } = req.body;

        const cartItems = await cartCollection
          .find({ userEmail: userEmail, selectStatus: true })
          .toArray();
        console.log(req.body);
        if (!cartItems || cartItems.length === 0) {
          return res.status(404).json({ error: "No items found in the cart" });
        }
        const totalAmount = cartItems.reduce(
          (acc, item) => acc + parseInt(item.price) * parseInt(item.quantity),
          0
        );

        const data = {
          total_amount: totalAmount,
          currency: currency,
          tran_id: tran_id, // use unique tran_id for each api call
          success_url: `http://localhost:5000/payment/success/${tran_id}/${userEmail}`,
          // success_url: `http://localhost:5000/payment/success/${tran_id}`,
          fail_url: `http://localhost:5000/payment/fail/${tran_id}`,
          cancel_url: "http://localhost:3030/cancel",
          ipn_url: "http://localhost:3030/ipn",
          shipping_method: "Courier",
          product_name: orderName,
          product_category: "Electronic",
          product_profile: "general",
          cus_name: name,
          cus_email: userEmail,
          cus_add1: upazila,
          cus_add2: district,
          cus_city: shippingAddress,
          cus_state: district,
          cus_postcode: "1000",
          cus_country: "Bangladesh",
          cus_phone: number,
          cus_fax: "01711111111",
          ship_name: name,
          ship_add1: district,
          ship_add2: upazila,
          ship_city: district,
          ship_state: upazila,
          ship_postcode: 1000,
          ship_country: "Bangladesh",
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then((apiResponse) => {
          let GatewayPageURL = apiResponse.GatewayPageURL;

          res.send({ url: GatewayPageURL });
          const createdAt = new Date().toLocaleDateString();
          const finalOrder = {
            name,
            number,
            userEmail,
            totalAmount,
            currency,
            district,
            upazila,
            shippingAddress,
            paidStatus: false,
            tranjectionId: tran_id,
            createdAt,
            orderName,
          };
          const result = orderCollection.insertOne(finalOrder);
        });
      } catch (error) {
        console.error("Error processing order:", error);
        res
          .status(500)
          .json({ error: "An error occurred while processing the order" });
      }
    });

    // payment succes route
    app.post("/payment/success/:tranId/:userEmail", async (req, res) => {
      const result = await orderCollection.updateOne(
        {
          tranjectionId: req.params.tranId,
        },
        {
          $set: {
            paidStatus: true,
          },
        }
      );

      if (result.modifiedCount > 0) {
        await cartCollection.deleteMany({
          userEmail: req.params.userEmail,
          selectStatus: true,
        });

        res.redirect(
          `http://localhost:5173/payment/success/${req.params.tranId}`
        );
      }
    });

    // payment fail
    app.post("/payment/fail/:tranId", async (req, res) => {
      const result = await orderCollection.deleteOne({
        tranjectionId: req?.params?.tranId,
      });
      if (result.deletedCount) {
        res.redirect(`http://localhost:5173/payment/fail/${req.params.tranId}`);
      }
    });

    // get payment history
    app.get("/order/:userEmail", async (req, res) => {
      const userEmail = req.params.userEmail;
      const query = { userEmail: userEmail, paidStatus: true };
      const sortOptions = { date: -1 };

      // Sort in descending order based on the "createdAt" field
      const result = await orderCollection
        .find(query)
        .sort(sortOptions)
        .toArray();
      res.send(result);
    });

    // get all districts
    app.get("/districts", async (req, res) => {
      const result = await districtsCollection.find().toArray();
      res.send(result);
    });
    // get all upazilas
    app.get("/upazilas", async (req, res) => {
      const result = await upazilasCollection.find().toArray();
      res.send(result);
    });
    // payment related work end here

    // categories
    app.get("/categories", async (req, res) => {
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    });

    // get products by categoryId
    app.get("/products/:categoryId", async (req, res) => {
      const categoryId = req.params.categoryId;
      const products = await productsCollection.find({ categoryId }).toArray();
      res.json(products);
    });

    // get all products
    app.get("/products", async (req, res) => {
      const query = { status: "approved" };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    // get product by id
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const product = await productsCollection.findOne({
          _id: new ObjectId(id),
        });
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ message: "Product not found" });
        }
      } catch (err) {
        console.error("Error retrieving product:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // put review to product list
    app.put("/products/:productId", async (req, res) => {
      try {
        const productId = req.params.productId;
        const review = req.body;
        const result = await productsCollection.updateOne(
          { _id: new ObjectId(productId) },
          { $push: { reviews: review } }
        );

        if (result.modifiedCount > 0) {
          res
            .status(200)
            .json({ success: true, message: "Review added successfully" });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }
      } catch (error) {
        console.error("Error occurred while updating product review", error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    });

    // add to cart collection
    app.put("/cart", verifyJWT, async (req, res) => {
      try {
        const cartProduct = req.body;
        // Check if the product already exists in the cart
        const existingProduct = await cartCollection.findOne({
          productId: cartProduct.productId,
          userEmail: cartProduct.userEmail,
        });

        if (existingProduct) {
          return res.status(400).send("Product already added to cart!");
        } else {
          // Product doesn't exist, insert it into the cart
          const result = await cartCollection.insertOne(cartProduct);
          res.send(result);
        }
      } catch (error) {
        // Handle any other errors that might occur
        console.error("Error adding product to cart:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // get all cart products
    app.get("/cart", async (req, res) => {
      const result = await cartCollection.find().toArray();
      console.log("hit");
      res.send(result);
    });

    // get user cart products
    app.get("/cart/:email", async (req, res) => {
      const userEmail = req.params.email;
      const cartData = await cartCollection
        .find({ userEmail: userEmail })
        .toArray();
      res.json(cartData);
    });

    // delete user cart products
    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const result = await cartCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // put wishlist
    app.put("/wishlist", async (req, res) => {
      try {
        const wishlistProduct = req.body.wishlistProduct;

        const existingItem = await wishlistCollection.findOne({
          _id: new ObjectId(wishlistProduct._id),
        });

        if (existingItem) {
          return res
            .status(400)
            .json({ message: "Item already exists in the wishlist" });
        }
        await wishlistCollection.insertOne(wishlistProduct);
        res
          .status(201)
          .json({ message: "Item added to wishlist successfully" });
      } catch (error) {
        console.error("Error adding item to wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // get wishlists products
    app.get("/wishlists/:email", async (req, res) => {
      const userEmail = req.params.email;
      const cartData = await wishlistCollection
        .find({ userEmail: userEmail })
        .toArray();
      res.json(cartData);
    });

    // delete wishlists products
    app.delete("/wishlists/:id", async (req, res) => {
      const id = req.params.id;
      console.log("from wish", id);
      const result = await wishlistCollection.deleteOne({ _id: id });
      res.send(result);
    });

    // update quantity
    app.put("/cart/quantityUpdate/:id", async (req, res) => {
      try {
        const productId = req.params.id;
        const updateStatus = req.body.updateStatus;
        const cartItem = await cartCollection.findOne({
          _id: new ObjectId(productId),
        });
        console.log("from updated quantity hit", cartItem);
        if (!cartItem) {
          return res.status(404).json({ message: "Cart item not found" });
        }
        if (updateStatus === "plus") {
          cartItem.quantity += 1;
        } else if (updateStatus === "minus" && cartItem.quantity > 0) {
          cartItem.quantity -= 1;
        }

        await cartCollection.updateOne(
          { _id: new ObjectId(productId) },
          { $set: { quantity: cartItem.quantity } }
        );

        res.status(200).json({
          message: "Quantity updated successfully",
          updatedQuantity: cartItem.quantity,
        });
      } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // get single cart item
    app.get("/cartQuantity/:id", async (req, res) => {
      try {
        const productId = req.params.id;
        const cartProduct = await cartCollection.findOne({
          _id: new ObjectId(productId),
        });
        if (!cartProduct) {
          return res.status(404).json({ message: "Cart product not found" });
        }
        res.status(200).json(cartProduct);
      } catch (error) {
        console.error("Error retrieving cart product:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // get selected cart products
    app.get("/cart/selectStatus/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const cartItem = await cartCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!cartItem) {
          return res.status(404).json({ message: "Cart item not found" });
        }
        return res.json({ selectStatus: cartItem.selectStatus });
      } catch (error) {
        console.error("Error fetching selectStatus for the item:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });

    // update select status
    app.put("/cart/selectStatus/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { selectStatus } = req.body;

        const result = await cartCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { selectStatus: selectStatus } }
          // { upsert: true }
        );

        res.send(result);
      } catch (error) {
        console.error("Error updating/selecting status for the item:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });

    // update all select status
    app.put("/cart/selectStatusAll", async (req, res) => {
      try {
        const { ids, selectStatus } = req.body;
        const objectIds = ids.map((id) => new ObjectId(id));
        // Update selectStatus for all items based on provided IDs
        const result = await cartCollection.updateMany(
          { _id: { $in: objectIds } },
          { $set: { selectStatus: selectStatus } }
        );

        res.json({ message: "Select status updated successfully", result });
      } catch (error) {
        console.error("Error updating selectStatus for all items:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });

    // older versions--------------------------------------------------------
    // payment intent
    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // payments post and delete from selected list
    app.post("/payments", verifyJWT, async (req, res) => {
      const payment = req.body;
      const insertResult = await paymentsCollection.insertOne(payment);

      const query = { _id: new ObjectId(payment.selectedClassId) };
      const deleteResult = await selectedCollection.deleteOne(query);

      res.send({ insertResult, deleteResult });
    });

    // payment history get
    app.get("/payments/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const sortOptions = { date: -1 };

      // Sort in descending order based on the "createdAt" field
      const result = await paymentsCollection
        .find(query)
        .sort(sortOptions)
        .toArray();
      res.send(result);
    });

    // jwt token collect
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // post classes
    app.post("/classes", async (req, res) => {
      const singleClass = req.body;
      const result = await productsCollection.insertOne(singleClass);
      res.send(result);
    });

    // feed updated
    app.put("/classes/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const feedback = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          feedback: feedback.feedText,
        },
      };
      const result = await productsCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // status updated
    app.put("/classesStatus/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          status: status.status,
        },
      };
      const result = await productsCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // get classes

    app.get("/allProducts", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    // app get instructor classes
    app.get("/myClasses/:email", async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const query = { instructorEmail: email };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    // get instructors
    app.get("/instructors", async (req, res) => {
      const result = await instructorCollection.find().toArray();
      res.send(result);
    });

    // put users
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const updatedDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // user role handle
    app.put("/usersRole/:id", async (req, res) => {
      const id = req.params.id;
      const role = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: { role: role.role },
      };
      const result = await usersCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // is admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const admin = { admin: user?.role === "admin" };
      const instructor = { instructor: user?.role === "instructor" };
      res.send({ admin, instructor });
    });

    // get all users
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // get users by email
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { role: user?.role === "admin" || "instructor" };
      if (user?.role) {
        return res.send(result);
      }
      res.send(false);
    });

    // get all selected
    app.get("/selected", verifyJWT, async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.send([]);
      }

      const decoded = req.decoded.email;
      if (email !== decoded) {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }

      const query = { email: email };
      const result = await selectedCollection.find(query).toArray();
      res.send(result);
    });

    // selected classes
    app.put("/selected/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const selectedClass = req.body;
      const options = { upsert: true };
      const updatedDoc = {
        $set: selectedClass,
      };
      const result = await selectedCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // available seats are 1 reduce
    app.put("/reduced/:id", async (req, res) => {
      const id = req.params.id;
      const available_seats = req.body;
      console.log("from 192", available_seats);
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          available_seats: available_seats.current_seats,
          students: available_seats.TotalEnrolledStudents,
        },
      };
      const result = await productsCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(result);
    });

    // student enrolled work here
    app.post("/enrolled", async (req, res) => {
      const enrolledClass = req.body;
      const result = await enrolledCollection.insertOne(enrolledClass);
      res.send(result);
    });

    // get enrolled
    app.get("/getEnrolled/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await enrolledCollection.find(query).toArray();
      res.send(result);
    });

    // pay selected
    app.get("/paySelected/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await selectedCollection.findOne(query);
      res.send(result);
    });

    // selected delete method
    app.delete("/selected/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await selectedCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`From 12 server running port is ${port}`);
});
