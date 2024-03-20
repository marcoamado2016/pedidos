'use client'
import { useRouter } from "next/navigation"

export default async function HomePage() {
    const router = useRouter()
    return (
        <>
            <div style={{ textAlign: 'center' }}> <p >Panel de control</p></div>
            <div>

                <button
                    style={{
                        borderRadius: 20,
                        margin: 16,
                        width: 160,
                        minHeight: 200,
                        maxHeight: 200,
                        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.75)",
                        backgroundColor: "#fafafa",
                    }}
                    onClick={() => router.push('/bandejaPedidos')}
                >
                    Ir a pedidos
                </button>
                <button
                    style={{
                        borderRadius: 20,
                        margin: 16,
                        width: 160,
                        minHeight: 200,
                        maxHeight: 200,
                        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.75)",
                        backgroundColor: "#fafafa",
                    }}
                    onClick={() => router.push('/registrarPedidos')}
                >
                    Realizar pedido
                </button>
                <button
                    style={{
                        borderRadius: 20,
                        margin: 16,
                        width: 160,
                        minHeight: 200,
                        maxHeight: 200,
                        boxShadow: "5px 5px 30px -5px rgba(0,0,0,0.75)",
                        backgroundColor: "#fafafa",
                    }}
                    onClick={() => router.push('/AlertaPedidos')}
                >
                    Alerta pedidos
                </button>
            </div>
        </>

    )
}
