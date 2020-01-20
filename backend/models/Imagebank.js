const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  ImageSchema which consists imagedata
const ImagebankSchema = new Schema({
  
  img:{
    type:String,
    required:true,
    
    },
    
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// Exporting data
module.exports = mongoose.model("Imagebank", ImagebankSchema);