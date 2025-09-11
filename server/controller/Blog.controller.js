import mongoose, { get } from "mongoose";
import Blog from "../model/Blog.model.js";

export const createBlog = async (req, res, next) => {
  // console.log(req.body); // log the request body to the console for debugging purposes from  postman
  const { title, image, content, topic } = req.body; // destructure title, image, content, and topic from the request body

  try {
    const data = new Blog({ title, image, content, topic }); // create a new instance of the Blog model with the provided data
    await data.save(); // save the new blog post to the database

    return res
      .status(200)
      .json({ success: true, message: "Blog created successfully" }); // send a success response with the created blog data
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error , cannot create blog at this time",
    }); // send an error response if there is a server error
  }
};

export const editBlog = async (req, res, next) => {
  const blogId = req.params.id; // we wil get the blog id from the url . and that id will be used to find the blog to be updated or edit the blog. req.params.id is used to access the id parameter from the URL of the incoming request.
  // after collecting the incomming blog id , we have to check whether the blog with that id is present in the database or not. if we are not checking the if the id is abailable or not in the database , then it will create a new blog with that id. which we don't want.
  // so we will first check whether the blog with that id is present in the database or not.
  // we will use try and catch block to handle the error.
  // in the try block , we will first find the blog with that id using Blog.findById(blogId)
  // if the blog is not present with that id , then we will return an error message "blog not found".
  // if the blog is present with that id , then we will update the blog with the new data provided in the request body.

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      // check if the provided blogId is a valid MongoDB ObjectId format using mongoose.Types.ObjectId.isValid(blogId).
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }
    const blog = await Blog.findById(blogId); // finds a single blog document in the database by its unique/matching identifier (blogId).
    //If it finds a matching document → it returns that document object.
    //If it does not find a match → it simply returns null.
    //that is why we have to provide a error message if blog is not found with that id. otherwise it will return null.
    if (!blog) {
      // if blog is not found with that id return 404 error . blog is not found. otherwise it wiil show null.
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    const updateBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: req.body }, //This part says “take whatever fields come from the request body, and set them on the blog.”
      { new: true }
    ); // it takes three parameters:
    //1) The unique identifier of the document to be updated (blogId). which means which element we want to update
    //In this case, blogId is the ID of the blog post we want to update.
    //It tells Mongoose which specific document in the "blogs" collection should be modified.
    //2) $set is a MongoDB update operator.It tells MongoDB: “For these fields, update their values. If the field doesn’t exist yet, create it.” what data we want to update.
    //  it is an updating operator of the mongo DB. An update object that specifies the changes to be made ({ $set: req.body }). it tell that i am gonig to update the blog data which is already available in the req.body without changing the id of the blog. replace the old data with the new data provided in req.body.
    //The $set operator is used to update specific fields in the document with new values.
    //In this case, req.body contains the new data for the blog post that we want to update.
    //3) An options object ({ new: true }) that indicates whether to return the updated document (true) or the original document (false). This is a Mongoose option that changes what you get back.
    // By default, findByIdAndUpdate returns the old version of the document (the one before updating).
    // With { new: true }, it instead returns the updated document.
    // So updateBlog will hold the blog after the changes.
    return res.status(200).json({ success: true, message: "Blog update..." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error....." });
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find(); // fetches all blog documents from the database using the Blog model's find method. It retrieves all entries in the "blogs" collection.
    //if we do not pass any parameter to the find() method, it returns all documents in the collection.
    //or we can also pass some filter criteria to find specific documents that match certain conditions.
    //like find({title : "My blog 3"}) will return all the blogs with the title "My blog 3"
    return res
      .status(200)
      .json({ success: true, message: "Blogs found....", data: allBlogs }); // send a success response with the retrieved blog data and data : allBlogs includes all the blogs fetched from the database and sends them back to the client in the response.
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error..." });
  }
};
// if(user.id !== blog.author.id) {
// return error
// }

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id; // get the blog id from the url
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }
    const blog = await Blog.findById(blogId); // find the blog by id from the database. mongodb method to find a document by its unique identifier (blogId).
    //If it finds a matching document → it returns that document object.
    //If it does not find a match → it simply returns null.
    //that is why we have to provide a error message if blog is not found with that id. otherwise it will return null.
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found with this id" });
    }
    await Blog.findByIdAndDelete(blogId); // find the blog by id and delete it from the database and no need to store it in any variable because we are not going to use it again.
    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "server error...!" });
  }
};

export const getSingleBlog = async (req, res, next) => {
  const blogId = req.params.id; // get the blog id from the url

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found with this id" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog found...!", data: blog });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "server error...!" });
  }
};
