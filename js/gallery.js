const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

//getting a link to unordered list, which will contain gallery
const galleryList = document.querySelector('ul.gallery');

//function createMarkup(images) receives an array of objects - images
//and creates markup inside the galleryList
function createMarkup(images) {
  //creating markup
  const markup = images.reduce((acc, { preview, original, description }) => {
    return (
      acc +
      `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
      `
    );
  }, '');

  //pushing markup into galleryList
  galleryList.insertAdjacentHTML('afterbegin', markup);
}

//creating markup of gallery
createMarkup(images);

//addEventListener - reaction on click on elements of gallery
galleryList.addEventListener('click', event => {
  //we do not want to download images by default, so using preventDefault
  event.preventDefault();

  //checking if we clicked exactly on the image, if false - return
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  //getting source of original image
  const selectedImgSrc = event.target.dataset.source;
  //getting alt attribute of the image
  const selectedImgAlt = event.target.alt;

  //creating modal window with image using basicLightbox
  const instance = basicLightbox.create(
    `
      <img src="${selectedImgSrc}" alt="${selectedImgAlt}">
  `,
    //An object of options
    {
      //onShow executes every time the lightbox opens
      onShow: instance => {
        //adding EventListener to check Escape pressed
        document.addEventListener('keydown', onEscKeyPress);
      },
      onClose: instance => {
        //removing EventListener if lightbox is being closed
        document.removeEventListener('keydown', onEscKeyPress);
      },
    },
  );

  //checking if Escape is pressed
  function onEscKeyPress(e) {
    if (e.key === 'Escape') {
      //if true, we're closing the instance
      instance.close();
      //and removing EventListener
      document.removeEventListener('keydown', onEscKeyPress);
    }
  }

  //we're opening the modal windwow with image
  instance.show();
});
