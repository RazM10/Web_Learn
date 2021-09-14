const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    uid:{
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    }
},{ timestamps: true }).plugin(require('mongoose-autopopulate'));

module.exports=mongoose.model('Todo',UserSchema);