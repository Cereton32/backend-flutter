const express = require("express")
const cors = require("cors")
const path = require('path');
const { log } = require("console");
const fs = require('fs')

const app = express();
app.use(cors());

app.use('/photos',express.static(path.join(__dirname,"photos")));

app.get('/photos',(req,res)=>{

const dirpath = path.join(__dirname,"photos")
fs.readdir(dirpath,(files,err)=>{
    if(err) return res.status(500).json({error:"Error sending root directory"})

        const urls = files.map((file)=>{
            {url:`/photos/${file}`}
        });

        res.json(urls);
})

})


const port = 5002;
app.listen(port,()=>{
    console.log("Server is running");
    
})

