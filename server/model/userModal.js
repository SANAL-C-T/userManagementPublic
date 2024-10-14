const mongoose =require("mongoose");

require("../model/config");

const userSchema=mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
   
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Deleted: {
        type: Boolean,
        default:false
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    Profile: {
        type: String,
    },
    

});

const userData = mongoose.model("user", userSchema);

module.exports = userData;