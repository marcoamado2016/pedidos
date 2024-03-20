import { connectMongoDB } from "@/libs/mongodb";
import Pedido from "@/models/pedido";
import messages from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";

export interface PropsPedido {
    numeroPedido?: number;
    detalle?: string;
    fechaPedido?: string;
    estado?: string;
}

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const body: PropsPedido = await request.json();
        const { numeroPedido, detalle, fechaPedido, estado } = body

        if (!numeroPedido) {
            return NextResponse.json(
                { messages: 'Debe ingresar un numero de pedido' }, { status: 400 }
            )
        }

        const pedidoEncontrado = await Pedido.findOne({ numeroPedido: numeroPedido })

        if (!pedidoEncontrado) {
            return NextResponse.json(
                { messages: 'No se encontro ningun pedido' }, { status: 404 }
            )
        }

        if (pedidoEncontrado) {
            pedidoEncontrado.detalle = detalle ? detalle : pedidoEncontrado.detalle;
            pedidoEncontrado.fechaPedido = fechaPedido ? fechaPedido : pedidoEncontrado.fechaPedido;
            pedidoEncontrado.estado = estado ? estado : pedidoEncontrado.estado;
            pedidoEncontrado.save();
        }

        return NextResponse.json(
            { pedidoModificado: pedidoEncontrado, messages: 'Pedido modificado' }, { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: messages.error.errorDefault }, { status: 500 }
        )
    }
}