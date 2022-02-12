const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/restApi")
.then(()=>{
    console.log("db is successfull")
}).catch((err)=>{
    console.log("db is not successful",err)
})

