const blogModel = require("../models/blogModel");

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).send({
        message: "No blog found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "All blogs",
      blogsCount: blogs.length,
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in getting blogs",
      success: false,
      error: error.message,
    });
  }
};
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }
    const newBlog = new blogModel({
      title,
      description,
      image,
    });
    await newBlog.save();
    return res.status(201).send({
      message: "Blog created successfully",
      success: true,
      blog: newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in creating blog",
      success: false,
      error: error.message,
    });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    // Find and update the blog
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    // If the blog doesn't exist, return a 404 error
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    // Return the updated blog
    return res.status(200).send({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in updating blog",
      success: false,
      error: error.message,
    });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching blog with ID: ${id}`); // Log the ID

    const blog = await blogModel.findById(id);
    if (!blog) {
      console.log(`Blog not found for ID: ${id}`); // Log if not found
      return res.status(404).send({
        message: "Blog not found",
        success: false,
      });
    }

    console.log(`Blog found: ${JSON.stringify(blog)}`); // Log the found blog
    return res.status(200).send({
      message: "Single blog",
      success: true,
      blog,
    });
  } catch (error) {
    console.error(`Error fetching blog with ID: ${id}`, error); // Log the error
    return res.status(500).send({
      message: "Error in getting single blog",
      success: false,
      error: error.message,
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
        success: false,
      });
    }

    await blogModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in deleting blog",
      success: false,
      error: error.message,
    });
  }
};
