const express = require('express');

require('dotenv').config()

const app = express();

const upload = require("./multer.js")

const {uploadForSingleVideo , uploadMultiImage} = require("./uploadHandle.js")

// // making home file




// // // Below two lines used in showing home page --->
app.use(express.static(process.cwd() + "/public"))

app.get("/" , (req , res)=>{
    // res.status(200).send("Hello World")

    console.log(process.env.CLOUDINARY_CLOUD_NAME)

    res.sendFile("/index.html")
})


// Define a route to handle file uploads

// // // single image upload -------->
// app.post('/upload2', upload.single('file'), uploadForSingle);

// // // multiple image upload --------------->
app.post('/upload2', upload.array("file"), uploadMultiImage );

// // // Single video upload -------->

app.post('/upload3', upload.array("file"), uploadForSingleVideo );


const port = 3000 || process.env.PORT
app.listen(port, () => console.log('Server is started at port number ' + port));
