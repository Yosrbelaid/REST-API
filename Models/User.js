const mongoose=require('mongoose')

const userSchema = new mongoose.Schema ({
    Name: {
        type:String,
        required: true
    }
})

const user=mongoose.model('User', userSchema)
module.exports = user 