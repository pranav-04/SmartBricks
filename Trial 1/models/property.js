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
    Owner:{
        type:String,
        required: true
    },
    isBuilder:{
        type:Boolean,
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
    }
})

let Property = module.exports = mongoose.model('Property',propertySchema)