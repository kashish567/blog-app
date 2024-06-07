import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  // Get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/blogs/user-blogs/${id}`
      );
      if (data?.success) {
        setBlogs(data?.blogs); // Update state with received data
        setLoading(false); // Set loading state to false after data is received
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  console.log(blogs);

  return (
    <div>
      {loading ? ( // Show loading message while data is being fetched
        <h1>Loading...</h1>
      ) : blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You Haven't Created a Blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
