let mongoose = require('mongoose')

let propertySchema = mongoose.Schema({
    Name:{
        type:String,
        require: true
    },
    Description:{
        type:String,
        required: true
    },
    isBuilder:{
        type:String,
        required: true
    },
    Location:{
        type:String,
        required: true
    },
    Sqfoot:{
        type: Number,
        required: true
    },
    BHK:{
        type: Number,
        required : true
    },
    ownerid:{
        type: String,
        required: true
    },
    zipcode:{
        type: String,
        required : true
    },
    Gym:{
        type: Boolean,required: true
    },
    Lawn_Free_Space:{
        type: Boolean,required: true
    },
    Security:{
        type: Boolean,required: true
    },
    CCTV:{
        type: Boolean,required: true
    },
    School_within_5:{
        type: Boolean,required: true
    },
    Hospital_within_5:{
        type: Boolean,required: true
    },
    Railway_within_5:{
        type: Boolean,required: true
    },
    Airport_within_5:{
        type: Boolean,required: true
    },
    water:{
        type: Boolean,required: true
    },
    electricity:{
        type: Boolean,required: true
    },
    Lift:{
        type: Boolean,required: true
    },
    Club_House:{
        type: Boolean,required: true
    },
    Price:{
        type: Number,required:true
    }
})

let Property = module.exports = mongoose.model('Property',propertySchema)