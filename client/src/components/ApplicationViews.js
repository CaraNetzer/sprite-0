import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Hello from "./Hello";
import ImageBoard from "./imagePages/ImageBoard";
import { ImageDetails } from "./imagePages/ImageDetails";
import ImageEdit from "./imagePages/ImageEdit";
import { Search } from './Search';


export default function ApplicationViews( { imageList }) {

    return (
      <Routes>
  
        <Route path="/" element={<ImageBoard imageList={imageList}/>} />
        <Route path="/image/:id" element={<ImageDetails />} />
        <Route path="/imageEdit/:id" element={<ImageEdit />} />        
        <Route path="/search" element={<Search />} />        
        {/* <Route path="/tag" element={<Tag />} />
        <Route path="/createTag" element={<TagForm />} />
        <Route path="/deleteTag/:id" element={<TagDelete />} />
        <Route path="/my-posts/:id/comments" element={<PostComments isMy={true} />} />
        <Route path="/posts/:id/comments" element={<PostComments isMy={false} />} />
        <Route path="/addtag" element={<PostTag />} /> */}
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
  
      </Routes>
    );
  }
  