const mongoose = require('mongoose')

const userPreferenceSchema = new mongoose.Schema({
    userPrefId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'user required to add preferences']
    },
    category:{
        type:String,
        enum:['hotel','travel','restaurant','attraction'],
        required:[true,'category is required to fetch']
    },
    location:{
        type:[String],
        required:[true,'atleast one item should be selected'],
    },from:{
        type:[String],
        required:[true,'input from'],
    },to:{
        type:[String],
        required:[true,'input to'],
    },createdAt: {
        type: Date,
        default: Date.now, 
        index: { expires: '7d' } 
    }
}, { timestamps:true});


module.exports  = mongoose.model('userPreference',userPreferenceSchema)