// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { fetchTrips, fetchDestinations, fetchLoginInfo } from './apiCalls';
import { showAnnualCostSection, showBookATripSection, showPastTrips, showPendingTrips, showUpcomingTrips, signInUser } from './domUpdates';
import { getUserPastTrips, getUserPastTripDestinations, getUserUpcomingTripDestinations } from './trips-functions';
console.log('This is the JavaScript entry file - your code begins here.');


const upcomingTripsButton = document.querySelector('.upcoming-trips-button');
const pendingTripsButton = document.querySelector('.pending-trips-button');
const pastTripsButton = document.querySelector('.past-trips-button');
const annualTotalButton = document.querySelector('.annual-total-button');
const bookATripButton = document.querySelector('.book-a-trip-button');
const signInButton = document.querySelector('.sign-in-button');
const usernameInputBox = document.querySelector('.username-input-box');
const passwordInputBox = document.querySelector('.password-input-box');
const loginError = document.querySelector(".login-error");
const pages = document.querySelectorAll('.pages');

let user

upcomingTripsButton.addEventListener('click', () => {
  showUpcomingTrips()
})

pendingTripsButton.addEventListener('click', () => {
  showPendingTrips()
})

pastTripsButton.addEventListener('click', () => {
  showPastTrips()
})

annualTotalButton.addEventListener('click', () => {
  showAnnualCostSection()
})

bookATripButton.addEventListener('click', () => {
  showBookATripSection()
})

signInButton.addEventListener("click", () => {
  user = captureLoginInfo(user);
  user = completeLogInEndpoint(user);
  handleLoginErrors(user);
  fetchLoginInfo(user)
  showUpcomingTrips()
  
    Promise.all([fetchTrips(), fetchDestinations()])
    .then((data) => {
      console.log(data);
      const tripsData = data[0];
      const destinationsData = data[1];
      populateDOM(tripsData, destinationsData)
    })
    .catch((error) => {
      console.error(error);
    });
});

const populateDOM = (tripsData, destinationsData) => {
  let theUsersTrips = getUserUpcomingTripDestinations(user, tripsData, destinationsData)
  console.log("the users Trips", theUsersTrips)
}

// signInButton.addEventListener('click', () => {
  
// })











const captureLoginInfo = (user) => {
   user = {
    id: null,
    username: usernameInputBox.value,
    password: passwordInputBox.value,
    endpoint: 'http://localhost:3001/api/v1/travelers/'
  }
  return user
}

const completeLogInEndpoint = (user) => {
  user.id = parseInt(user.username.slice(8));
  user.endpoint += user.id;
  return user;
};

const handleLoginErrors = (user) => {
  if (user.id && user.id <= 50 && user.password === 'travel' && user.username.slice(0, 8) === 'traveler') {
    signInUser()
  } else {
    loginError.classList.remove("hidden");
  }
  console.log("USER",user)
}

export const getUserFirstName = (data) => {
  return data.name.split(" ")[0];
};

export const showUserFirstName = (name) => {
  pages.forEach((page) => {
    page.innerText = `Welcome, ${name}`;
  });
};
