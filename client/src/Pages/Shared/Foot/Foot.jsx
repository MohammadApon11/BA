import { Footer } from "flowbite-react";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { AiFillTwitterSquare } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Foot = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Footer>
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="SPORTS WORLD" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">
                <img className="w-10 rounded-lg h-10" src="/color.png" alt="" />
              </Footer.Link>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                Careers
              </Footer.Link>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                Brand Center
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="help center" />
            <Footer.LinkGroup col>
              <Footer.Link href="https://discord.com/">
                Discord Server
              </Footer.Link>
              <Footer.Link href="https://twitter.com/">Twitter</Footer.Link>
              <Footer.Link href="https://www.facebook.com/">
                Facebook
              </Footer.Link>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                Contact Us
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                Privacy Policy
              </Footer.Link>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                Licensing
              </Footer.Link>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                Terms & Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="download" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                iOS
              </Footer.Link>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                Android
              </Footer.Link>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                Windows
              </Footer.Link>
              <Footer.Link
                href="#"
                onClick={() => toast.error("Feature comming soon!")}
              >
                MacOS
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-800  px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Next Bazaar. All Rights Reserved."
            href="#"
            year={currentYear}
          />
          <div className="mt-4 flex text-gray-400 text-3xl space-x-6 sm:mt-0 sm:justify-center">
            <Link to="https://www.facebook.com/">
              <FaFacebookSquare />
            </Link>
            <Link to="https://www.instagram.com/">
              <BsInstagram />
            </Link>
            <Link to="https://www.youtube.com/">
              <BsYoutube />
            </Link>
            <Link to="https://twitter.com/">
              <AiFillTwitterSquare />
            </Link>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Foot;
