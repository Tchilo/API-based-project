import img1 from './heart-filled.png';
import img2 from './comment.png';
import './style.css';

const url = 'https://api.unsplash.com/photos?query=nature&client_id=hqIuLjE9dvD_RaTipe85QCnRnS5o2VT0SzHUY1ss5nQ'
// const display = document.querySelector('.display')
const dispayItem = document.querySelector('.display-items');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-inner-img');
const addCooment = document.querySelector('.form');

// const artContent = document.createElement('div')
const likes = [];
const commentsArray = []


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
  console.log('data', data);
  return data
  //  let images = data;
  // console.log('images', images);
  // images = images.map((image) => ({
  //   id: image.id,
  //   image_id: image.urls.regular,
  //   title: image.description,
  //   likes: image.likes
  // }))
  // let disp = ''
  //  images.forEach((img, index) =>{
  //    disp += `
  //   <div class="article-style">
  //     <h2 class="title">${img.description?img.description:`Taro image${index}`}</h2>
  //     <img class="image-style" src="${img.urls.regular}"
  //       alt="image of artwork">
  //     <figure class="caption-container">
  //       <figcaption class="caption-content">
  //         <img class="like" id="${img.id}" src="${img1}" alt="like icon">&nbsp;
  //           <span class="like-count">
  //           ${img.likes} Likes
  //           </span>
  //         <img class="comment" id="${index}" src="${img2}" alt="comment icon">&nbsp;<span class="comment-count">Comments</span>
  //       </figcaption>
  //     </figure>
  //   </div>`
  //  })
  //  dispayItem.innerHTML = disp;

  // getLikeElements();

};

const displayDom = async () => {
  const displayData = await getImages()
  let disp = ''
  displayData.forEach((img, index) => {
    disp += `
    <div class="article-style">
      <h2 class="title">${img.description ? img.description : `Taro image${index}`}</h2>
      <img class="image-style" src="${img.urls.regular}"
        alt="image of artwork">
      <figure class="caption-container">
        <figcaption class="caption-content">
          <img class="like" id="${img.id}" src="${img1}" alt="like icon">&nbsp;
            <span class="like-count">
            ${img.likes} Likes
            </span>
          <img class="comment" id="${img.id}" src="${img2}" alt="comment icon">&nbsp;<span class="comment-count"><span class='count'>0</span>Comments</span>
        </figcaption>
      </figure>
    </div>`
  })
  dispayItem.innerHTML = disp;
  getLikeElements();

}

const getComent = async (id) => {
 
  const index = id;
    console.log('index', id);
  const appID = 'EcrLn3r66HMsOKcAai7Q';
  const resp = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments?item_id=${index}`);
  const data = await resp.json()
  console.log(data, 'data');
  return data;
}


const openModal = () => {
  console.log('open');
  return modal.classList.add('show-modal')
}

const checModal = async (e) => {
  const item = e.target;
  const displayData = await getImages()
  const parent = item.id;
  console.log('id', parent);
  console.log('item', item);
  const findItem = displayData.find((a) => a.id === parent)
  if (item.classList.contains('comment')) {
    openModal()
    console.log('index', findItem);
    modalImage.src = findItem.urls.regular;
    modalImage.setAttribute('id', parent);
    getComent(parent)

  }
}

// const appID = 'yRI4TTSkL3fMzkZ4N0n0';

const comments = async (id, username, comment) => {
  const appID = 'EcrLn3r66HMsOKcAai7Q';
  const userdata = {
    item_id: id,
     username,
    comment
  }
  const body = JSON.stringify(userdata);
  console.log('body', body);
  console.log('log', userdata);

  const resp = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/comments/`, {
    method: 'POST',
    body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',


    },

  });
  console.log('resp', resp, resp.ok);
  if(resp.ok) {
    commentsArray.push({id, Comment})
  }
  return resp;
};


addCooment.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.querySelector('.username');
  const text = document.querySelector('#text');
  const userName = username.value;
  const comment = text.value;
  let id = modalImage.id;
  console.log(id, comment);
  if (userName !== '' && comment !== '') {
    console.log(userName, comment);
    await comments(id, userName, comment);

  }
  username.value = '';
  text.value = '';
  modal.classList.remove('show-modal')
});

console.log(commentsArray);
dispayItem.addEventListener('click', checModal)

window.onload = () => {
  displayDom();
  updateLikes();
};