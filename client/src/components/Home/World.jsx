import { BsStopwatch, BsFillCupHotFill } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import SectionWraper from "../Wrapper's/SectionWraper";

const World = () => {
  return (
    <SectionWraper>
      <h1 className="text-black mb-5 text-xl">Why We Are Best Deliverd!</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-5 mb-10 text-gray-600">
        <div className="border p-7 text-center bg-slate-100 hover:text-blue-600 hover:border-blue-600">
          <BsStopwatch className="text-5xl text-blue-600 mx-auto" />
          <h1 className="text-3xl mt-3">Social Media Integration</h1>
          <p className="text-black mt-3">
            Add social sharing/liking icons for these platforms within your
            product pages, blog posts, and other suitable areas on your website.
          </p>
        </div>
        <div className="border p-7 text-center bg-slate-100 hover:text-red-600 hover:border-red-600">
          <BsFillCupHotFill className="text-5xl text-red-600 mx-auto" />
          <h1 className="text-3xl mt-2">Abandoned Cart Recovery</h1>
          <p className="text-black mt-4">
            Track abandoned carts and create strategies to recover lost
            customers like sending reminder emails with slight (time-limited)
            discounts.
          </p>
        </div>
        <div className="border p-7 text-center bg-slate-100 hover:border-green-600 hover:text-green-600">
          <FiMonitor className="text-5xl text-green-600 mx-auto" />
          <h1 className="text-3xl mt-2">Loyalty Program</h1>
          <p className="text-black mt-4">
            Reward your customers by implementing a loyalty program that grants
            special discounts, rewards points, or exclusive promotions.
          </p>
        </div>
      </div>
    </SectionWraper>
  );
};

export default World;
