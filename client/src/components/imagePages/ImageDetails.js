import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { getImage, deleteImage } from "../../managers/ImageManager";
//import { addSubscription, getAllSubscriptions, unSubscribe } from "../../Managers/SubscriptionManager";
import { WithContext as ReactTags } from 'react-tag-input';
import { addTag, getAllTags, getImageTags, addImageTag } from "../../managers/TagManager";


export const ImageDetails = () => {
    const [image, updateImage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const [tags, setAllTags] = useState("")
    const [thisTags, setThisTags] = useState("")

    const downloadString = image.src?.slice(0, 49) + "/f_png/fl_attachment" + image.src?.slice(49) ?? "";

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

        getAllTags().then(setAllTags);
        getImageTags(id).then(setThisTags);
    }, []);


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

    //#region tag methods
    const handleDelete = i => {
        setThisTags(thisTags.filter((tag, index) => index !== i));
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
            const newtags = thisTags
            addImageTag({imageId: id, tagId: parseInt(newtags?.find(t => t.name == tag.name)?.id)})
                .then(getImage(id).then(i => updateImage(i)));
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

    if (!image) {
        return null;
    }

    return (
        <Card className="m-4">
            <CardBody>
                <strong>{image.title}</strong>

                <p>Artist: {image.artist}
                    {/* {!subscribed && post.userProfileId != userObject.id
                        ? <>
                            <span>  |  </span><button onClick={e => Subscribe(e)}>Subscribe</button>
                        </>
                        : ""
                    }
                    {subscribed && foundSubscription?.endDateTime == "0001-01-01T00:00:00" /*make sure the subscription has not already ended
                        ? <>
                            <span>  | Subscribed ✅ | </span><span><button onClick={e => Unsubscribe(e)}>Unsubscribe</button></span>
                        </>
                        : ""
                    } */}
                </p>
                {/* <div>
                    Tags: {post.tags.map((t) => <p>{t.name}</p>)}
                </div>
                <button onClick={(e) => navigate('/addTag')} style={{ marginTop: '15px', width: '120px' }}>Manage Tags</button> */}
                <CardImg className="details-img" top src={image.src} alt={image.title} onError={handleBrokenImage} />
                <p>
                    <a href={image.src}
                        target="popup"
                        onClick={() => window.open(`${image.src}`, 'popup', 'width=600,height=600')}>
                        View image as actual size
                    </a>
                </p>
                {downloadString ? <a href={downloadString}>Download</a> : ""}
                <ReactTags
                    inline
                    tags={thisTags?.map(t => { return { id: `${t.id}`, name: t.name } })}
                    suggestions={tags?.map(t => { return { id: `${t.id}`, name: t.name } })}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    inputFieldPosition="bottom"
                    labelField={'name'}
                    placeholder="ie 'Object,' 'Entity,' 'UI,' ..."
                    autocomplete
                />
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