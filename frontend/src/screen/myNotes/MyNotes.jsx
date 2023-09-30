import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../component/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import { login } from "../../actions/userActions";
import Loader from "./../../component/Loader"
import ErrorMessage from "./../../component/ErrorMessage"

function MyNotes({ history, search }) {
    const navigate = useNavigate()
    // const dispatch = useDispatch();
    // const noteList = useSelector((state) => state.noteList);
    // console.log(noteList)

    // useEffect(() => {
    //     dispatch(listNotes());
    // }, [dispatch]);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const userInfo = userLogin;

    const noteList = useSelector((state) => state.noteList);
    const { loading, error, notes } = noteList;
    console.log(noteList)

    const noteUpdate = useSelector((state) => state.noteUpdate)
    const { success } = noteUpdate

    const noteDelete = useSelector((state) => state.noteDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteNoteAction(id));
        }
    };

    // const userLogin = useSelector((state) => state.userLogin);


    useEffect(() => {
        dispatch(listNotes());
        // dispatch(login(email, password));
    }, [success, dispatch, history, successDelete])

    return (
        <MainScreen title={`Welcome Back ${userInfo?.name}`}>
            <Link to="/create">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create new Note
                </Button>
            </Link>
            {loading && <Loader />}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Accordion>
                {noteList.notes?.reverse().filter((filteredNote) => filteredNote.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
                    note._id && (
                        <Card key={note._id} style={{ margin: 10 }}>
                            <Card.Header style={{ display: "flex" }}>
                                <span
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                        flex: 1,
                                        cursor: "pointer",
                                        alignSelf: "center",
                                        fontSize: 18,
                                    }}
                                >
                                    {note.title}
                                </span>
                                <div>
                                    <Link to={`/note/${note._id}`}><Button>Edit</Button></Link>
                                    <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}>Delete</Button>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <h4>
                                    <Badge variant="primary">Category - {note.category}</Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <ReactMarkdown>{note.content}</ReactMarkdown>
                                    <footer className="blockquote-footer">
                                        Created on <cite title="Source Title">{note.createdAt.substring(0, 10)}</cite>
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>)
                ))}
            </Accordion>
        </MainScreen>
    );
}

export default MyNotes;
