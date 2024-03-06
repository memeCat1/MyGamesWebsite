

//Get all diashow elements
const allDiashows = document.getElementsByClassName("diashow");

//start diashow
for (let diashow of allDiashows) {
    animateDiashow(diashow);
}


function animateDiashow(diaElmt) {
    //get all images
    const diaImages = diaElmt.getElementsByTagName("img");

    //set counter
    let counter = 0;
    let oldCounter = 0;

    //show first image
    // diaImages[0].style.opacity = 1;
    diaImages[0].style.transform = "translateX(0px)";
    diaImages[0].style.zIndex = 1;

    //Set new image every 2 seconds
    setInterval(function () {

        oldCounter = counter;

        //set last image opacity to 0
        // diaImages[counter].style.opacity = 0;
        diaImages[oldCounter].style.transition = "1s";
        diaImages[oldCounter].style.transform = "translateX(-100%)";
        diaImages[oldCounter].style.zIndex = 0;

        setTimeout(resetImage, 1000);

        function resetImage() {
            diaImages[oldCounter].style.transition = "none !important";
            diaImages[oldCounter].style.transform = "translateX(100%)";
            diaImages[oldCounter].style.zIndex = -1;
        }

        //increase counter by 1 to show next image
        counter++;



        //if counter reached length of images set it to 0 again
        if (counter === diaImages.length) {
            counter = 0;
        }

        //show next image
        // diaImages[counter].style.opacity = 1;
        diaImages[counter].style.transition = "1s";
        diaImages[counter].style.transform = "translateX(0px)";
        diaImages[counter].style.zIndex = 1;


    }, 2000);

    // let buttons = diaElmt.getElementsByTagName("button");
    // let buttonLeft = buttons[0];
    // let buttonRight = buttons[1];

    // buttonLeft.onclick = previousImage;
    // buttonRight.onclick = nextImage;


    // function nextImage() {
    //     diaImages[counter].style.opacity = 0;
    //     counter = counter + 1;
    //     setImage();
    // }

    // function previousImage() {
    //     diaImages[counter].style.opacity = 0;
    //     counter = counter - 1;
    //     setImage();
    // }

    // function setImage() {

    //     if (counter === diaImages.length) {
    //         counter = 0;
    //     } else if(counter === -1) {
    //         counter = diaImages.length - 1;
    //     }
    //     console.log(counter)
    //     diaImages[counter].style.opacity = 1;
    // }



}
