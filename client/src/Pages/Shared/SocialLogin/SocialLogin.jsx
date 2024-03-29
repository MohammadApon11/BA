import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { FcGoogle } from 'react-icons/fc';


const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext)
    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user)
                // // save user to db
                // saveUser(result.user)
                // navigate(from, { replace: true })
            })
            .catch(err => {
                // setLoading(false)
                console.log(err.message)
                // toast.error(err.message)
            })
    }
    return (
        
    );
};

export default SocialLogin;