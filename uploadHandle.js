
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require("fs")


async function uploadMultiImage(req, res) {

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

        for (let i = 0; i < req.files.length; i++) {

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
        return res.status(201).send({ status: true, data: resultArr })

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


        let resArr = []
        let breakk = true


        for (let i = 0; i < req.files.length && breakk; i++) {

            let filePath =  req.files[i].path

            await cloudinary.uploader.upload(filePath , {
                resource_type: "video",
                chunk_size: 6000000,
                eager: [
                    { width: 300, height: 300, crop: "pad", audio_codec: "none" },
                    { width: 160, height: 100, crop: "crop", gravity: "south" }],
                eager_async: true,
                eager_notification_url: "https://mysite.example.com/notify_endpoint"
            }, (err, ress) => {

                if(err) {
                    console.log(err)
                    breakk = false
                return res.status(404).send({status : false , message : `Get error in ${i+1}th file uploading`})
                }

                resArr.push(ress.url)

            })

        }

        console.log("Response given to frontend.")
        return res.status(201).send({ status: true, data: resArr })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }


}




module.exports = { uploadForSingleVideo, uploadMultiImage }