import newGalleryItems from "./gallery-items";

const galleryRef = document.querySelector('ul');

const createElementGallery = (element => {
    const galleryItemRef = document.createElement('li');
    galleryItemRef.classList.add('gallery__item');

    const galleryLinkRef = document.createElement('a');
    galleryLinkRef.classList.add('gallery__link');
    galleryLinkRef.setAttribute('href', element.original);

    const galleryImageRef = document.createElement('img');
    galleryImageRef.classList.add('gallery__image');
    galleryImageRef.setAttribute('src', element.preview);
    galleryImageRef.setAttribute('data-source', element.original);
    galleryImageRef.setAttribute('alt', element.description);


    galleryLinkRef.appendChild(galleryImageRef);
    galleryItemRef.appendChild(galleryLinkRef);

    return galleryItemRef;
})

const elements = newGalleryItems.map(createElementGallery)
galleryRef.append(...elements);



const openModal = document.querySelector('.gallery__item');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const backdropRef = document.querySelector('.js-lightbox');

openModal.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);
backdropRef.addEventListener('click', onBackdropClick);

function onOpenModal() {
    window.addEventListener('keydown', onPressEscape);
    document.body.classList.add('show-modal');
}

function onCloseModal() {
    window.removeEventListener('keydown', onPressEscape);
    document.body.classList.remove('show-modal');
}

function onBackdropClick() {
    if (event.target === event.currentTarget) {
        onCloseModal();
    }
}

function onPressEscape(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}