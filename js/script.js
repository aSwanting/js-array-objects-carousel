/////////////////////////////////// FUNCTIONS ///////////////////////////////////////


function initializeCarousel(carouselBody, carouselToolbar) {

    // Generate Carousel Items
    const carouselItem = {
        type: "div",
        className: "carousel-item",
        location: document.getElementById(carouselBody),

        init(img, i) {
            this.id = "carousel-item-" + (i)
            this.inner = `
            <img class="carousel-img" src="./${img.image}"></img>
            <div class="carousel-text">
            <h3 class="carousel-title">${img.title}</h3>
            <p class="carousel-description">${img.text}</p>
            </div>
            `
            const element = createDOMobjectAppend(this)
            return element
        },
    }

    // Generate Thumbnail Items
    const thumbnailImage = {
        type: "div",
        className: "toolbar-thumbnail",
        location: document.getElementById(carouselToolbar),

        init(img, i) {
            this.id = "thumbnail-" + (i)
            this.inner = `<img class="carousel-img" src="./${img.image}"></img>`
            const element = createDOMobjectAppend(this)
            return element
        },
    }

    // Generate Carousel Controls
    const carouselControls = {
        type: "div",
        className: "nav-button",
        location: document.getElementById(carouselToolbar),

        init(direction) {
            this.id = `nav-${direction}`
            this.inner = `<i class="fa-solid fa-caret-${direction}"></i>`
            const element = createDOMobjectAppend(this)
            return element
        },
    }

    carouselControls.init("up")
    carouselControls.init("down")


    // Generate Carousel Controls
    const autoPlayControls = {
        type: "div",
        className: "autoplay-controls",
        location: document.getElementById(carouselToolbar),

        init() {
            this.inner = `
            <div class="autoplay-backward" id="autoplay-backward"><i class="fa-solid fa-backward"></i></div>
            <div class="autoplay-stop" id="autoplay-stop"><i class="fa-solid fa-stop"></i></div>
            <div class="autoplay-forward" id="autoplay-forward"><i class="fa-solid fa-forward"></i></div>
            `
            const element = createDOMobjectAppend(this)
            return element
        },
    }

    autoPlayControls.init()


    // Generate Arrays
    const carouselItems = []
    const thumbnailItems = []
    images.forEach((img, i) => {
        carouselItems.push(carouselItem.init(img, i))
        thumbnailItems.push(thumbnailImage.init(img, i))

        if (!i) {
            carouselItems[i].classList.add("active")
            thumbnailItems[i].classList.add("active")
        }
    })

    // Set active image to 0
    let currentImage = 0

    // Initialize Carousel Object
    const carousel = { carouselItems, thumbnailItems, currentImage }

    //Carousel Nagivation
    document.getElementById("nav-up").addEventListener("click", () => changeImage("up", carousel))
    document.getElementById("nav-down").addEventListener("click", () => changeImage("down", carousel))
    carousel.thumbnailItems.forEach((element, i) => {
        element.addEventListener("click", () => {
            changeImage("thumb", carousel, i)
        })
    })

    let intervalID = null
    document.getElementById("autoplay-backward").addEventListener("click", () => intervalID = autoPlay("up", intervalID, carousel))
    document.getElementById("autoplay-forward").addEventListener("click", () => intervalID = autoPlay("down", intervalID, carousel))
    document.getElementById("autoplay-stop").addEventListener("click", () => intervalID = autoPlay("stop", intervalID, carousel))
}


// Change image based on element clicked
function changeImage(clicked, object, index) {

    object.carouselItems[object.currentImage].classList.remove("active")
    object.thumbnailItems[object.currentImage].classList.remove("active")

    if (clicked === "up") {
        if (object.currentImage > 0) {
            object.currentImage--
        } else {
            object.currentImage = object.carouselItems.length - 1
        }
    }

    if (clicked === "down") {
        if (object.currentImage < object.carouselItems.length - 1) {
            object.currentImage++
        } else {
            object.currentImage = 0
        }
    }

    if (clicked === "thumb") {
        object.currentImage = index
    }

    object.carouselItems[object.currentImage].classList.add("active")
    object.thumbnailItems[object.currentImage].classList.add("active")

}


function autoPlay(clicked, intervalID, object) {

    clearInterval(intervalID);

    if (clicked !== "stop") {

        intervalID = setInterval(() => {
            changeImage(clicked, object)
        }, 3 * 1000);

    }

    return intervalID
}

// Function to create and APPEND DOM element
function createDOMobjectAppend(object) {

    const DOMobject = document.createElement(object.type)
    object.location.append(DOMobject)
    DOMobject.className = object.className
    DOMobject.id = object.id
    DOMobject.innerHTML = object.inner
    return DOMobject

}


///////////////////////////////////////////// CODE /////////////////////////////////////////////



document.addEventListener("DOMContentLoaded", () => {

    initializeCarousel("app-body", "app-toolbar")

})



