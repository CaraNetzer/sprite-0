import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { UploadWidget } from './imagePages/UploadWidget';
import Form from 'react-bootstrap/Form';
import { Image } from "cloudinary-react";



export function UploadModal(props) {

    const [publicId, setPublicId] = useState("")

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    const uploadImage = (i, e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("file", image.files[0]);
        formData.append("upload_preset", "a4ogqwyb");


        const image = {
            Id: i.id,
            Src: i.src,
            Price: i.src,
            Width: i.src,
            Height: i.src,
            Notes: i.src,
            Title: i.src,
            Sheet: i.src,
            Upvotes: i.src,
            Downvotes: i.src,
            Artist: i.src,
            UserId: userObject.id
        }

        fetch("https://api.cloudinary.com/v1_1/dkndgz1ge/image/upload", {
            method: "POST",
            body: formData
        }).then(r => { return r.text() })
            .then((data) => {
                console.log(data)
            })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Upload Image
            </Button>
            <Modal show={show} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {publicId ? <Image cloudName="dkndgz1ge" publicId={user.imageLocation}/> : ""}
                    <UploadWidget publicId={publicId} setPublicId={setPublicId} />
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={(e) => {
                        uploadImage(e)
                        handleClose()
                    }} variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}