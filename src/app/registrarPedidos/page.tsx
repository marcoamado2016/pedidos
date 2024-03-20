
'use client'
import { Form } from "@/components/Form"
import { useLoading } from "@/hooks/useLoading"
import { usePedidoFetch } from "@/hooks/usePedidoFetch"
import { useEffect, useState } from "react"
import React from "react";
import MiDialog2 from "../MiDialog2/MiDialog2"
import { Grid } from "@mui/material"
import { Button } from "react-bootstrap"
import { useRouter } from "next/navigation"

interface OpenDialog {
    open: boolean;
    title: string;
    message: string;
    action?: () => void;
}
export default function LoginPage(pedido?: any) {
    let router = useRouter();
    const { finishLoading, isLoading, startLoading } = useLoading()
    const pedidoFetch = usePedidoFetch()
    const [formValues, setFormValues] = useState({
        numeroPedido: '',
        fechaPedido: '',
        detalle: ''
    })

    useEffect(() => {
        if (pedido?.pedido) {
            setFormValues({
                numeroPedido: pedido?.pedido?.numeroPedido,
                fechaPedido: pedido?.pedido?.fechaPedido,
                detalle: pedido?.pedido?.detalle
            });
        }
    }, [pedido])
    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const setDefaultValues = () => {
        setFormValues({
            detalle: '',
            fechaPedido: '',
            numeroPedido: '',
        });
    }

    const registrarPedido = async (formData: any) => {

        try {

            if (pedido?.pedido) {
                startLoading()
                const pedidoCambiado = await pedidoFetch({
                    endpoint: 'change-pedido',
                    formData: formData
                })
                if (pedidoCambiado.status == 200) {
                    setDialogoExito({
                        open: true,
                        title: "Pedido modificado ",
                        message: 'Exito',
                    })
                }
                finishLoading();
                setDefaultValues();
            } else {
                startLoading()
                formData.estado = 'Creado'
                const respuesta = await pedidoFetch({
                    endpoint: 'save',
                    redirectRoute: '/registrarPedidos',
                    formData
                })
                console.log("registrarr pedidos ", respuesta)
                finishLoading();
                setDefaultValues();
                if (respuesta.status == 200) {
                    setDialogoExito({
                        open: true,
                        title: "Registro de pedido",
                        message: 'Exito',
                    })
                }

            }


        } catch (error: any) {
            console.error("Error al registrar el pedido ", error)
            if (error?.response?.status === 409) {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'El pedido ya se registro',
                })

            }
            if (error?.response?.status === 400) {
                setDialogoExito({
                    open: true,
                    title: "No se ´puede registrar el pedido",
                    message: 'Todos los campos son obligatorios',
                })

            }
        }

    }
    return (
        <>
            <div >
                <Form
                    title={pedido?.pedido?.numeroPedido ? 'Editar pedido ' : 'Registrar Pedido'}
                    descripcion={pedido?.pedido?.numeroPedido ? 'Formulario para editar pedido ' : "Formulario para registrar pedido"}
                    onSubmit={registrarPedido}
                >
                    <div>
                        <Form.Input
                            label='Numero pedido'
                            name='numeroPedido'
                            placeholder="Numero de pedido"
                            type="text"
                            defaultValue={formValues.numeroPedido}
                        />
                        <Form.Input
                            label='Fecha Pedido'
                            name='fechaPedido'
                            placeholder="Fecha de Pedido"
                            type="date"
                            defaultValue={formValues.fechaPedido}
                        />
                        <br />
                        <Form.TextArea
                            label='Detalle de pedido'
                            name="detalle"
                            key={'pedido'}
                            placeholder="Detalle su pedido"
                            type="text"
                            height='auto'
                            width='100%'
                            defaultValue={formValues.detalle}

                        />
                        <Form.SubmitButton buttonText={pedido?.pedido?.numeroPedido ? 'Editar pedido' : 'crear un pedido'} isLoading={isLoading} />
                    </div>


                </Form>
                <MiDialog2
                    open={dialogoExito.open}
                    title={
                        dialogoExito.title
                    }
                    message={dialogoExito.message}
                    actions={[
                        {
                            text: "Aceptar",
                            color: "primary",
                            variant: "contained",
                            onClick: () => {
                                setDialogoExito({
                                    open: false,
                                    title: "",
                                    message: '',
                                })
                                window.location.reload();
                            },
                        },
                    ]}
                />
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
                                backgroundColor: "black",
                                color: "white",
                                borderRadius: "8px",
                                width: "60px",
                                boxShadow: "1px 11px 16px -10px rgba(0,0,0.75,0.75)",
                            }}
                            onClick={() => {
                                router.push("/home")
                            }}

                        >
                            Volver
                        </Button>
                    </Grid>

                </Grid>
            </div>

        </>
    )

}