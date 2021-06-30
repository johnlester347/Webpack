import Kaori from './kaori.jpg';

function addImage() {
    const img = document.createElement('img');
    img.alt = 'Kaori';
    img.width = 300;
    img.src = Kaori;
    const body = document.querySelector('body');
    body.appendChild(img);
}

export default addImage;
