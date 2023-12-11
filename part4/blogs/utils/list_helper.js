const dummy = (blogs) => {
    // La función dummy simplemente devuelve 1
    return 1;
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  }
  
  module.exports = {
    dummy,
    totalLikes
  };
  