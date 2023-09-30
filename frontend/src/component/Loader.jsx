import Spinner from 'react-bootstrap/Spinner';

function Loader() {
    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={loaderStyle}>
            <Spinner animation="border" variant="primary" />
        </div>
    );
}

export default Loader;
