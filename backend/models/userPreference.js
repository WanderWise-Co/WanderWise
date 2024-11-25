const mongoose = require('mongoose')

const userPreference = new mongoose.Schema({
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
    }
})

module.exports  = mongoose.model('userPreference',userPreference)