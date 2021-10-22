import img1 from './heart-filled.png';
import img2 from './comment.png';
import './style.css';

const url = 'https://api.unsplash.com/search/photos/?query=wolves&client_id=hqIuLjE9dvD_RaTipe85QCnRnS5o2VT0SzHUY1ss5nQ';

const dispayItem = document.querySelector('.display-items');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-inner-img');
const modalHeader = document.querySelector('.modal-header');
const addCooment = document.querySelector('.form');
const comentCount = document.querySelector('.count');
const comentInner = document.querySelector('.coment-item');

const likes = [];
const commentsArray = [];

const updateLikes = async () => {
  const appID = 'gyC7pSTlqWve5KqylHam';
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((article) => {       
        likes.push(article.likes);
        displayLikes(data, article.item_id)
      });

    });
};

const displayLikes = (article,id) => {
  article.forEach((item) => {
    if (item.item_id === id ) {
      const heart = document.querySelector('#'+id);
      const likesCounter = heart.nextElementSibling;
      likesCounter.innerHTML = `${item.likes} Likes`;
    }
  });
}


const like = async (id) => {
  const appID = 'gyC7pSTlqWve5KqylHam';
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

const getLikeElements = (images) => {
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
  return data.results;
};

const displayDom = async () => {
  const displayData = await getImages();
  let disp = '';
  displayData.forEach((img, index) => {
    disp += `
    <div class="article-style">
      <h2 class="title">${img.alt_description ? img.alt_description : `Taro image${index}`}</h2>
      <img class="image-style" src="${img.urls.regular}"
        alt="image of artwork">
      <figure class="caption-container">
        <figcaption class="caption-content">
          <img class="like" id="${img.id}" src="${img1}" alt="like icon">&nbsp;
            <span class="like-count">
      0 Likes
            </span>
          <img class="comment" id="${img.id}" src="${img2}" alt="comment icon">&nbsp;<span class="comment-count">Comments</span>
        </figcaption>
      </figure>
    </div>`;
  });
  dispayItem.innerHTML = disp;
  getLikeElements(displayData);
};

const getComent = async (id) => {
  const index = id;
  const appID = 'gyC7pSTlqWve5KqylHam';
  const resp = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${index}`);
  const data = await resp.json();
  let modalDisp = '';
  if (!resp.status !== 200) {
    comentCount.innerHTML = 0;
    comentInner.innerHTML = '';
  }

  if (data.length > 0 && index === modalImage.id && resp.status === 200) {
    comentCount.innerHTML = data.length;
    data.forEach((item) => {
      modalDisp += `
      <div class="items">
         <span>${item.creation_date}</span>
           <span>${item.username}</span>:
         <span>${item.comment}</span>
       </div>
      `;
      comentInner.innerHTML = modalDisp;
    });
  }
};

const openModal = () => modal.classList.add('show-modal');

const checModal = async (e) => {
  const item = e.target;
  const displayData = await getImages();
  const parent = item.id;
  const findItem = displayData.find((a) => a.id === parent);
  if (item.classList.contains('comment')) {
    openModal();
    modalImage.src = findItem.urls.regular;
    modalHeader.innerHTML = findItem.alt_description;
    modalImage.setAttribute('id', parent);
    getComent(parent);
  }
};

const comments = async (id, username, comment) => {
  const appID = 'gyC7pSTlqWve5KqylHam';
  const userdata = {
    item_id: id,
    username,
    comment,
  };
  const body = JSON.stringify(userdata);

  const resp = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments/`, {
    method: 'POST',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },

  });
  if (resp.ok) {
    commentsArray.push({ id, Comment });
  }
  return resp;
};

addCooment.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.querySelector('.username');
  const text = document.querySelector('#text');
  const userName = username.value;
  const comment = text.value;
  const { id } = modalImage;
  if (userName !== '' && comment !== '') {
    await comments(id, userName, comment);
  }

  username.value = '';
  text.value = '';
  modal.classList.remove('show-modal');
});

dispayItem.addEventListener('click', checModal);
modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    modal.classList.remove('show-modal');
  }
});

window.onload = () => {
  displayDom();
  updateLikes();
};