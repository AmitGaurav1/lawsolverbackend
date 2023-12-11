const express=require('express')
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const cors=require('cors');
const app=express();
const lawmodel=require('./Schema.js');

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://amitgaurav130:alIhgDE4DOZavTJ1@cluster0.ez0nrzh.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});


app.post('/signin',async (req,resp)=>{
    const {email,password}=req.body;
    const user=await lawmodel.findOne({email})
    try{
    if(user)
    {
        resp.send({message:"This user already exist."});
    }
    const passwordhashing=await bcrypt.hash(password,10);
    const lawdata=new lawmodel({email,password:passwordhashing});
    lawdata.save();
    resp.send({message:"Account is created Successfully."});
}
catch(err)
{
    resp.status(500).send({message:"Server Internal error"});
}
})
app.post('/login',async (req,resp)=>{
// const {}
const {email,password}=req.body;
const user=await lawmodel.findOne({email});
try{
if(user)
{
    const passwordmatch=bcrypt.compare(password,user.password);
    if(passwordmatch)
    {
        resp.send({message:'Login in sucessfully'})
    }
    else{
        resp.send({message:'Password did not match.'});
    }
}
}
catch(err)
{
    resp.status(500).send({message:"Server Internal error."});
}
})
app.listen(3002,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Your port is running on 3002")
    }
})