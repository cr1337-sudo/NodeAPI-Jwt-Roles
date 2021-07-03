const mongoose = require("mongoose")


mongoose.connect('mongodb://localhost:27017/api-tokens', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
   .then(db => console.log("Db is connected"))
   .catch(e => console.log(e))