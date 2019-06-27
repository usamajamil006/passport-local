const mongoose = require('mongoose')
const bcrypt =  require('bcrypt-nodejs')

const schema = mongoose.Schema

const userSchema =  new schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


userSchema.methods.hashPassword = password =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = (password , hash) =>{
    return bcrypt.compareSync(password,hash)
}
module.exports = mongoose.model('users',userSchema)