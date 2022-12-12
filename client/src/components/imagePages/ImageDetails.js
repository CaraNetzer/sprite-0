import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { getImage, deleteImage } from "../../managers/ImageManager";
import { getImageTags } from "../../managers/TagManager";


export const ImageDetails = () => {
    const [image, updateImage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const [thisTags, setThisTags] = useState([])
    const [downloadString, setDownloadString] = useState("")

    const [favorite, setFavorite] = useState(false)



    //all post image links are broken, so need to replace them all with a default image
    const handleBrokenImage = (image) => {
        const defaultImage = "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg";
        image.target.src = defaultImage;
    };

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

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


    const Favorite = (e) => {
        e.preventDefault();

        /*  const newFavorite = {
             SubscriberUserProfileId: userObject.id,
             ProviderUserProfileId: post.userProfileId
         }
 
         addSubscription(newSubscription)
             .then(() => setSubscribed(true)); */
    }

    const Unfavorite = (e) => {
        e.preventDefault();

        /* const favorite = {
            id: foundSubscription.id,
            SubscriberUserProfileId: userObject.id,
            ProviderUserProfileId: post.userProfileId,
            BeginDateTime: foundSubscription.beginDateTime
        }

        unSubscribe(subscription) */
    }

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
        <Card className="m-4">
            <CardBody>
                <strong>{image.title}</strong>

                {/*{favorite 
                    ? <i onClick={(e) => {							
                        e.target.classList.toggle("fa-heart-o");
                        {folderImage ? removeFavorite(e) : addFavorite(e)};
                    }} className="icon heart fa fa-heart-o fa-heart"></i>
                    : ""
                } */}
                <p>Artist: {image.artist}
                </p>
                <p>Uploaded by: <a href={`/profile/${image.user.id}`}>{image.user.username}</a></p>
                <CardImg className="details-img" top src={image.src} alt={image.title} onError={handleBrokenImage} />
                <p>
                    <a href={image.src}
                        target="popup"
                        onClick={() => window.open(`${image.src}`, 'popup', 'width=600,height=600')}>
                        View image as actual size
                    </a>
                </p>
                {downloadString ? <p><a href={downloadString}>Download</a></p> : ""}
                {image.tags?.map(t => <p className="ReactTags__tag"><a onClick={() => navigate('/search')}>{t.name}</a></p>)}
                {/* making sure a user only has access to the delete button if they were the one who created it */}
                {userObject.id == image.userId
                    ? <>
                        <button onClick={e => handleImageDelete(e)}>Delete</button>
                        <button onClick={e => handleImageEdit(e)}>Edit</button>
                    </>
                    : ""
                }
                <p>{image.notes}</p>
            </CardBody>
        </Card>
    );
};