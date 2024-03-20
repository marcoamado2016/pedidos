'use client'

import { Button, Card, Grid } from "@mui/material";
import styles from "../bandejaPedidos/bandejaPedidos.module.css"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { usePedidoGetFetch } from "@/hooks/usePedidosGetFetch";
import ContenedorTabla from "./contenedorTabla/contenedorTabla";
export default function BandejaPedidos() {
    const router = useRouter()
    const [value, setValue] = useState(0);
    const pedidoFetch = usePedidoGetFetch()
    const [datosTabla, setDatosTabla] = useState<any[]>([])
    const [cargandoDatos, setCargandoDatos] = useState<boolean>(false);
    useEffect(() => {
        obtenerPedidos()
    }, [])
    const obtenerPedidos = async () => {
        setCargandoDatos(true);
        let queryParams: any = {}
        queryParams = {
            numeroPedido: 0
        }
        try {
            let respuesta = await pedidoFetch({
                endpoint: 'search',
                queryParams,
                options: {}
            })
            if (respuesta) {

                setDatosTabla(respuesta.data.Pedido)
                setCargandoDatos(false)
            }

            return respuesta?.data.Pedido
        } catch (error) {
            console.error("error", error)
            setCargandoDatos(false);
            throw error;
        }
    }
    setInterval(async () => {
        await obtenerPedidos()

    }, 60000)

    return (
        <div style={{ margin: '2em', paddingLeft: '1em' }}>
            <Card>
                <div className={styles.divBar}>Bandeja de pedidos</div>

                <ContenedorTabla datosTabla={datosTabla} setCargandoDatos={setCargandoDatos} cargandoDatos={cargandoDatos} value={value} setValue={setValue} />
                <Grid
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    padding={"1em"}
                >
                    <Grid item xs={1.1}>

                        <Button
                            variant="outlined"
                            style={{
                                backgroundColor: "white",
                                boxShadow: "1px 11px 16px -10px rgba(0,0,0.75,0.75)",
                            }}
                            onClick={() => {
                                router.push("/home")
                            }}
                            size="medium"
                        >
                            Volver
                        </Button>
                    </Grid>
                </Grid>

            </Card>

        </div>
    )
}