const config = require("./index.js")
const mongoose = require("mongoose")

const connection = async () => {
    const conn = await mongoose.connect(`mongodb://Jeffield:${config.password}@sox-shard-00-00.cotz4.mongodb.net:27017,sox-shard-00-01.cotz4.mongodb.net:27017,sox-shard-00-02.cotz4.mongodb.net:27017/softmovie?authSource=admin&replicaSet=atlas-plokrw-shard-0&readPreference=primaryPreferred&appname=MongoDB%20Compass&ssl=true`)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    console.log(`MongoDB Connected: ${conn.connection.name}`)
}
module.exports = {connection,mongoose}