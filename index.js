const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

const select = document.querySelector("select");

select.addEventListener("change", backgrounds);

function backgrounds() {
  var choise = select.value;
  if (choise === "150") {
    document.querySelector("body").style.backgroundImage =
      "url('https://sportshub.cbsistatic.com/i/2021/10/23/1c1002d2-773d-4862-a96a-282a86a7030b/spider-man-no-way-home-new-still.jpg')";
    //alert("hhhh");
  } else if (choise === "120") {
    document.querySelector("body").style.backgroundImage =
      "url('https://www.koimoi.com/wp-content/new-galleries/2022/06/rrr-creates-history-trends-1-in-54-countries-001.jpg')";
    //alert("hhhh");
  } else if (choise === "100") {
    document.querySelector("body").style.backgroundImage =
      "url('https://cdn.mos.cms.futurecdn.net/2NBcYamXxLpvA77ciPfKZW-1200-80.jpg')";
    //alert("hhhh");
  } else if (choise === "125") {
    document.querySelector("body").style.backgroundImage =
      "url('https://i.ytimg.com/vi/c0ROVoje6HQ/maxresdefault.jpg')";
    //alert("hhhh");
  } else if (choise === "130") {
    document.querySelector("body").style.backgroundImage =
      "url('https://i.ytimg.com/vi/Pj0wz7zu3Ms/maxresdefault.jpg')";
    //alert("hhhh");
  }
}

populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// intial count and total
updateSelectedCount();
