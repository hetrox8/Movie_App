/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkjavascript_Capstone"] = self["webpackChunkjavascript_Capstone"] || []).push([["index"],{

/***/ "./src/scripts.js":
/*!************************!*\
  !*** ./src/scripts.js ***!
  \************************/
/***/ (() => {

eval("const template = [\r\n    { title: \"movie 1\", rating: 4.7 },\r\n    { title: \"movie 2\", rating: 4.0 },\r\n    { title: \"movie 3\", rating: 5.0 }\r\n  ];\r\n  \r\n  const display = () => {\r\n    const dataList = document.getElementsByClassName('list-1');\r\n    dataList.innerHtml = \"\";\r\n  \r\n    template.forEach((item) => {\r\n      const list_item = document.createElement('li');\r\n      list_item.textContent = `title: ${item.title}, rating: ${item.rating}`;\r\n  \r\n      dataList.appendChild(list_item);\r\n    });\r\n  };\r\n  \r\n  const fetchAndDisplayShows = async () => {\r\n    try {\r\n      const response = await fetch(\"https://api.tvmaze.com/shows\");\r\n      const data = await response.json();\r\n      displayShows(data);\r\n    } catch (error) {\r\n      console.log('Error fetching data:', error);\r\n    }\r\n  };\r\n  \r\n  const displayShows = (shows) => {\r\n    const showListElement = document.getElementById(\"showList\");\r\n  \r\n    // Clear any existing data in the list\r\n    showListElement.innerHTML = \"\";\r\n  \r\n    // Loop through the TV shows array and create HTML elements dynamically\r\n    shows.forEach((show) => {\r\n      const showItem = createShowItem(show);\r\n      showListElement.appendChild(showItem);\r\n    });\r\n  };\r\n  \r\n  // Function to create a single TV show item with title, image, and buttons\r\n  const createShowItem = (show) => {\r\n    const showItemElement = document.createElement(\"div\");\r\n    showItemElement.classList.add(\"show-item\");\r\n  \r\n    const titleElement = document.createElement(\"h2\");\r\n    titleElement.textContent = show.name;\r\n  \r\n    const imageElement = document.createElement(\"img\");\r\n    imageElement.src = show.image.medium;\r\n    imageElement.alt = show.name;\r\n  \r\n    const commentsButton = document.createElement(\"button\");\r\n    commentsButton.textContent = \"Comments\";\r\n    commentsButton.disabled = true; // This button does nothing for now\r\n    // Optionally, you can add an event listener to handle the button click\r\n    // commentsButton.addEventListener(\"click\", handleCommentsButtonClick);\r\n  \r\n    const reservationsButton = document.createElement(\"button\");\r\n    reservationsButton.textContent = \"Reservations\";\r\n    reservationsButton.disabled = true; // This button does nothing for now\r\n    // Optionally, you can add an event listener to handle the button click\r\n    // reservationsButton.addEventListener(\"click\", handleReservationsButtonClick);\r\n  \r\n    showItemElement.appendChild(titleElement);\r\n    showItemElement.appendChild(imageElement);\r\n    showItemElement.appendChild(commentsButton);\r\n    showItemElement.appendChild(reservationsButton);\r\n  \r\n    return showItemElement;\r\n  };\r\n  \r\n  // When the page loads, fetch data and display the shows\r\n  window.onload = () => {\r\n    fetchAndDisplayShows();\r\n  };\r\n  \n\n//# sourceURL=webpack://javascript-Capstone/./src/scripts.js?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/scripts.js"));
/******/ }
]);