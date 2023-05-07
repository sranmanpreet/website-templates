// JavaScript code for the image carousel
let slideIndex = 0;
const slides = document.getElementsByClassName('carousel-item');
const dots = document.getElementsByClassName('carousel-dot');

function showSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(-${slideIndex * 100}%)`;
    }
}

function slide(e) {
    const ele = e.target;
    const parentElement = document.getElementById('carousel-dots');

    const nodeList = Array.from(parentElement.children);
    const nodeNumber = nodeList.findIndex(function (node) {
        return node === ele;
    });
    while(slideIndex!=nodeNumber){
        slideIndex>nodeNumber ? prevSlide() : nextSlide();
    }
}

function prevSlide() {
    if (slideIndex > 0) {
        slideIndex--;
    }
    showSlide();
}

function nextSlide() {
    if (slideIndex < slides.length - 1) {
        slideIndex++;
    }
    showSlide();
}
