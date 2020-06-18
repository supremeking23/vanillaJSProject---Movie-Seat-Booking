const container = document.querySelector(".container"); // select just one

const seats = document.querySelectorAll(".row .seat:not(.occupied)"); // grabs all of them and put in a nodeList

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const movieTitle = document.querySelector(".screen-text");

populateUI();

let ticketPrice = +movieSelect.value; //change type from string to number , you can use also parseInt
//console.log(typeof ticketPrice);



function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("selectedMovieIndex",movieIndex);
    localStorage.setItem("selectedMoviePrice",moviePrice);
}

function updateSelectedCount(){

    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    //copy selected seats into arr
    //Map through array
    //return a new array indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //key value pair
    //console.log(JSON.stringify("ivan"));
    localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice;
   
}

//opposite of json.stringyfy is json.parse , string back to array

//Get data from localstorage and Populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeats);

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected")
            }
        });
    }
    
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

//Movie select event
movieSelect.addEventListener("change", e => {

movieTitle.innerText = movieSelect.options[movieSelect.selectedIndex].text;
ticketPrice = +e.target.value; 
setMovieData(e.target.selectedIndex,e.target.value); 
updateSelectedCount();
//console.log(movieSelect.options[movieSelect.selectedIndex].text);

});

//Seat Click Event
container.addEventListener("click",(e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
       e.target.classList.toggle("selected");
       updateSelectedCount();
    }
    
});


//Initial count and total set // upon page loading
updateSelectedCount();