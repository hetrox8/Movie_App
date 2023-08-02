const template = [
    { title: "movie 1", rating: 4.7 },
    { title: "movie 2", rating: 4.0 },
    { title: "movie 3", rating: 5.0 }
  ];
  
  const display = () => {
    const dataList = document.getElementsByClassName('list-1');
    dataList.innerHtml = "";
  
    template.forEach((item) => {
      const list_item = document.createElement('li');
      list_item.textContent = `title: ${item.title}, rating: ${item.rating}`;
  
      dataList.appendChild(list_item);
    });
  };
  
  const fetchAndDisplayShows = async () => {
    try {
      const response = await fetch("https://api.tvmaze.com/shows");
      const data = await response.json();
      displayShows(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  
  const displayShows = (shows) => {
    const showListElement = document.getElementById("showList");
  
    // Clear any existing data in the list
    showListElement.innerHTML = "";
  
    // Loop through the TV shows array and create HTML elements dynamically
    shows.forEach((show) => {
      const showItem = createShowItem(show);
      showListElement.appendChild(showItem);
    });
  };
  
  // Function to create a single TV show item with title, image, and buttons
  const createShowItem = (show) => {
    const showItemElement = document.createElement("div");
    showItemElement.classList.add("show-item");
  
    const titleElement = document.createElement("h2");
    titleElement.textContent = show.name;
  
    const imageElement = document.createElement("img");
    imageElement.src = show.image.medium;
    imageElement.alt = show.name;
  
    const commentsButton = document.createElement("button");
    commentsButton.textContent = "Comments";
    commentsButton.disabled = true; // This button does nothing for now
    // Optionally, you can add an event listener to handle the button click
     commentsButton.addEventListener("click", handleCommentsButtonClick);
  
    const reservationsButton = document.createElement("button");
    reservationsButton.textContent = "Reservations";
    reservationsButton.disabled = true; // This button does nothing for now
    // Optionally, you can add an event listener to handle the button click
    // reservationsButton.addEventListener("click", handleReservationsButtonClick);
  
    showItemElement.appendChild(titleElement);
    showItemElement.appendChild(imageElement);
    showItemElement.appendChild(commentsButton);
    showItemElement.appendChild(reservationsButton);
  
    return showItemElement;
  };
  
  // When the page loads, fetch data and display the shows
  window.onload = () => {
    fetchAndDisplayShows();
  };
  