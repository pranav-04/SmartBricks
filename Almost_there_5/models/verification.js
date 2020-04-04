let mongoose = require('mongoose')

let verificationSchema = mongoose.Schema({
    Name:{
        type:String,
        require: true
    },
    Owner:{
        type:String,
        required: true
    },
    ownerid:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required: true
    },
    address2:{
        type:String,
        required: true
    },
    pincode:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required : true
    },
    state:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required : true
    },
    time:{
        type: Number,required: true
    },
    mobileno:{
        type: String,required: true
    },
    email:{
        type: String,required: true
    },
    propertyid:{
        type:String,required: true
    }
})

let Verification = module.exports = mongoose.model('Verification',verificationSchema)