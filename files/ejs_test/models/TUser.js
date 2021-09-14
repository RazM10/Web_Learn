const mongoose=require('mongoose');


const UserSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: 'Ctg'
    }
},{timestamps: true}).plugin(require('mongoose-autopopulate'));

module.exports=mongoose.model('Users',UserSchema);