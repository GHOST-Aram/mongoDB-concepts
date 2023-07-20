import { User } from "./User.js";

const player = new User({ name: 'James', nationality: 'American'})

const save = async(collection) =>{
    await player.save()
    console.log(player)
}

save(player)
