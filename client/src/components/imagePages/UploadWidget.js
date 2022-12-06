import React from 'react'
import { useEffect, useRef } from "react";

export const UploadWidget = ({ publicId, setPublicId }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dkndgz1ge",
            uploadPreset: "a4ogqwyb"
        }, function(error, result) {
            if(result.event == "success") {
                setPublicId(result.info?.public_id)
            }
        })
    }, [])

    return (
        <button className="cloudinary-button" onClick={() => {widgetRef.current.open()}}>Upload</button>
    )
}