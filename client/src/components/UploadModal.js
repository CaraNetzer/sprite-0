import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { UploadWidget } from './imagePages/UploadWidget';
import { WithContext as ReactTags } from 'react-tag-input';
import Form from 'react-bootstrap/Form';
import { Image } from "cloudinary-react";
import { addImage, getAllImages } from "../managers/ImageManager";
import { addTag, getAllTags, addImageTag } from "../managers/TagManager";


export function UploadModal({ setImageList }) {

    const [cloudinaryUrl, setCloudinaryUrl] = useState("")
    const [thumbnailUrl, setThumbnailUrl] = useState("")
    const [tags, setAllTags] = useState([])
    const [thisTags, setThisTags] = useState([])
    const [errors, setErrors] = useState({})


    const [image, updateImage] = useState({
        Src: "",
        Price: 0,
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
        getAllTags().then(t => setAllTags(t))
    }, [])


    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    const validate = () => {
        let temp = {}
        temp.title = image.Title == "" ? false : true;
        temp.width = image.Width == "" ? false : true;
        temp.height = image.Height == "" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')


    const uploadImage = (e) => {
        e.preventDefault()

        if (validate()) {
            const dbImage = {
                Src: cloudinaryUrl ?? "",
                Price: image.Price ?? 0.00,
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

            //change tag ids back to ints
            const cleanedThisTags = thisTags.map(t => { return { id: parseInt(t.id), name: t.name } })
            dbImage.Tags = cleanedThisTags

            fetch('/api/Image', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dbImage)
            }).then((res) => res.json())
                .then(response => {
                    cleanedThisTags.forEach(thisTag => addImageTag({
                        tagId: tags.find(t => t.name == thisTag.name).id,
                        imageId: response.id,
                    }));
                })
                .then(getAllImages().then(i => setImageList(i)))
                .then(getAllTags().then(setAllTags))
                .then(handleClose);
        }

    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        //reset all variables
        updateImage({
            Src: "",
            Price: 0.00,
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
        setShow(false)
        setThisTags([])
        setErrors({})
    }
    const handleShow = () => setShow(true);

    const handleDelete = i => {
        setThisTags(thisTags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        //don't add tag if it's already in the list
        if (tags.find(t => t.name == tag.name) == undefined) {
            const newTag = {
                name: tag.name
            };
            addTag(newTag) //need to find a way to store the id that comes back from this
                .then(t => {
                    setThisTags([...thisTags, t]);
                })
            getAllTags().then(t => setAllTags(t))
        }

        if (thisTags.find(t => t.name == tag.name) == undefined) {
            setThisTags([...thisTags, tag]);
        }
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = thisTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setThisTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const KeyCodes = {
        comma: 188,
        enter: 13,
        tab: 9
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];


    return (
        <>
            <Button id="upload-button" className="btn btn-info" variant="primary" onClick={handleShow}>
                Upload Image
            </Button>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {thumbnailUrl ? <Image id="img-preview" cloudName="dkndgz1ge" publicId={thumbnailUrl} /> : ""}
                    <UploadWidget setCloudinaryUrl={setCloudinaryUrl} setThumbnailUrl={setThumbnailUrl} />
                    <Form>
                        <Form.Group className={"mb-3" + applyErrorClass('title')}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                className={applyErrorClass('title')}
                                type="text"
                                placeholder="Image Title"
                                autoFocus
                                required={true}
                                value={image.Title}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Title = e.target.value
                                    updateImage(copy)
                                }}
                            />
                            {/* <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control type="text" placeholder="Artist (if known)"
                                value={image.Artist}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Artist = e.target.value
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price (optional):</Form.Label>
                            <Form.Control type="number" placeholder="optional"
                                value={image.Price}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Price = e.target.value
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className={"mb-3" + applyErrorClass('width')}>
                            <Form.Label>Width in px</Form.Label>
                            <Form.Control type="number" required={true}
                                className={applyErrorClass('width')}
                                value={image.Width}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Width = e.target.value
                                    updateImage(copy)
                                }} />
                            {/* <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group className={"mb-3" + applyErrorClass('height')}>
                            <Form.Label>Height (in px): </Form.Label>
                            <Form.Control type="number" required={true}
                                className={applyErrorClass('height')}
                                value={image.Height}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Height = e.target.value
                                    updateImage(copy)
                                }} />
                            {/* <Form.Control.Feedback type="invalid">
                                Required.
                            </Form.Control.Feedback> */}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Sheet?"
                                value={image.Sheet}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Sheet = e.target.checked
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={image.Notes}
                                onChange={(e) => {
                                    const copy = { ...image }
                                    copy.Notes = e.target.value
                                    updateImage(copy)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Add Tags</Form.Label>
                            <ReactTags
                                inline
                                tags={thisTags.map(t => { return { id: `${t.id}`, name: t.name } })}
                                suggestions={tags.map(t => { return { id: `${t.id}`, name: t.name } })}
                                delimiters={delimiters}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                handleTagClick={handleTagClick}
                                inputFieldPosition="top"
                                labelField={'name'}
                                placeholder="ie 'Object,' 'Entity,' 'UI,' ..."
                                autocomplete
                                autofocus={false}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={(e) => {
                        uploadImage(e);
                    }} variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}