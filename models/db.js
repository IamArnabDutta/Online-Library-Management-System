const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/registration",{
    useNewUrlParser:true
}).then(()=>{
    console.log(`connect successful`);
}).catch(()=>{
    console.log(`no connection`);
})
