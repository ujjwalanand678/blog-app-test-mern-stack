import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // Define the schema for User model
  name: {
    type: String, // Name is a string
    required: true, // Name is required for each user
  },
  email: {
    type: String, // Email is a string
    required: true, // Email is required for each user
    unique: true, // Ensure email is unique across users , cannot have duplicate emails
  },
  password: {
    type: String ,
    required: true, // Password is required for each user
  },
  role :{
    type : String,
    enum : ["user", "admin"], // Role can only be either "user" or "admin"
    default : "user", // Default role is "user"
  },
  profilePic : String, // Profile picture URL is optional
});

export default mongoose.model("User" , UserSchema) //  is used to define and export a Mongoose model named "User " based on the UserSchema. This model represents a MongoDB collection and provides an interface for interacting with that collection using the defined schema structure.

//Explanation of the Code
//mongoose.model("User ", UserSchema) creates a Mongoose model:

//"User " is the name of the model. Mongoose will use the lowercase, pluralized form "users" as the MongoDB collection name by default. Note: There is an extra space after "User " which might cause issues or unexpected behavior; usually, the model name should be "User" without trailing spaces.
//UserSchema is a Mongoose schema object that defines the structure (fields and types) of documents in the collection.