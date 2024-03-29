import { Zoom } from "react-awesome-reveal";
import Container from "../../Pages/Shared/Container/Container";
import { BsStopwatch, BsFillCupHotFill } from 'react-icons/bs';
import { FiMonitor } from 'react-icons/fi';

const World = () => {
    return (
        <Zoom delay={100} duration={1000}>
            <Container>
                <h1 className="text-center text-4xl font-bold font-sans mt-20 mb-10">Why We Are Best Trainer!</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
                    <div className="border p-7 text-center bg-slate-100 hover:text-blue-600 hover:border-blue-600">
                        <BsStopwatch className="text-5xl text-blue-600 mx-auto" />
                        <h1 className="text-3xl mt-3">Self Reliant Individuals</h1>
                        <p className="text-black mt-3">You are a subject expert. You are in the process of designing a face-to-face interactive course and wonder how to offer it to the market.</p>
                    </div>
                    <div className="border p-7 text-center bg-slate-100 hover:text-red-600 hover:border-red-600">
                        <BsFillCupHotFill className="text-5xl text-red-600 mx-auto" />
                        <h1 className="text-3xl mt-2">Talent Search Methods</h1>
                        <p className="text-black mt-4">You are a subject expert. You are in the process of designing a face-to-face interactive course and wonder how to offer it to the market.</p>
                    </div>
                    <div className="border p-7 text-center bg-slate-100 hover:border-green-600 hover:text-green-600">
                        <FiMonitor className="text-5xl text-green-600 mx-auto" />
                        <h1 className="text-3xl mt-2">Value Based Education</h1>
                        <p className="text-black mt-4">You are a subject expert. You are in the process of designing a face-to-face interactive course and wonder how to offer it to the market.</p>
                    </div>
                </div>
            </Container>
        </Zoom>
    );
};

export default World;