'use client'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, TableCell, Grid, Tooltip, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import React from "react";
import MiDialog2 from "@/app/MiDialog2/MiDialog2";
import { useRouter } from "next/navigation"
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

interface OpenDialog {
    open: boolean;
    title: string;
    message: string;
    action?: () => void;
}
export default function TablaPedidos(props: {
    datosTabla: any[];
    value?: number;
}) {
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

    const pedidosFilter = props.datosTabla.filter((p) => p.estado !== "Cancelado" && p.estado !== "Entregado")
    const getStringPorEstado = (estadoPedido: string) => {

        switch (estadoPedido) {
            case 'Generado':
                return 'Generado'
            case 'Preparar pedido':
                return 'Preparando'
            case 'Terminado':
                return 'Terminado'
            default:
                return null;
        }
    }

    const getIconPorEstado = (estadoPEdido: string) => {
        switch (estadoPEdido) {
            case 'Generado':
                return <CreateNewFolderIcon />

            case 'Preparar pedido':
                return <HourglassBottomOutlinedIcon />

            case 'Terminado':
                return <CheckIcon />
            default:
                return null;
        }
    }
    return (
        <>
            <div style={{ margin: "2em", paddingLeft: "1em" }}>
                {pedidosFilter.length === 0 ? (
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
                                        <b>DETALLE PEDIDO</b>
                                    </TableCell>

                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>ESTADO</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {pedidosFilter?.map((pedido) => (
                                    <TableRow
                                        key={pedido.numeroPedido}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="center">
                                            {pedido.numeroPedido}
                                        </TableCell>
                                        <TableCell align="center">
                                            {pedido.detalle}
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
                                                        title={pedido.estado === 'Generado' ? 'Generar pedido' : pedido.estado ? 'Preparar pedido' : 'Pedido terminado'}//"Generar pedido"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <div>
                                                            <IconButton

                                                            >
                                                                {getIconPorEstado(pedido.estado)}

                                                            </IconButton>
                                                            <Typography style={{ fontSize: '10px' }}>{getStringPorEstado(pedido.estado)}</Typography>
                                                        </div>

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

        </>


    )
}