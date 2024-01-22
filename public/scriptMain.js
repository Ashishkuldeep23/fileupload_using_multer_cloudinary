

// // // Get localstrorage ---------->

// // For Images
let imgURL = localStorage.getItem("uploadedImgURL")
let vidURL = localStorage.getItem("uploadedVidURL")

if (imgURL) {
    // alert(imgURL)
    // console.log(imgURL)

    document.getElementById("show_all_uploads").style.visibility = "visible"
    document.getElementById("show_all_uploads").style.display = "inline"
}

// // For Videos

if (vidURL) {
    // alert(imgURL)
    // console.log(imgURL)

    document.getElementById("show_all_uploads").style.visibility = "visible"
    document.getElementById("show_all_uploads").style.display = "inline"
}




// // //( Show about handler) ------------------>


let click2 = 0
function showAbout() {

    if (click2 % 2 === 0) {
        document.getElementById("about_detail").style.display = "block"
    } else {
        document.getElementById("about_detail").style.display = "none"
    }

    click2++
}


function cancleAbout(){
    click2++
    document.getElementById("about_detail").style.display = "none"
}




// // // Below function for showing all uploads (show all previous upload handler) -------------->
let click = 0
function showAllUploads() {

    // console.log(click)

    let imgURLData
    if (imgURL) {
        imgURLData = JSON.parse(imgURL)
    }



    let vidURLData
    if (vidURL) {
        vidURLData = JSON.parse(vidURL)
    }

    let totalUploadsFound = (((imgURL) ? imgURLData.length : 0) + ((vidURL) ? vidURLData.length : 0))

    // console.log(totalUploadsFound)  // // // This is the total uploads found


    let divForRes = ` <div>All URLs stored in your browser's LocalStorage</div>  <div>${totalUploadsFound} files got.</div>`


    if (imgURL) {
        // // // for all images
        for (let i = 0; i < imgURLData.length; i++) {

            divForRes += ` <div> <p>${imgURLData[i]} </p> <img src="${imgURLData[i]}" />  </div> `

        }
    }



    if (vidURL) {
        // // // for all images
        for (let i = 0; i < vidURLData.length; i++) {

            divForRes += ` <div> <p>${vidURLData[i]} </p> <video controls><source src="${vidURLData[i]}" type="video/mp4"></video> </div> `

        }
    }


    document.getElementById("all_upload_res_div").innerHTML =  ` ${divForRes} <button class="cancel" onclick=${"cancleAllPreUploads()"}>X</button>`



    if (click % 2 === 0) {
        document.getElementById("all_upload_res_div").style.display = "flex"
    } else {
        document.getElementById("all_upload_res_div").style.display = "none"
    }


    click++
    // console.log(click)
}




function cancleAllPreUploads(){
    click++
    // console.log(click)
    document.getElementById("all_upload_res_div").style.display = "none"
}




// // // Below is function for post images (starts) ------->
document.querySelector('#input_image').addEventListener('change', event => {
    handleImageUpload(event)
})

async function handleImageUpload(event) {

    try {

        // console.log(event)


        const file = event.target.files

        // console.log( typeof file)
        // console.log(file)

        const formData = new FormData()

        for (let key in file) {
            // console.log(file[key])
            formData.append(`file`, file[key])
        }

        // formData.append('file', {...file})

        // console.log(formData)

        document.querySelector(".first").style.filter = "blur(10px)";
        document.querySelector("#spinner").style.visibility = "visible"




        let Option = {
            method: "POST",
            body: formData
        }


        let req = await fetch("/upload2", Option)
        let json = await req.json()

        // console.log(json)


        if (json.status === false) {
            alert(json.message)

            document.querySelector(".first").style.filter = "none";
            document.querySelector("#spinner").style.visibility = "hidden"

        }
        else {

            document.querySelector(".first").style.filter = "none";
            document.querySelector("#spinner").style.visibility = "hidden"


            const arrOfURL = json.data

            let divForRes = `<div>All ${arrOfURL.length} files uploaded successfully</div>`

            for (let i = 0; i < arrOfURL.length; i++) {

                divForRes += ` <div> <b>${i + 1}</b> <p>${arrOfURL[i]} </p> <img src="${arrOfURL[i]}" />  </div> `

            }

            document.getElementById("first_res").innerHTML = divForRes


            // // // Getting all previous data from localStorage --------->
            let getPreviousImg = localStorage.getItem("uploadedImgURL")

            if (getPreviousImg) {
                let actualData = JSON.parse(getPreviousImg)
                actualData.map((ele) => {
                    arrOfURL.push(ele)
                })
            }


            // // // Setting data into previous from loacalStorage
            localStorage.setItem("uploadedImgURL", JSON.stringify(arrOfURL))

        }

    } catch (err) {
        document.querySelector(".first").style.filter = "none";
        document.querySelector("#spinner").style.visibility = "hidden"
        console.log(err)
        return alert(err.message)
    }



}


// // // above function for post images (ends) ------->




// // // Below function for post videos (starts) --------------->

document.querySelector('#input_video').addEventListener('change', event => {
    handleVideoUpload(event)
})


async function handleVideoUpload(e) {
    try {


        const file = event.target.files

        const formData = new FormData()

        for (let key in file) {
            // console.log(file[key])
            formData.append(`file`, file[key])
        }

        document.querySelector(".second").style.filter = "blur(10px)";
        document.querySelector("#spinner").style.visibility = "visible"


        let Option = {
            method: "POST",
            body: formData
        }


        let req = await fetch("/upload3", Option)
        let json = await req.json()



        if (json.status === false) {
            alert(json.message)

            document.querySelector(".second").style.filter = "none";
            document.querySelector("#spinner").style.visibility = "hidden"
        }
        else {

            document.querySelector(".second").style.filter = "none";
            document.querySelector("#spinner").style.visibility = "hidden"


            const arrOfURL = json.data

            let divForRes = `<div>All ${arrOfURL.length} files uploaded successfully</div>`

            for (let i = 0; i < arrOfURL.length; i++) {

                divForRes += ` <div> <b>${i + 1}</b> <p>${arrOfURL[i]} </p> <video controls><source src="${arrOfURL[i]}" type="video/mp4"></video>  </div> `

            }

            document.getElementById("second_res").innerHTML = divForRes


            // // // Getting all previous data from localStorage --------->
            let getPreviousVid = localStorage.getItem("uploadedVidURL")

            if (getPreviousVid) {
                let actualData = JSON.parse(getPreviousVid)
                actualData.map((ele) => {
                    arrOfURL.push(ele)
                })
            }



            localStorage.setItem("uploadedVidURL", JSON.stringify(arrOfURL))

        }




    } catch (e) {
        document.querySelector(".second").style.filter = "none";
        document.querySelector("#spinner").style.visibility = "hidden"
        console.log(e)
        return alert(e.message)
    }
}


// // // Below function for post videos (ends) --------------->

