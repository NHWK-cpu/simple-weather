import { API_URL } from "./api.mjs";

const temperatureField = document.querySelector(".degree p");
const locationField = document.querySelector(".location");
const dateField = document.querySelector(".dateTime");
const conditionImage = document.querySelector(".info img");
const conditionField = document.querySelector(".info p");
const searchField = document.querySelector(".search_field");
const form = document.querySelector("form");

form.addEventListener("submit", searchForLocation);

let target = "Surabaya";

const fetchResults = async (targetLocation) => {
  let url = API_URL + targetLocation;

  const res = await fetch(url);

  const data = await res.json();

  console.log(data);

  let locationName = data.location.name;
  let time = data.location.localtime;

  let temp = data.current.temp_c;
  let condition = data.current.condition.text;
  let icon = data.current.condition.icon;

  updateFrontEnd(temp, locationName, time, condition, icon);
};

function updateFrontEnd(temp, locationName, time, condition, icon) {
  let splitDate = time.split(" ")[0];
  let splitTime = time.split(" ")[1];

  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = temp;
  locationField.innerText = locationName;
  dateField.innerText = `${splitTime} ${currentDay} ${splitDate}`;
  conditionImage.src = `https:${icon}`;
  conditionField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();

  target = searchField.value;

  fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      break;
  }
}
