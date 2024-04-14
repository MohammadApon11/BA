import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"
import useAuth from "./useAuth"

const usePayment = (id) => {
    const {loading} = useAuth();
    // const token = localStorage.getItem("access-token")
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: selected = [] } = useQuery({
        queryKey: ['paySelected'],
        enabled:!loading,
        queryFn: async () => {
            const res = await axiosSecure(`/paySelected/${id}`)
            console.log("from use Selected", res)
            return res.data;
        },
    })

    return [selected, refetch]
}

export default (usePayment)