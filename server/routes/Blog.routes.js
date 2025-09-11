import express from "express"; // import express framework
import { createBlog, deleteBlog, editBlog, getAllBlogs, getSingleBlog } from "../controller/Blog.controller.js";

const route = express.Router(); // The line in a Node.js Express app creates a new router instance using Express’s Router class. This router object can be used to define modular, mountable route handlers.

// http://localhost:8080/api/v1/blog/createblog
route.post("/createblog", createBlog); // This line defines a POST route at the path "/createblog" using the router instance. When a POST request is made to this path, the createBlog controller function will be executed to handle the request.

// http://localhost:8080/api/v1/blog/editblog/68b08eef047aa5ba210fe62c
route.put("/editblog/:id" , editBlog)

//http://localhost:8080/api/v1/blog/getallblogs
route.get("/getallblogs", getAllBlogs)

//http://localhost:8080/api/v1/blog/deteleblog/id
route.delete("/deteleblog/:id",deleteBlog)
export default route; // export the router instance for use in other parts of the application

//http://localhost:8080/api/v1/blog/getsingleblog/id
route.get("/getsingleblog/:id",getSingleBlog)