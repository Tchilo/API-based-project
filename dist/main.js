/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const url = 'https://api.unsplash.com/photos?query=nature&client_id=hqIuLjE9dvD_RaTipe85QCnRnS5o2VT0SzHUY1ss5nQ'\nconst display = document.querySelector('.display')\nconst artContent = document.createElement('div')\nconst likes = []\n\n\nconst updateLikes = async () => {\n  const appID = 'EcrLn3r66HMsOKcAai7Q';\n  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes`)\n    .then((response) => response.json())\n    .then((data) => {\n      data.forEach((article) => {\n        likes.push(article.likes);\n      });\n    });\n};\n\nconst like = async (id) => {\n  const appID = 'EcrLn3r66HMsOKcAai7Q';\n  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appID}/likes/`, {\n    method: 'Post',\n    headers: {\n      'content-type': 'application/json; charset=UTF-8',\n    },\n    body: JSON.stringify({\n      item_id: id,\n    }),\n  }).then(() => {\n    updateLikes();\n  });\n};\n\n\n\nconst getLikeElements = () => {\n  const hearts = document.querySelectorAll('.like');\n  const likeCounter = document.querySelectorAll('.like-count');\n  hearts.forEach((heart, index) => {\n    let counter = 0;\n    heart.addEventListener('click', (e) => {\n      e.preventDefault();\n      like(images[index].id);\n      counter += 1;\n      likeCounter[index].innerHTML = `${likes[index] + counter} Likes`;\n    });\n  });\n};\n\n\n\nconst getImages = async () => {\n  const response = await fetch(url);\n  const data = await response.json();\n  images = data;\n\n  images = images.map((image) => ({\n    id: image.id,\n    image_id: image.urls.regular,\n    title: image.description,\n    likes: image.likes\n  }))\n  const imageString = images.map((img, index) => `\n    <div class=\"article-style\">\n      <h2 class=\"title\">${img.title?img.title:`Taro image${index}`}</h2>\n      <img class=\"image-style\" src=\"${img.image_id}\"\n        alt=\"image of artwork\">\n      <figure class=\"caption-container\">\n        <figcaption class=\"caption-content\">\n          <img class=\"like\" id=\"${img.id}\" src=\"./like.png\" alt=\"like icon\">&nbsp;\n            <span class=\"like-count\">\n            ${img.likes} Likes\n            </span>\n          <img class=\"comment\" id=\"${img.id}\" src=\"./comment.png\" alt=\"comment icon\">&nbsp;<span class=\"comment-count\">Comments</span>\n        </figcaption>\n      </figure>\n    </div>`).join('');\n  artContent.innerHTML = imageString;\n  display.appendChild(artContent);\n\n  getLikeElements();\n};\n\n\nwindow.onload = () => {\n  getImages();\n  updateLikes();\n};\n\n//# sourceURL=webpack://my-template/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;