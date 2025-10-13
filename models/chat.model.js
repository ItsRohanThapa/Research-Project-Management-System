const mongoose = require('mongoose');
//Chat Model
const chatSchema = new mongoose.Schema(
    {
        userID: {
             type: String, 
             required: false 
        },
        username: { 
            type: String, 
            required: false 
        },
        message: { 
            type: String, 
            required: false 
        },
        timeStamp: { 
            type: String, 
            required: false, 
            default: null 
        },
        groupId: { 
            type: String, 
            required: false, 
            default: null 
        },
        createdAt: { 
            type: Date, 
            required: false
         },
        updatedAt: { 
            type: Date, 
            required: false 
        },
        client_id: { 
            type: Number, 
            required: true,
             default: 1 
        },
});

const chat = new mongoose.model("Chat", chatSchema);

module.exports = chat;
