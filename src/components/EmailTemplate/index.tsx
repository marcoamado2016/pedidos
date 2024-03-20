import * as React from 'react'

interface EmailTemplateProps {
    buttonUrl: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    buttonUrl
}) => (
    <div
        style={{
            padding: '20px',
            backgroundColor: 'white',
            display: 'grid',
            justifyItems: 'center'
        }}
    >
        <span>
            Haz click acá para cambiar de contraseña 👇🏻
        </span>
        <a href={buttonUrl} style={{ margin: '10px auto' }}></a>
        <button>Cambiar contraseña</button>
    </div>

)