
import React, { useState } from 'react';

const BlogForm = ({ addBlog, newTitle, newAuthor, newLikes, handleTitle, handleAuthor, handleLikes }) => {

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>Title: <input value={newTitle || ''} onChange={handleTitle} required/></div>
        <div>Author: <input value={newAuthor || ''} onChange={handleAuthor} required/></div>
        <div>Likes: <input value={newLikes || ''} onChange={handleLikes}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  );
};

export default BlogForm;
