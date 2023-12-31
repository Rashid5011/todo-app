import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import ErrorMessage from "../../component/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { updateNoteAction } from "../../actions/notesAction";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateNote({ match }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(id, title, content, category));
        if (!title || !content || !category) return;

        resetHandler();

    };

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${id}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };

        fetching();
    }, [date]);

    return (
        <Card>
            <Card.Header>Update Note</Card.Header>
            <Card.Body>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="title"
                            value={title}
                            placeholder="Enter the title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={content}
                            placeholder="Enter the content"
                            rows={4}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    {content && (
                        <Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body>
                        </Card>
                    )}

                    <Form.Group controlId="content">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="content"
                            value={category}
                            placeholder="Enter the Category"
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Update Note
                    </Button>
                    <Button className="mx-2" onClick={resetHandler} variant="danger">
                        Reset Fields
                    </Button>
                </Form>
            </Card.Body>

            <Card.Footer className="text-muted">
                Updating on - {date.substring(0, 10)}
            </Card.Footer>
        </Card>
    );
}

export default UpdateNote;
