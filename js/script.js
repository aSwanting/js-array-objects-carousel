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


const appBody = document.getElementById("app-body")

const carouselItem = {
    type: "div",
    className: "carousel-item",
    id: "carousel-item-" + 0,
    location: appBody,
  
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

images.forEach((img, i) => {
    carouselItem.init(img, i)
})







/////////////////////////////////// FUNCTIONS ///////////////////////////////////////


// Function to create and APPEND DOM element
function createDOMobjectAppend(object) {

    const DOMobject = document.createElement(object.type)
    object.location.append(DOMobject)
    DOMobject.className = object.className
    DOMobject.id = object.id
    DOMobject.innerHTML = object.inner
    return DOMobject

}