import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody, ButtonGroup, Button } from "reactstrap";
import { getImage, deleteImage } from "../../managers/ImageManager";
import { getImageTags } from "../../managers/TagManager";
import { addImageToFolder, removeImageFromFolder, getFoldersByUser, getImageFolders } from "../../managers/FolderManager";


export const ImageDetails = () => {

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    const [image, updateImage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const [thisTags, setThisTags] = useState([])
    const [downloadString, setDownloadString] = useState("")

    const [favorite, setFavorite] = useState(false)
    const [userFolders, setUserFolders] = useState("");
    const [foldersThisImageIsIn, setFoldersThisImageIsIn] = useState([]);


    //#region favorites
    useEffect(() => {
        getFoldersByUser(userObject.id).then(setUserFolders);
        getImageFolders(id).then(setFoldersThisImageIsIn)
    }, [])

    useEffect(() => {
        if (foldersThisImageIsIn.length > 0) {
            if (foldersThisImageIsIn?.find(f => f.name == "Favorites" && f.userId == userObject.id)) {
                setFavorite(true)
            } else {
                setFavorite(false)
            }
        } else {
            setFavorite(false)
        }
    }, [foldersThisImageIsIn])

    const addFavorite = (e) => {
        e.preventDefault();

        const imageFolder = {
            folderId: userFolders.find(f => f.userId == userObject.id && f.name == "Favorites").id,
            imageId: image.id
        }

        addImageToFolder(imageFolder).then(getImageFolders(image.id)).then(setFoldersThisImageIsIn);
    }

    const removeFavorite = (e) => {
        e.preventDefault();

        const imageFolder = {
            folderId: userFolders.find(f => f.userId == userObject.id && f.name == "Favorites").id,
            imageId: image.id
        }

        removeImageFromFolder(imageFolder).then(getImageFolders(image.id)).then(setFoldersThisImageIsIn);
    }
    //#endregion


    //all post image links are broken, so need to replace them all with a default image
    const handleBrokenImage = (image) => {
        const defaultImage = "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg";
        image.target.src = defaultImage;
    };


    //set all state variables inside the useEffect instead of inside this component's methods    
    useEffect(() => {
        getImage(id)
            .then(i => updateImage(i));

        getImageTags(id).then(setThisTags);

        //getFolderImage(id).then(() => {
        /* if data != null {
            setFavorite(true)
        }
    }) */
    }, []);



    useEffect(() => {
        let newDownloadString = ""
        if (image.src?.startsWith('https')) {
            newDownloadString = image.src?.slice(0, 49) + "/f_png/fl_attachment" + image.src?.slice(49) ?? "";
        } else {
            newDownloadString = image.src?.slice(0, 49) + "f_png/fl_attachment/" + image.src?.slice(49) ?? "";
        }
        setDownloadString(newDownloadString);
    }, [image])


    const handleImageDelete = (e) => {
        deleteImage(image.id).then((e) => navigate('/'));
    }
    const handleImageEdit = () => {
        navigate(`/imageEdit/${id}`);
    }



    if (!image) {
        return null;
    }

    return (
        <Card id="top-level-image-card" className="m-4">
            <CardBody id="image-card">
                <div id="image-card-left">
                    <div id="image-details-header">
                        <h2 id="image-title">{image.title}</h2>

                        {favorite
                            ? <i onClick={(e) => {
                                e.target.classList.toggle("fa-heart-o");
                                { favorite ? removeFavorite(e) : addFavorite(e) };
                            }} className="icon heart fa fa-heart">

                            </i>
                            : <i onClick={(e) => {
                                e.target.classList.toggle("fa-heart-o");
                                { favorite ? removeFavorite(e) : addFavorite(e) };
                            }} className="icon heart fa fa-heart-o fa-heart">

                            </i>
                        }
                    </div>
                    {image.artist?.length < 2
                        ? ""
                        : <p id="artist"><strong>Artist:</strong> {image.artist}</p>
                    }
                    <p>Uploaded by: <a href={`/profile/${image.user.id}`}>{image.user.username}</a></p>

                    {image.tags?.map(t => <p className="ReactTags__tag"><a onClick={() => navigate(`/search/${t.name}`)}>#{t.name}</a></p>)}
                    {/* making sure a user only has access to the delete button if they were the one who created it */}
                    <p id="image-notes"><strong>Notes:</strong> {image.notes?.length > 2 ? <><br></br>{image.notes}</> : <span style={{color:"#8d91a3"}}>None</span>}</p>
                    {userObject.id == image.userId
                        ? <p>
                            <button className="btn btn-primary edit" onClick={e => handleImageEdit(e)}>Edit</button>
                            <button className="btn btn-danger" onClick={e => handleImageDelete(e)}>Delete</button>
                        </p>
                        : ""
                    }
                </div>
                <div id="image-card-right">
                    <ButtonGroup id="image-links">
                        <a className="btn btn-success" href={image.src}
                            target="popup"
                            onClick={() => window.open(`${image.src}`, 'popup', 'width=600,height=600')}>
                            View image as actual size
                        </a>
                        {downloadString ? <a className="btn btn-success" href={downloadString}>Download</a> : ""}
                    </ButtonGroup>
                    <CardImg className="details-img" top src={image.src} alt={image.title} onError={handleBrokenImage} />
                </div>




            </CardBody>
        </Card>
    );
};