import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.jpg'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full lg:h-[550px] h-[300px] mt-3">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src={banner1} className="w-full " />
                    <div className="absolute h-full flex bg-gradient-to-r from-[#270948] to-[rgba(11, 11, 11, 0)] lg:left-0 lg:p-28 p-5 top-0">
                        <div className='text-white'>
                            <h1 className='lg:text-6xl text-2xl font-bold bg-gradient-to-r from-sky-600 via-red-800 to-purple-700 inline-block text-transparent bg-clip-text'>SPORTS ACADEMY</h1>
                            <h3 className='lg:text-4xl lg:mt-1'>TAKE TO THE NET</h3>
                            <h1 className='lg:text-2xl mt-4 text-lg  uppercase'>Find Your Great Opportunities</h1>
                            <p className='mb-1 lg:mb-4 lg:text-xl text-sm lg:w-3/4 w-full lg:mr-0 mr-28'>Creating opportunities for all children involved to get to pursue sport post school. Providing underprivileged children with education support and rugby development. Youth development. Uplifting and empowering.</p>
                        </div>
                    </div>
                    <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 lg:right-20 right-5 lg:bottom-10 bottom-0 ">
                        <a href="#slide4" className="lg:w-10 lg:h-10 lg:flex items-center justify-center lg:rounded-full lg:bg-primary transition ease-in-out  
                        hover:scale-110
                        focus:scale-110 duration-300 py-5"><FaArrowLeft className='text-white text-lg' /></a>
                        <a href="#slide2" className="lg:w-10 lg:h-10 lg:flex items-center justify-center lg:rounded-full lg:bg-primary transition ease-in-out  
                        hover:scale-110
                        focus:scale-110 duration-300 py-5"><FaArrowRight className='text-white text-lg' /></a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src={banner2} className="w-full " />
                    <div className="absolute h-full flex bg-gradient-to-r from-[#051443] to-[rgba(31, 31, 31, 0)] lg:left-0 lg:p-28 p-5 top-0">
                        <div className='text-white'>
                            <h1 className='lg:text-6xl text-2xl font-bold bg-gradient-to-r from-blue-600 via-white to-yellow-800 inline-block text-transparent bg-clip-text'>SPORTS ACADEMY</h1>
                            <h3 className='lg:text-4xl lg:mt-1'>TAKE TO THE NET</h3>
                            <h1 className='lg:text-2xl mt-4 text-lg  uppercase'>Find Your Great Opportunities</h1>
                            <p className='mb-1 lg:mb-4 lg:text-xl text-sm lg:w-3/4 w-full lg:mr-0 mr-28'>Creating opportunities for all children involved to get to pursue sport post school. Providing underprivileged children with education support and rugby development. Youth development. Uplifting and empowering.</p>
                        </div>
                    </div>
                    <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 lg:right-20 right-5 lg:bottom-10 bottom-0 ">
                        <a href="#slide1" className="lg:w-10 lg:h-10 lg:flex items-center justify-center lg:rounded-full lg:bg-primary transition ease-in-out  
                        hover:scale-110
                        focus:scale-110 duration-300 py-5"><FaArrowLeft className='text-white text-lg' /></a>
                        <a href="#slide3" className="lg:w-10 lg:h-10 lg:flex items-center justify-center lg:rounded-full lg:bg-primary transition ease-in-out  
                        hover:scale-110
                        focus:scale-110 duration-300 py-5"><FaArrowRight className='text-white text-lg' /></a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src={banner3} className="w-full " />
                    <div className="absolute h-full flex bg-gradient-to-r from-[#31280a] to-[rgba(31, 31, 31, 0)] lg:left-0 lg:p-28 p-5 top-0">
                        <div className='text-white'>
                            <h1 className='lg:text-6xl text-2xl font-bold bg-gradient-to-r from-yellow-200 via-blue-400-500 to-rose-800 inline-block text-transparent bg-clip-text'>SPORTS ACADEMY</h1>
                            <h3 className='lg:text-4xl lg:mt-1'>TAKE TO THE NET</h3>
                            <h1 className='lg:text-2xl mt-4 text-lg  uppercase'>Find Your Great Opportunities</h1>
                            <p className='mb-1 lg:mb-4 lg:text-xl text-sm lg:w-3/4 w-full lg:mr-0 mr-28'>Creating opportunities for all children involved to get to pursue sport post school. Providing underprivileged children with education support and rugby development. Youth development. Uplifting and empowering.</p>
                        </div>
                    </div>
                    <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 lg:right-20 right-5 lg:bottom-10 bottom-0 ">
                        <a href="#slide2" className="lg:w-10 lg:h-10 lg:flex items-center justify-center lg:rounded-full lg:bg-primary transition ease-in-out  
                        hover:scale-110
                        focus:scale-110 duration-300 py-5"><FaArrowLeft className='text-white text-lg' /></a>
                        <a href="#slide1" className="lg:w-10 lg:h-10 lg:flex items-center justify-center lg:rounded-full lg:bg-primary transition ease-in-out  
                        hover:scale-110
                        focus:scale-110 duration-300 py-5"><FaArrowRight className='text-white text-lg' /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;