import './css/styles.css';
import './images/turing-logo.png'
import { fetchTrips, fetchDestinations, fetchLoginInfo, postTripBooking} from './apiCalls';
import {showAnnualCostSection,showBookATripSection,
  showPastTrips,showUpcomingTrips,signInUser,renderUpcomingTrips,renderPastTrips,renderCost,createDropDown,showErrorMessage,clearErrorMessage,} from "./domUpdates";
import {getUserPastTripDestinations, getUserUpcomingTripDestinations, getAnnualSpent, calculateTripCost } from './trips-functions';
import { getAllDestinations, makeUpcomingTrip } from './functions';

const upcomingTripsButton = document.querySelector('.upcoming-trips-button');
const pastTripsButton = document.querySelector('.past-trips-button');
const annualTotalButton = document.querySelector('.annual-total-button');
const bookATripButton = document.querySelector('.book-a-trip-button');
const signInButton = document.querySelector('.sign-in-button');
const usernameInputBox = document.querySelector('.username-input-box');
const passwordInputBox = document.querySelector('.password-input-box');
const loginError = document.querySelector(".login-error");
const startDateInput = document.querySelector(".start-date-input");
const endDateInput = document.querySelector(".end-date-input");
const travelersInput = document.querySelector(".travelers-input");
const destination = document.querySelector(".destination");
const submitButton = document.querySelector('.submit-button');

let user;
let tripsData;
let destinationsData;
export let newTrip = {};

upcomingTripsButton.addEventListener('click', () => {
  showUpcomingTrips();
});

pastTripsButton.addEventListener('click', () => {
  showPastTrips();
});

annualTotalButton.addEventListener('click', () => {
  showAnnualCostSection();
});

bookATripButton.addEventListener('click', () => {
  showBookATripSection();
});

signInButton.addEventListener("click", () => {
  user = captureLoginInfo(user);
  user = completeLogInEndpoint(user);
  handleLoginErrors(user);
  fetchLoginInfo(user);
  showUpcomingTrips();
  
    Promise.all([fetchTrips(), fetchDestinations()])
    .then((data) => {
      console.log(data);
       tripsData = data[0];
       destinationsData = data[1];
     displayUpcomingTripsDOM(tripsData, destinationsData);
     displayPastTripsDOM(tripsData, destinationsData);
     displayAnnualCostDOM(tripsData, destinationsData);

    })
    .catch((error) => {
      console.error(error);
    });
});

const handleEvent = (event) => {
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Enter")
  ) {
    renderDestinations(destinationsData);
  };
};

destination.addEventListener("click", handleEvent);
destination.addEventListener("keydown", handleEvent);

submitButton.addEventListener('click', () => {
  let bookingInfo = captureTripBookingData();
  let errorResponse = handleBookingErrors(bookingInfo);
   showErrorMessage(errorResponse);
  makeUpcomingTrip(bookingInfo, newTrip, tripsData, destinationsData, user);
  postTripBooking(newTrip);
  handleNumberOfTravelers(newTrip);
  clearOutInputFields();
  
  Promise.all([fetchTrips(), fetchDestinations()])
    .then((data) => {
      console.log(data);
      tripsData = data[0];
      destinationsData = data[1];
      displayUpcomingTripsDOM(tripsData, destinationsData);
      displayPastTripsDOM(tripsData, destinationsData);
      displayAnnualCostDOM(tripsData, destinationsData);
    }).then(() => {
       let tripCost = calculateTripCost(newTrip, destinationsData);
       clearErrorMessage(tripCost);
    })
    .catch((error) => {
      console.error(error);
    });
});

const clearOutInputFields = () => {
  startDateInput.value = '';
  endDateInput.value = '';
  travelersInput.value = '';
  destination.value = '';
}

const handleNumberOfTravelers = (newTrip) => {
  if(newTrip.travelers >= 1) {
    postTripBooking(newTrip);
    displayUpcomingTripsDOM(tripsData, destinationsData);
  }
}

const handleBookingErrors = (trip) => {
  let currentDate = new Date();
  let startDate = new Date(trip.startDate);
  let endDate = new Date(trip.endDate);

  if (startDate < currentDate) {
    return "You must book for a future date";
  }
  if (endDate < startDate) {
    return "Your trip end date cannot be before your trip start date";
  }
  if (parseInt(trip.travelers) < 1) {
    return "Must have at least one traveler";
  }
  if (
    !trip.startDate ||
    !trip.endDate ||
    !trip.travelers ||
    !trip.destination
  ) {
    return "Complete all form fields before submitting";
  } else {
  return "You're booking is complete. It should appear in Upcoming Trips!";
  }
};

const captureTripBookingData = () => {
  
  let trip = {
    startDate: startDateInput.value,
    endDate: endDateInput.value,
    travelers: parseInt(travelersInput.value),
    destination: destination.value
  }
 return trip;
}

const renderDestinations = (destinationsData) => {
  let places = getAllDestinations(destinationsData);
  createDropDown(places);
};

const displayUpcomingTripsDOM = (tripsData, destinationsData) => {
  let theUsersTrips = getUserUpcomingTripDestinations(user,tripsData,destinationsData);
  renderUpcomingTrips(theUsersTrips);
};

const displayPastTripsDOM = (tripsData, destinationsData) => {
  let theUsersTrips = getUserPastTripDestinations(user, tripsData, destinationsData)
  renderPastTrips(theUsersTrips);
};

const displayAnnualCostDOM = (tripsData, destinationsData) => {
  let cost = getAnnualSpent(user, tripsData, destinationsData);
  renderCost(cost);
};

const captureLoginInfo = (user) => {
   user = {
    id: null,
    username: usernameInputBox.value,
    password: passwordInputBox.value,
    endpoint: 'http://localhost:3001/api/v1/travelers/'
  }
  return user;
};

const completeLogInEndpoint = (user) => {
  user.id = parseInt(user.username.slice(8));
  user.endpoint += user.id;
  return user;
};

const handleLoginErrors = (user) => {
  if (user.id && user.id <= 50 && user.password === 'travel' && user.username.slice(0, 8) === 'traveler') {
    signInUser();
  } else {
    loginError.classList.remove("hidden");
  };
};

export const getUserFirstName = (data) => {
  return data.name.split(" ")[0];
};


