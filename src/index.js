import img1 from './heart-filled.png';
import img2 from './comment.png';

const url = 'https://api.unsplash.com/photos?query=nature&client_id=hqIuLjE9dvD_RaTipe85QCnRnS5o2VT0SzHUY1ss5nQ'
const display = document.querySelector('.display')
const artContent = document.createElement('div')
const likes = []


const updateLikes = async () => {
  const appID = 'EcrLn3r66HMsOKcAai7Q';
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((article) => {
        likes.push(article.likes);
      });
    });
};

const like = async (id) => {
  const appID = 'EcrLn3r66HMsOKcAai7Q';
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes/`, {
    method: 'Post',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  }).then(() => {
    updateLikes();
  });
};



const getLikeElements = () => {
  const hearts = document.querySelectorAll('.like');
  const likeCounter = document.querySelectorAll('.like-count');
  hearts.forEach((heart, index) => {
    let counter = 0;
    heart.addEventListener('click', (e) => {
      e.preventDefault();
      like(images[index].id);
      counter += 1;
      likeCounter[index].innerHTML = `${likes[index] + counter} Likes`;
    });
  });
};



const getImages = async () => {
  const response = await fetch(url);
  const data = await response.json();
  let images = data;
  images = images.map((image) => ({
    id: image.id,
    image_id: image.urls.regular,
    title: image.description,
    likes: image.likes
  }))
  const imageString = images.map((img, index) => `
    <div class="article-style">
      <h2 class="title">${img.title?img.title:`Taro image${index}`}</h2>
      <img class="image-style" src="${img.image_id}"
        alt="image of artwork">
      <figure class="caption-container">
        <figcaption class="caption-content">
          <img class="like" id="${img.id}" src="${img1}" alt="like icon">&nbsp;
            <span class="like-count">
            ${img.likes} Likes
            </span>
          <img class="comment" id="${img.id}" src="${img2}" alt="comment icon">&nbsp;<span class="comment-count">Comments</span>
        </figcaption>
      </figure>
    </div>`).join('');
  artContent.innerHTML = imageString;
  display.appendChild(artContent);

  getLikeElements();
};


window.onload = () => {
  getImages();
  updateLikes();
};