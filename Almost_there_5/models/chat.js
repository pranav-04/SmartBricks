let mongoose = require('mongoose');

//Chat schema
let chatSchema = mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

let Chat = module.exports = mongoose.model('Chat', chatSchema);