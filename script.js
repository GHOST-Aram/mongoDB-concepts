import mongoose from "mongoose";
import { User } from "./User.js";


const connect = async(uri) =>{
     await mongoose.connect(uri)
    console.log('Connected')

}
const save = async(doc) =>{
    await doc.save()
    // console.log(doc, 'saved!')
}

const create = async(model, docObject) =>{
    const newDoc =    await model.create(docObject)
    // console.log(newDoc, 'created')
    return newDoc
}

connect('mongodb://localhost/testdb')
const player = new User({name: 'Jane', nationality: 'Kenyan'})
// save(player)
const newUser = create(User, {name: 'Jane', nationality: 'South African'})
// console.log(newUser.then(result => {console.log(result); save(result)}))

create(User, {
    name:'john',
    nationality: 'American',
    age: 42,
    email: 'KINGDAO@gmail.com',
    hobbies: ['Running', 'Reading', 'watching'],
    bestFriend: "64b8c6f191666e143f78fd95",
    address: {
        street: '234 North Street',
        city: 'New York'
    }

}).then(doc =>{
    // console.log(doc)
    save(doc)
    console.log(doc.sayHi())
}).catch((error) => console.error(error))

User.findById("64b8b509d38ceb670e4f5e86").then(
    user => console.log('Found user: ')
)

// User.find().then(users => console.log(users))

User.findOne({ name: 'JOHN'}).then(p => {
    // p.populate('bestFriend')
    // console.log('populated', p)
})
User.where('name')
    .equals('JOHN')
    .limit(2).select('name')
    .select('nationality')
    .populate('bestFriend')
    
    .then(users =>{
        
        console.log(users)
    })
// User.deleteMany({ name: 'JOHN'}).then(
//     result =>{
//         // User.count({name: 'JOHN'}).then(count => console.log(count))
//     }
    
// )

User.findByName('John').limit(2).then(john => console.log(john))

User.find().byName('jane').limit(3).then(janes => console.log(janes))

User.findOne({name: 'JOHN'}).then(user => {
    console.log(user)
    console.log(user.named_email)
})