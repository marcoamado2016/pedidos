import { connectMongoDB } from "@/libs/mongodb";
import Pedido, { IPedidoSchema } from "@/models/pedido";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await connectMongoDB()
    let pedidoBuscado: any;
    const body = await request.json()
    const { numeroPedido, detalle, fechaPedido, estado } = body
    if (!numeroPedido || !detalle || !fechaPedido || !estado) {
        return NextResponse.json(
            { message: 'Todos los campos son obligatorios' }, { status: 400 }
        )
    }
    if (numeroPedido) {
        pedidoBuscado = await Pedido.findOne({ numeroPedido: numeroPedido })
        if (pedidoBuscado) {
            return NextResponse.json(
                {
                    message: 'Pedio ya existe'
                },
                {
                    status: 409
                }
            )
        }
    }
    const newPedido: IPedidoSchema = new Pedido({
        numeroPedido, detalle, fechaPedido, estado
    })

    try {

        await newPedido.save()
        return NextResponse.json(
            {
                message: 'Pedio creado exitosamente'
            },
            {
                status: 200
            })

    } catch (error) {
        console.error('Error al guardar el pedido:', error);
        // Error al guardar
        return NextResponse.json({ message: 'Error al guardar el pedido' }, { status: 500 });
    }

}