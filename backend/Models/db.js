// OUp4fARu9tXxUrJ7
// practice-by-hamza

const mongoose =  require('mongoose')
const URL = process.env.MONGODB_URL
mongoose.connect(URL).then(()=>{console.log("MongoDb connected Successfully!")}).catch(()=>{console.log("MongoDb connection Failed!")})