// import React from "react";
// import { Alert } from "react-bootstrap";

// const ErrorMessage = ({ variant = "info", children }) => {
//     return (
//         <Alert variant={variant} style={{ fontSize: 20 }}>
//             <strong>{children}</strong>
//         </Alert>
//     );
// };

// export default ErrorMessage;


import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorMessage({ variant = "info", children }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{children}</Alert.Heading>
            </Alert>
        );
    }
}

export default ErrorMessage;