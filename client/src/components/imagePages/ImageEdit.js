import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getImage, editImage } from "../../managers/ImageManager";
import { WithContext as ReactTags } from 'react-tag-input';
import Form from 'react-bootstrap/Form';
import { addTag, getAllTags, getImageTags, addImageTag, removeImageTag } from "../../managers/TagManager";
import { Image } from "cloudinary-react";



const ImageEdit = () => {
    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    const [image, setImage] = useState({
        Src: "",
        Price: 0.00,
        Width: 0,
        Height: 0,
        Notes: "",
        Title: "",
        Sheet: false,
        Upvotes: 0,
        Downvotes: 0,
        Artist: "",
        UserId: userObject.id
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const [tags, setAllTags] = useState([])
    const [thisTags, setThisTags] = useState([])

    useEffect(() => {
        getImage(id).then(setImage);
        getAllTags().then(setAllTags);
        getImageTags(id).then(setThisTags);
    }, [])
    
    const startingTags = [...thisTags];

    //one step behind issue -- needed e.preventDefault();
    const Edit = (e) => {

        e.preventDefault();

        const editedImage = {
            id: image.id,
            src: image.src,
            price: image.price ?? 0.00,
            width: image.width,
            height: image.height,
            notes: image.notes,
            title: image.title,
            sheet: image.sheet,
            upvotes: 0,
            downvotes: 0,
            artist: image.artist,
            userId: userObject.id
        }

        //change tag ids back to ints
        const cleanedThisTags = thisTags.map(t => { return { id: parseInt(t.id), name: t.name } })
        editedImage.Tags = cleanedThisTags

        editImage(editedImage).then(() => {
            navigate(`/image/${id}`)
        }).then(response => {
            cleanedThisTags.forEach(thisTag => {
                if (startingTags.find(t => t.id === thisTag.id && t.name === thisTag.name) == undefined) {
                    addImageTag({
                        tagId: thisTag.id,
                        imageId: parseInt(id),
                    })
                }
            })
        })
    }

    const Cancel = () => {
        navigate(`/image/${id}`)
    }

    //#region tag methods
    const handleDelete = i => {
        const tagToRemove = thisTags.find((tag, index) => index == i);
        setThisTags(thisTags.filter((tag, index) => index !== i));
        removeImageTag({imageId: id, tagId: parseInt(tagToRemove.id)});
    };

    const handleAddition = tag => {
        //don't add tag if it's already in the list
        if (tags.find(t => t.name == tag.name) == undefined) {
            const newTag = {
                name: tag.name
            };
            addTag(newTag)
                .then(t => {
                    setThisTags([...thisTags, t]);
                })
            getAllTags().then(t => setAllTags(t))
        }

        if (thisTags?.find(t => t.name == tag.name) == undefined) {
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

    const KeyCodes = {
        comma: 188,
        enter: 13,
        tab: 9
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];
    //#endregion

    return (
        <Form id="image-edit-form">
            <Image id="img-preview" cloudName="dkndgz1ge" publicId={image.Src} />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Image Title"
                    autoFocus
                    required
                    value={image.title}
                    onChange={(e) => {
                        const copy = { ...image }
                        copy.title = e.target.value
                        setImage(copy)
                    }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Artist</Form.Label>
                <Form.Control type="text" placeholder="Artist (if known)"
                    value={image.artist}
                    onChange={(e) => {
                        const copy = { ...image }
                        copy.artist = e.target.value
                        setImage(copy)
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Price (optional):</Form.Label>
                <Form.Control type="number" placeholder="optional"
                    value={image.price}
                    onChange={(e) => {
                        const copy = { ...image }
                        copy.price = e.target.value
                        setImage(copy)
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Width in px</Form.Label>
                <Form.Control type="number" required
                    value={image.width}
                    onChange={(e) => {
                        const copy = { ...image }
                        copy.width = e.target.value
                        setImage(copy)
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Height (in px): </Form.Label>
                <Form.Control type="number" required
                    value={image.height}
                    onChange={(e) => {
                        const copy = { ...image }
                        copy.height = e.target.value
                        setImage(copy)
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Sheet?"
                    checked={image.sheet}
                    onChange={(e) => {
                        const copy = { ...image }
                        copy.sheet = e.target.checked
                        setImage(copy)
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3}
                    value={image.notes}
                    onChange={(e) => {
                        const copy = { ...image }
                        copy.notes = e.target.value
                        setImage(copy)
                    }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Add Tags</Form.Label>
                <ReactTags
                    inline
                    tags={thisTags?.map(t => { return { id: `${t.id}`, name: t.name } })}
                    suggestions={tags?.map(t => { return { id: `${t.id}`, name: t.name } })}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    inputFieldPosition="top"
                    labelField={'name'}
                    placeholder="ie 'Object,' 'Entity,' 'UI,' ..."
                    autocomplete
                    autofocus={false}
                />
            </Form.Group>
            <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={e => Edit(e)}>Edit</button>
            <button className="btn btn-secondary" onClick={e => Cancel()}>Cancel</button>
        </Form>
    )
}

export default ImageEdit;