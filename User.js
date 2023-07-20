import mongoose from 'mongoose'

const userschema =  mongoose.Schema({
    name: {
        type: String,
    uppercase: true,
    }, 
    nationality: String, 
    age: {
        type: Number,
        min: 10, 
        max: 67,
        validate:{
            validator: v => v % 2 === 0,
            message: props => `${props.value} is not an even number`
        }
    },
    email: {
        type: String,
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
})

userschema.methods.sayHi = function(){
    return `Hi ${this.name}`
}

userschema.statics.findByName = function(name){
    return this.where({name: new RegExp(name, 'i')})
}

userschema.query.byName = function(name){
    return this.where({name: new RegExp(name, 'i')})
}

userschema.virtual('named_email').get(function(){
    return `${this.name}: ${this.email}`
})

userschema.pre('save', function(next){
    this.updatedAt = Date.now()
    next()
})

userschema.post('save', function(doc, next) {
    doc.sayHi()
    console.log('DOC SAYS hI')
    next
})
const User = mongoose.model('User', userschema)

export {User}
