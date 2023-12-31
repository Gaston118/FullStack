// Blog.js
import React, { useState } from 'react';

const Blog = ({ blog , handleLike, user, handleDelete}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showDetails, setShowDetails] = useState(false);
  const isUserBlog = user && blog.user && user.username === blog.user.username;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <h4>{blog.title}</h4>
        <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'View'}</button>
        {isUserBlog && <button onClick={() => handleDelete(blog.id)}>Delete</button>}
      </div>
      {showDetails && (
        <div>
          <p>Likes: {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button></p>
          <p>Author: {blog.author}</p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
