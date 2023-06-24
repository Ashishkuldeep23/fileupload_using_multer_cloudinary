
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "dlvq8n2ca",
    api_key: "867966181995229",
    api_secret: "mDLwbTVA1oMMOVn6_rO5M2CevT0",
});

const fs = require("fs")


async function uploadMultiImage(req , res){

    try {
        const file = req.files;

        // console.log(file)

        // // Problem get in multer.js line 11 [cb(null, Date.now() + "-" + file.originalname)] this should written -->

        if (!file) {
            return res.send("err file not getting.. :-" + file)
        }
        // res.send('File uploaded successfully');

        let resultArr = []

        // // // Below for loop for upload pictures --------->

        for(let i=0 ; i<req.files.length ; i++){

            let filePathIs = req.files[i].path
            let result = await cloudinary.uploader.upload(filePathIs)

            // console.log(result)


            // try {
            //     // // // Below code is used for delete file after uploading successfully -------->
            //     fs.unlinkSync(process.cwd()  +'\\uploads\\'+ result.original_filename + "." + result.format);
            //     console.log("Delete File successfully.");
            // } catch (error) {
            //     console.log(error);
            // }

            resultArr.push(result.url)

        }

        console.log("Response given to frontend.")
        return res.status(200).send({status : true , data : resultArr})

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }


}



async function uploadForSingleVideo(req, res) {

    try {
        const file = req.files;

        // console.log(file)

        // // Problem get in multer.js line 11 [cb(null, Date.now() + "-" + file.originalname)] this should written -->

        if (!file) {
            return res.send("err file not getting.. :-" + file)
        }
        // res.send('File uploaded successfully');



        await cloudinary.uploader.upload(file[0].path, {
            resource_type: "video",
            chunk_size: 6000000,
            eager: [
                { width: 300, height: 300, crop: "pad", audio_codec: "none" },
                { width: 160, height: 100, crop: "crop", gravity: "south"}],
            eager_async: true,
            eager_notification_url: "https://mysite.example.com/notify_endpoint"
        }, (err, ress) => {

            if (err) {
                console.log(err)
                return res.send(`err :- ${err}`)
            }

            return res.send(ress)


        })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }


}




module.exports = { uploadForSingleVideo , uploadMultiImage}