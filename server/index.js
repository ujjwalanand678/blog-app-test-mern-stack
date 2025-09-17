import express from "express"; // import express framework
import dotenv from "dotenv"; // import dotenv to manage environment variables
import mongoose from "mongoose"; // import mongoose for MongoDB object modeling
import BlogRoutes from "./routes/Blog.routes.js"; // import blog routes
import AuthRoutes from "./routes/Auth.routes.js";
import UserRoutes from "./routes/User.routes.js"

const app = express(); // The line const app = express() in Node.js initializes a new Express application instance that can be used to define HTTP routes, middleware, and server configuration.
//express() returns an object that represents your web application, typically stored in a variable called app.
//The app object provides methods for handling requests (such as app.get(), app.post()), applying middleware, and listening for incoming connections.
//The app object created by express() serves as the central hub for your Node.js web application, handling configuration, routing, and server behavior.

dotenv.config(); // Calling dotenv.config() in Node.js loads environment variables from a local .env file into process.env, allowing app configuration to be managed outside of the codebase.
//The dotenv package parses the .env file and injects its key-value pairs into process.env, making variables accessible within the application as process.env.VARIABLE_NAME.
//This improves security and flexibility by keeping sensitive information (like API keys, credentials, or config settings) separate from source code.

const port = process.env.PORT || 8080; // set the port from environment variable or default to 8080
//process.env.PORT accesses the value of the PORT environment variable, which is commonly set in hosting environments or through deployment configuration.
//The || 8080 part means that if process.env.PORT is undefined (not set), Node.js will use 8080 as a fallback port.

mongoose.set("strictQuery", false); // The line mongoose.set("strictQuery", false); configures Mongoose to not filter out unknown fields in query filters, allowing queries to include fields that are not defined in your Mongoose schema.

  // The connectDB function is an asynchronous function that attempts to connect to MongoDB using Mongoose with the connection URI stored in environment variables.
const connectDB = async () => {
  //this try and catch block attempts to connect to MongoDB using the URI stored in environment variables
  //if the connection is successful, it logs a success message; if it fails, it logs an error message
  try {
    await mongoose.connect(process.env.MONGO_URI); // uses the MongoDB connection URI from the environment variable MONGO_URI to establish the connection.
    console.log(`Connected to MongoDB`); // log success message if connected to MongoDB
  } catch (error) {
    console.log("Error");
  }
};
//The function uses a try...catch block to handle errors gracefully during the connection attempt.

// after connectDB connection to database is successful then only the server will start
// this ensures that the server does not start until the database connection is established
// call the connectDB function to establish a connection to MongoDB
//then start the server and listen on the specified port


// Middleware to parse JSON request bodies
app.use(express.json()); // The line app.use(express.json()) in a Node.js Express application adds middleware that parses incoming JSON request bodies and makes the parsed data available on req.body. (sent from body in postman or frontend)
app.use("/api/v1/blog", BlogRoutes); // The line app.use("/api/blog", blogRoutes); mounts the blogRoutes router on the /api/blog path in the Express application.
//This means that any routes defined in blogRoutes will be accessible under the /api/blog URL prefix.
//For example, if blogRoutes defines a route for GET /createblog, it will be accessible at /api/blog/createblog in the main app.
app.use("/api/v1/auth", AuthRoutes)
app.use("/api/v1/user", UserRoutes)

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  }); // start the server and listen on the specified port
});
//connectDB() is an asynchronous function that attempts to connect to the database.
//The .then(() => { ... }) block executes once the database connection is successful.
//Inside this block, app.listen(port, ...) starts the server and listens for incoming requests on the specified port, logging a confirmation message.
//Why This Pattern Is Important
//By starting the server after the database connection is confirmed, the application avoids starting in a partially broken state where incoming requests could fail due to lack of access to the database.
//This is particularly useful in applications where most or all routes depend on the database, as it helps maintain reliability and consistency.
//The server only becomes available to handle requests once everything is properly initialized.