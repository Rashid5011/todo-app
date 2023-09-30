import { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorMessage from "../../component/ErrorMessage";
import Loader from "../../component/Loader";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";


export default function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [picture, setPicture] = useState(null);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'notezipper');

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dgdr92ooy/image/upload',
                formData
            );
            setPicture(res.data.secure_url);
        } catch (err) {
            console.error('Error uploading image:', err);
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate("/mynotes");
        }
    }, [history, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else if (picture === null) {
            setMessage("Please upload a profile picture");
        } else {
            setMessage(null);
            dispatch(register(name, email, password, picture))
            // try {
            //     const config = {
            //         headers: {
            //             "Content-type": "application/json",
            //         },
            //     };
            //     setLoading(true);

            //     const { data } = await axios.post(
            //         "/api/users",
            //         { name, email, password, picture },
            //         config
            //     );
            //     setLoading(false);
            //     console.log(data);

            //     localStorage.setItem("userInfo", JSON.stringify(data));
            //     navigate("/mynotes")
            // } catch (error) {
            //     setError("Signup failed. Please check your information.");
            //     console.error(error);
            //     setLoading(false);
            // }
        }
    };

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase text-center">SignUp</h2>
                                    <div className="mb-3">
                                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                                        {message && <ErrorMessage variant="success">{message}</ErrorMessage>}
                                        {loading && <Loader />}
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Label className="text-center">
                                                    Name
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="confirmPassword"
                                            >
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="confirmPassword"
                                            >
                                            </Form.Group>

                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>Profile picture</Form.Label>
                                                <Form.Control type="file" onChange={handleImageUpload} />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" onClick={submitHandler}>
                                                    Signin
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account?{" "}
                                                <Link to={'/login'} className="text-primary fw-bold">
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}