///////////////////////////////////////////// DATA /////////////////////////////////////////////

const images = [
    {
        image: 'img/01.webp',
        title: "Marvel's Spiderman Miles Morale",
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    },
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    },
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: 'Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.',
    },
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    },
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: "Marvel's Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.",
    },
]


///////////////////////////////////////////// CODE /////////////////////////////////////////////


// Generate Carousel Items
const carouselItem = {
    type: "div",
    className: "carousel-item",
    location: document.getElementById("app-body"),

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
    location: document.getElementById("app-toolbar"),

    init(img, i) {
        this.id = "thumbnail-" + (i)
        this.inner = `
        <img class="carousel-img" src="./${img.image}"></img>
        `
        const element = createDOMobjectAppend(this)
        return element
    },
}


// Generate Arrays
const carouselItems = []
const thumbnailItems = []

images.forEach((img, i) => {
    carouselItems.push(carouselItem.init(img, i))
    thumbnailItems.push(thumbnailImage.init(img, i))
})


let currentImage = 0
carouselItems[currentImage].classList.add("active")
thumbnailItems[currentImage].classList.add("active")


document.getElementById("nav-up").addEventListener("click", () => {
    changeImage("up")
})


document.getElementById("nav-down").addEventListener("click", () => {
    changeImage("down")
})


thumbnailItems.forEach((element, i) => {
    element.addEventListener("click", function () {
        carouselItems[currentImage].classList.remove("active")
        thumbnailItems[currentImage].classList.remove("active")
        currentImage = i
        carouselItems[currentImage].classList.add("active")
        thumbnailItems[currentImage].classList.add("active")
    })
});


/////////////////////////////////// FUNCTIONS ///////////////////////////////////////


// Change image based on arrow pressed
function changeImage(direction) {

    carouselItems[currentImage].classList.remove("active")
    thumbnailItems[currentImage].classList.remove("active")

    if (direction === "up") {
        if (currentImage > 0) {
            currentImage--
        } else {
            currentImage = carouselItems.length - 1
        }
    }

    if (direction === "down") {
        if (currentImage < carouselItems.length - 1) {
            currentImage++
        } else {
            currentImage = 0
        }
    }

    carouselItems[currentImage].classList.add("active")
    thumbnailItems[currentImage].classList.add("active")

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