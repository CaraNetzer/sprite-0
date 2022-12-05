import React, { useState, useEffect, useContext } from "react";
import { Image } from './Image';
import { getAll } from "../../managers/ImageManager";
import { Link } from "react-router-dom";
import { UploadWidget } from "./UploadWidget";


const PostList = () => {
  const [images, setImages] = useState([]);
  const [publicId, setPublicId] = useState("")


  const localUser = localStorage.getItem("userProfile")
  const userObject = JSON.parse(localUser)

  useEffect(() => {
    //getAll().then(i => setImages(i));
  }, []);

  return (
    <>
    <Link to={`/`}>
      Upload
    </Link>

    <UploadWidget publicId={publicId} setPublicId={setPublicId}/>
    <h1>Images</h1>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {images.length > 0 ? images?.map((image) => (
            <>
              <Image key={image.id} images={image} />
            </>
          )) : <p>No posts yet</p>}
        </div>
      </div>
    </div>
    </>
  );
};

export default PostList;