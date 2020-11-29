import newGalleryItems from "./gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');
const divLightbox = document.querySelector('.js-lightbox');
const divOverlay = document.querySelector(".lightbox__overlay");
const imgModal = document.querySelector(".lightbox__image");
const buttonClose = document.querySelector(".lightbox__button");


const createGallery = (item, i) => {
    const galleryItemRef = document.createElement('li');
    galleryItemRef.classList.add('gallery__item');

    const galleryLinkRef = document.createElement('a');
    galleryLinkRef.classList.add('gallery__link');
    galleryLinkRef.setAttribute('href', item.original);

    const galleryImageRef = document.createElement('img');
    galleryImageRef.classList.add('gallery__image');
    galleryImageRef.setAttribute('src', item.preview);
    galleryImageRef.setAttribute('data-source', item.original);
    galleryImageRef.setAttribute('alt', item.description);
    galleryImageRef.setAttribute('data-index', i);


    galleryLinkRef.appendChild(galleryImageRef);
    galleryItemRef.appendChild(galleryLinkRef);

    return galleryItemRef;
}

const items = newGalleryItems.map(createGallery);
galleryRef.append(...items);



galleryRef.addEventListener("click", (e) => {
    if (e.target.nodeName !== "IMG") {
        return;
    }
    e.preventDefault();
    window.addEventListener('keydown', onPressEscape);
    let modalLink = e.target.dataset.source;
    divLightbox.classList.add("is-open");
    imgModal.src = modalLink;
    imgModal.dataset.i = e.target.dataset.i
});

buttonClose.addEventListener("click", closeLightBox);
divOverlay.addEventListener("click", closeLightBox);

function closeLightBox() {  
    window.removeEventListener('keydown', onPressEscape);
    divLightbox.classList.remove("is-open");
    imgModal.src = "";
}

function onPressEscape(e) {
    if (e.code === 'Escape') {
        onCloseModal();
    }
    if (e.code === "ArrowLeft") {
        pressLeft();
    }
    if (escape.code === "ArrowRight") {
        pressRight();
    }
}



function setModalImageAttribute(step, index) {
    imgModal.src = newGalleryItems[index + step].original;
    imgModal.alt = newGalleryItems[index + step].description;
    imgModal.dataset.index = `${index + step}`
};

function pressLeft() {
    let index = +imgModal.dataset.index;
    if (index ===0) return;
    setModalImageAttribute(-1, index);  
}

function pressRight() {
    let index = +imgModal.dataset.index;
    if (index === newGalleryItems.length - 1) return;
    setModalImageAttribute(1, index);    
}


