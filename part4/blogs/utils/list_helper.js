const dummy = (blogs) => {
    // La función dummy simplemente devuelve 1
    return 1;
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  }

  const favoriteBlog = (blogs) => {
    // Verificar si la lista de blogs está vacía
    if (blogs.length === 0) {
      return null; // Devolver null si no hay blogs
    }
  
    // Utilizar reduce para encontrar el blog con más likes
    const favorite = blogs.reduce((maxLikesBlog, currentBlog) => {
      return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog;
    }, blogs[0]); // Inicializar con el primer blog
  
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    };
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null; // Devolver null si no hay blogs
    }
  
    const blogCountsByAuthor = blogs.reduce((blogCounts, blog) => {
      const author = blog.author;
      blogCounts[author] = (blogCounts[author] || 0) + 1;
      return blogCounts;
    }, {});
  
    const mostBlogsAuthor = Object.keys(blogCountsByAuthor).reduce((maxBlogsAuthor, author) => {
      return blogCountsByAuthor[author] > blogCountsByAuthor[maxBlogsAuthor] ? author : maxBlogsAuthor;
    }, Object.keys(blogCountsByAuthor)[0]); // Inicializar con el primer autor
  
    return {
      author: mostBlogsAuthor,
      blogs: blogCountsByAuthor[mostBlogsAuthor]
    };
  }

  const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null; // Devolver null si no hay blogs
    }
  
    const likesByAuthor = blogs.reduce((likesCount, blog) => {
      const author = blog.author;
      likesCount[author] = (likesCount[author] || 0) + blog.likes;
      return likesCount;
    }, {});
  
    const mostLikesAuthor = Object.keys(likesByAuthor).reduce((maxLikesAuthor, author) => {
      return likesByAuthor[author] > likesByAuthor[maxLikesAuthor] ? author : maxLikesAuthor;
    }, Object.keys(likesByAuthor)[0]); // Inicializar con el primer autor
  
    return {
      author: mostLikesAuthor,
      likes: likesByAuthor[mostLikesAuthor]
    };
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  };
  