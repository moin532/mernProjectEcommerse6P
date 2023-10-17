
const app  = require('./app');
const connectdatabase = require('./config/database');
const cloudinary = require("cloudinary")
var cors = require('cors')

 
app.use(cors())

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:'backend/config/config.env'});
}


//uncaught err
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shuuting down the server unhandles rejection`);

    server.close(()=>{
        process.exit(1);
    })

})


//connecting database
connectdatabase();
//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is runnin on http://localhost:${process.env.PORT}`);
})


//unhandles promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log(`shuuting down the server unhandles rejection`);

    server.close(()=>{
        process.exit(1);
    })
})