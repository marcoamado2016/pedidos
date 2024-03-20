import axios, { AxiosRequestConfig } from "axios"
import { useRouter } from "next/navigation"

interface PedidoProps {
    endpoint: string
    redirectRoute?: string
    queryParams?: any
    options?: AxiosRequestConfig<any>
}


export function usePedidoGetFetch() {

    const router = useRouter();
    const pedidoGetRouter = async ({ endpoint, queryParams, options, redirectRoute }: PedidoProps) => {


        try {
            console.log("queryParams ", queryParams)
            const url = `/api/pedido/${endpoint}${queryParams ? `?${new URLSearchParams(queryParams).toString()}` : ''}`;

            console.log("URL ", url)

            const resp = await axios.get(url, options)
            console.log("resp ", resp)

            return resp;

        } catch (error) {
            console.log("error ", error)
        }
    }

    return pedidoGetRouter;
}
