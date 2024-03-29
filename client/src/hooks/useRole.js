import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useRole = () => {
    const [role,setRole]=useState(null)
    const {user }=useAuth();
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
        .then(res=>res.json())
        .then(data=>setRole(data))
    },[user])
    return [role]
};

export default useRole;