import mongoose from 'mongoose'

const userschema =  mongoose.Schema({name: String, nationality: String})

const User = mongoose.model('User', userschema)

export {User}
