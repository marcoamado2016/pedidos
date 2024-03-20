import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IPedido {
    _id?: ObjectId | string | undefined;
    fechaPedido?: string;
    detalle?: string;
    numeroPedido?: string | number;
    estado?: String;
}

export interface IPedidoSchema extends Document {
    _id?: ObjectId | string | undefined;
    fechaPedido?: string;
    detalle?: string;
    numeroPedido?: string | number;
    estado?: string;
}
const pedidoSchema = new Schema(
    {
        numeroPedido: {
            type: Number,
            required: true,
            unique: true
        },
        detalle: {
            type: String,
            required: true
        },
        fechaPedido: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Pedido = mongoose.models.Pedido || mongoose.model("Pedido", pedidoSchema)
export default Pedido;