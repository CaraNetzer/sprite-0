import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Hello from "./Hello";
import ImageBoard from "./imagePages/ImageBoard";
import { ImageDetails } from "./imagePages/ImageDetails";
import ImageEdit from "./imagePages/ImageEdit";
import { Search } from './Search';
import { MyProfile } from "./userProfilePages/MyProfile";
import { UserProfile } from "./userProfilePages/UserProfile";


export default function ApplicationViews( { imageList, setImages, images }) {

    return (
      <Routes>
  
        <Route path="/" element={<ImageBoard imageList={imageList} setImages={setImages} images={images} />} />
        <Route path="/image/:id" element={<ImageDetails />} />
        <Route path="/imageEdit/:id" element={<ImageEdit />} />        
        <Route path="/search/:id" element={<Search setImages={setImages} images={images}/>} />        
        <Route path="/myProfile" element={<MyProfile setImages={setImages} images={images}/>} />      
        <Route path="/profile/:id" element={<UserProfile setImages={setImages} images={images} />} />      
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
  
      </Routes>
    );
  }
  