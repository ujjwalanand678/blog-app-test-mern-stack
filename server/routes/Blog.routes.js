import express from "express"; // import express framework
import { createBlog, deleteBlog, editBlog, getAllBlogs, getBlogByTopic, getBlogsByMultipleTopics, getBlogsByQuery, getSingleBlog } from "../controller/Blog.controller.js";
import { authorize } from "../auth/VerifyToken.js";

const route = express.Router(); // The line in a Node.js Express app creates a new router instance using Express’s Router class. This router object can be used to define modular, mountable route handlers.

// http://localhost:8080/api/v1/blog/createblog
route.post("/createblog",authorize, createBlog); // This line defines a POST route at the path "/createblog" using the router instance. When a POST request is made to this path, the createBlog controller function will be executed to handle the request.

// http://localhost:8080/api/v1/blog/editblog/68b08eef047aa5ba210fe62c
route.put("/editblog/:id" ,authorize, editBlog)

//http://localhost:8080/api/v1/blog/getallblogs
route.get("/getallblogs", getAllBlogs)

//http://localhost:8080/api/v1/blog/deteleblog/id
route.delete("/deteleblog/:id",authorize,deleteBlog)
export default route; // export the router instance for use in other parts of the application

//http://localhost:8080/api/v1/blog/getsingleblog/id
route.get("/getsingleblog/:id",getSingleBlog)

//http://localhost:8080/api/v1/blog/getblogbytopic/:topic
route.get("/getblogbytopic/:topic", getBlogByTopic)

//http://localhost:8080/api/v1/blog/getblogsbyquery/?topic=js 
// here we are using query parameter to get the blogs by topic. so we have to use req.query to get the topic from the url. ? indicates that what follows are query parameters.
route.get("/getblogsbyquery", getBlogsByQuery)

//http://localhost:8080/api/v1/blog/getblogsbymultiplequeries/?topic=js&topic=react
// here we are using multiple query parameters to get the blogs by multiple topics. so we have to use req.query to get the topics from the url. & indicates that what follows are multiple query parameters. 
route.get("/getblogsbymultiplequeries", getBlogsByMultipleTopics)