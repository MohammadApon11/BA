import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { FcGoogle } from "react-icons/fc";
import { saveUser } from "../../api/auth";
import { toast } from "react-hot-toast";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import NavFixedGap from "../../components/gap's/NavFixedGap";

const image_hosting_token = import.meta.env.VITE_image_hosting_token;
const Register = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, googleLogin, loading, setLoading } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const image_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // password hide un hide
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const onSubmit = (data) => {
    setError("");

    const formData = new FormData();
    formData.append("image", data.image[0]);

    if (data.password !== data.confirmPassword) {
      return setError("Password Doesn't match");
    }

    createUser(data.email, data.password)
      .then((result) => {
        const createdUser = result.user;
        fetch(image_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgResponse) => {
            if (imgResponse.success) {
              const img = imgResponse.data.display_url;
              updateUserProfile(data.name, img)
                .then(() => {
                  toast.success("Signup successful");
                  saveUser(createdUser);
                  navigate(from, { replace: true });
                })
                .catch((error) => {
                  toast.error(error.message);
                  setLoading(false);
                  console.log(error.message);
                });
            }
          });
        console.log("from register", createdUser);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
        // setLoading(false)
        console.log(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        // save user to db
        saveUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        // setLoading(false)
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="py-5">
      <NavFixedGap />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-[50%] w-[85%] mx-auto min-h-screen">
          <div className="card shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="text-3xl text-center font-2xl">
                Please Register Your Account
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    type={type}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="input input-bordered w-full"
                  />
                  <span
                    className="flex justify-around cursor-pointer items-center"
                    onClick={handleToggle}
                  >
                    <Icon className="absolute mr-10" icon={icon} size={20} />
                  </span>
                </div>
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  {...register("confirmPassword", { required: true })}
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Confirm Password is required</p>
                )}
                {error && <p className="text-red-600">{error}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upload Your Image</span>
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
                {errors.photo?.type === "required" && (
                  <p className="text-red-600">Photo is Required</p>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" value="Login">
                  {/* {loading ? (
                                            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                                        ) : (
                                            'Register'
                                        )} */}
                  Register
                </button>
              </div>
              <p>
                Already Have an account? Please{" "}
                <Link className="text-primary hover:underline" to="/login">
                  Login
                </Link>
              </p>
              <div className="divider">OR</div>
              <div
                onClick={handleGoogleSignIn}
                className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
              >
                <FcGoogle size={32} />

                <p>Continue with Google</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
