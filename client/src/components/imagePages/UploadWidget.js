import React from 'react'
import { useEffect, useRef } from "react";

export const UploadWidget = ({ setThumbnailUrl, setCloudinaryUrl }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dkndgz1ge",
            uploadPreset: "a4ogqwyb"
        }, function(error, result) {
            if(result.event == "success") {
                console.log(result.info)
                setThumbnailUrl(result.info.thumbnail_url)
                setCloudinaryUrl(result.info.url)
            }
        })
    }, [])

    return (
        <button className="cloudinary-button" onClick={() => {widgetRef.current.open()}}>Upload</button>
    )
}