import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
    },
    image :{
        type : String,
        required : true,
    },
    content :{
        type : String,
        required: true,
    },
    topic :{
        type : String,
        required : true,
    },
    createdAt :{
        type :Date ,
        default : Date.now
    },
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true
        },
         name : {
            type : String,
            required: true
         },
    }

 })

 export default mongoose.model("Blog", BlogSchema) // This line defines and exports a Mongoose model named "Blog" based on the BlogSchema. This model represents a MongoDB collection and provides an interface for interacting with that collection using the defined schema structure.