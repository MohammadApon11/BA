import Marquee from "react-fast-marquee";
import SectionWraper from "../Wrapper's/SectionWraper";
import toast from "react-hot-toast";

const Marque = () => {
  return (
    <SectionWraper>
      <div className="flex items-center py-3">
        <Marquee
          className="lg:text-lg text-sm text-pink-500 lg:font-normal font-semibold mt-1"
          speed={50}
        >
          Ice cream is a frozen dessert typically made from milk or cream that
          has been flavoured with a sweetener, either sugar or an alternative,
          and a spice, such as cocoa or vanilla, or with fruit, such as
          strawberries or peaches. Food colouring is sometimes added in addition
          to stabilizers.
        </Marquee>
        <button
          onClick={() => toast.success("Just Read!😊")}
          className="btn cursor-text bg-pink-500 text-white hover:bg-pink-500 rounded-l-none lg:btn-sm btn-xs border-none"
        >
          Headline
        </button>
      </div>
    </SectionWraper>
  );
};

export default Marque;
