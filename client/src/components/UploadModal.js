import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { UploadWidget } from './imagePages/UploadWidget';
import Form from 'react-bootstrap/Form';
import { Image } from "cloudinary-react";
import { addImage } from "../managers/ImageManager";



export function UploadModal(props) {

    const [cloudinaryUrl, setCloudinaryUrl] = useState("")
    const [thumbnailUrl, setThumbnailUrl] = useState("")

    const [image, updateImage] = useState({
        Src: "",
        Price: "",
        Width: "",
        Height: "",
        Notes: "",
        Title: "",
        Sheet: false,
        Upvotes: 0,
        Downvotes: 0,
        Artist: ""
    })

    useEffect(() => {
        //reset all variables
        updateImage({
            Src: "",
            Price: "",
            Width: "",
            Height: "",
            Notes: "",
            Title: "",
            Sheet: false,
            Upvotes: 0,
            Downvotes: 0,
            Artist: ""
        });
        setCloudinaryUrl("");
        setThumbnailUrl("");
    }, [])

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    const uploadImage = (i, e) => {
        //e.preventDefault()

        const dbImage = {
            Src: cloudinaryUrl ?? "",
            Price: image.Price ?? 0,
            Width: image.Width,
            Height: image.Height,
            Notes: image.Notes,
            Title: image.Title,
            Sheet: image.Sheet,
            Upvotes: 0,
            Downvotes: 0,
            Artist: image.Artist,
            UserId: userObject.id
        }

        addImage(dbImage)        
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Upload Image
            </Button>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {thumbnailUrl ? <Image id="img-preview" cloudName="dkndgz1ge" publicId={thumbnailUrl} /> : ""}
                    <UploadWidget setCloudinaryUrl={setCloudinaryUrl} setThumbnailUrl={setThumbnailUrl}/>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Image Title"
                                autoFocus
                                required
                                value={image.Title}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Title = e.target.value
                                    updateImage(copy)
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control type="text" placeholder="Artist (if known)"
                                value={image.Artist}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Artist = e.target.value
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price (optional):</Form.Label>
                            <Form.Control type="number" placeholder="optional"
                                value={image.Price}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Price = e.target.value
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Width in px</Form.Label>
                            <Form.Control type="number" required
                                value={image.Width}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Width = e.target.value
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Height (in px): </Form.Label>
                            <Form.Control type="number" required
                                value={image.Height}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Height = e.target.value
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Sheet?"
                                value={image.Sheet}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Sheet = e.target.value
                                    //debugger
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} 
                                value={image.Notes}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Notes = e.target.value
                                    updateImage(copy)
                                }}/>
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