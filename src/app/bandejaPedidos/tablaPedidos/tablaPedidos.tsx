'use client'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, TableCell, Grid, Tooltip, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { usePedidoFetch } from "@/hooks/usePedidoFetch";
import { SetStateAction, useState, Dispatch } from "react";
import React from "react";
import MiDialog2 from "@/app/MiDialog2/MiDialog2";
import { useRouter } from "next/navigation"
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MiDialog3 from "@/app/MiDialog3/MiDialog3";
import Paginacion from "@/app/paginacion/paginacion";

interface OpenDialog {
    open: boolean;
    title: string;
    message: string;
    action?: () => void;
}

interface PedisoSelccionado { numeroPedido: number; estado: string; detalle: string; fechaPedido: string }

export default function TablaPedidos(props: {
    datosTabla: any[];
    value?: number;
    filasPaginado: number;
    setfilasPaginado: Dispatch<SetStateAction<number>>;
    numeroPaginado: number;
    setNumeroPaginado: Dispatch<SetStateAction<number>>
    paginaSeleccionada: number;
    setPaginaSeleccionada: Dispatch<SetStateAction<number>>
}) {
    const [forceUpdate, setForceUpdate] = useState(false);
    const pedidioRouter = usePedidoFetch();
    const router = useRouter()
    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [dialogoExito1, setDialogoExitso1] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [pedidoSeleccionado, setPedidoSeleccionado] = React.useState<PedisoSelccionado>({
        numeroPedido: 0, estado: "", detalle: "", fechaPedido: ""
    })

    const cambiarEstadoPedido = async (numeroPedido: number, estado: string) => {
        try {
            const pedidoCambiado = await pedidioRouter({
                endpoint: 'change-pedido',
                formData: { numeroPedido, estado }

            })
            if (estado === "Generado") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'Pedido generado con exito',
                })
            }
            if (estado === "Preparar pedido") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: ' Preparar pedido con exito',
                })
            }
            if (estado === "Cancelado") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'Cancelado con exito',
                })
            }
            if (estado === "Entregado") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'Entregado con exito',
                })
            }
            if (estado === "Terminado") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'Pedido terminado',
                })
            }

            setForceUpdate(prevState => !prevState);
        } catch (error) {
            console.error("error", error)
            throw error;
        }

    }
    const mostrarpedidoSeleccionado = async (pedido: { numeroPedido: number, estado: string, detalle: string, fechaPedido: string }) => {

        setPedidoSeleccionado(pedido)

        if (pedidoSeleccionado.numeroPedido !== 0) {
            setDialogoExitso1({
                open: true,
                title: "Pedido",
                message: 'Pedido generado con exito',
            })
        }

    }
    return (
        <>
            <div style={{ margin: "2em", paddingLeft: "1em" }}>
                {props.datosTabla.length === 0 ? (
                    <Typography align="center" variant="h4" sx={{ color: "#CECCCC" }}>
                        No se encontraron resultados para la búsqueda realizada
                    </Typography>) : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>NUMERO PEDIDO</b>
                                    </TableCell >
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>ESTADO PEDIDO</b>
                                    </TableCell>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>DETALLE PEDIDO</b>
                                    </TableCell>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>FECHA PEDIDO</b>
                                    </TableCell>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>ACCIONES</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {props.datosTabla?.map((pedido) => (
                                    <TableRow
                                        key={pedido.numeroPedido}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="center">
                                            {pedido.numeroPedido}
                                        </TableCell>
                                        <TableCell align="center">
                                            {pedido.estado}
                                        </TableCell>
                                        <TableCell align="center">
                                            {pedido.detalle}
                                        </TableCell>
                                        <TableCell align="center">
                                            {pedido.fechaPedido}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={3.5}
                                            >
                                                <Grid item xs={2} xl={2}>
                                                    <Tooltip
                                                        title="Generar pedido"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                let estado = "Generado";
                                                                cambiarEstadoPedido(pedido.numeroPedido, estado)
                                                            }}
                                                        >
                                                            <CreateNewFolderIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={2} xl={2}>
                                                    <Tooltip
                                                        title="Preparar pedido"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                let estado = "Preparar pedido";
                                                                cambiarEstadoPedido(pedido.numeroPedido, estado)
                                                            }}
                                                        >
                                                            <HourglassBottomOutlinedIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>

                                                <Grid item xs={2} xl={2}>
                                                    <Tooltip
                                                        title="Cancelar pedido"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                let estado = "Cancelado";
                                                                cambiarEstadoPedido(pedido.numeroPedido, estado)
                                                            }}
                                                        >
                                                            <CancelIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={2} xl={2}>
                                                    <Tooltip
                                                        title="Pedido entregado"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                let estado = "Entregado";
                                                                cambiarEstadoPedido(pedido.numeroPedido, estado)
                                                            }}
                                                        >
                                                            <DeliveryDiningIcon />
                                                        </IconButton>

                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={2} xl={2}>
                                                    <Tooltip
                                                        title="Pedido terminado"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                let estado = "Terminado";
                                                                cambiarEstadoPedido(pedido.numeroPedido, estado)
                                                            }}
                                                        >
                                                            <CheckIcon />
                                                        </IconButton>

                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={2} xl={2}>
                                                    <Tooltip
                                                        title="Editar pedido"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                mostrarpedidoSeleccionado(pedido)
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>

                                                    </Tooltip>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                )}
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        backgroundColor: "#DBE7F3",
                        marginTop: "4vh",
                        height: "7vh",
                        borderRadius: "15px",
                    }}
                    columnSpacing={1}
                >
                    <Grid item xs={6} sx={{ marginTop: "-1rem" }}>
                        <Paginacion
                            cantidadFilasPorPagina={props.filasPaginado} //La cantidad de item
                            cantidadPaginas={props.numeroPaginado} //La cantidad de paginas
                            paginaSeleccionada={props.paginaSeleccionada} //la pagina seleccionada
                            setCantidadFilasPorPagina={props.setfilasPaginado} //El seteo de la cantidad de items
                            setPaginaSeleccionada={props.setPaginaSeleccionada} //El seteo de la pagina seleccionada
                        />
                    </Grid>

                </Grid>
            </div>
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
            <MiDialog3
                open={pedidoSeleccionado.numeroPedido != 0 ? true : false}
                title={
                    dialogoExito1.title
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
                pedido={pedidoSeleccionado}
            />


        </>


    )
}