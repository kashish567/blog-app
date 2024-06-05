const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
} = require("../controllers/blogController");

const router = express.Router();

router.get("/all-blog", getAllBlogsController);

router.post("/create-blog", createBlogController);

router.put("/update-blog/:id", updateBlogController);

router.get("/get-blog/:id", getBlogByIdController);

router.delete("/delete-blog/:id", deleteBlogController);

module.exports = router;
