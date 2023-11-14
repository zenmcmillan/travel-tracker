
const upcomingTripsSection = document.querySelector(".upcoming-trips-section");
const pendingTripsSection = document.querySelector(".pending-trips-section");
const pastTripsSection = document.querySelector(".past-trips-section");
const bookATripSection = document.querySelector(".book-a-trip-section");
const annualTotalSection = document.querySelector(".annual-total-section");
const pageContent = document.querySelector(".page-content");
const loginContainer = document.querySelector(".login-container");
const upcomingTrips = document.querySelector('.upcoming-trips');
const destination = document.querySelector('.destination');
const welcomeName = document.querySelector(".welcome-name");
const bookingError = document.querySelector('.booking-error');
const annualTotal = document.querySelector(".annual-cost");
// const pastTrips = document.querySelector('.past-trips')

export const signInUser = () => {
  pageContent.classList.remove("hidden");
  loginContainer.classList.add("hidden"); 
};

export const showAnnualCostSection = () => {
  upcomingTripsSection.classList.add("hidden");
  pendingTripsSection.classList.add("hidden");
  pastTripsSection.classList.add("hidden");
  bookATripSection.classList.add("hidden");
  annualTotalSection.classList.remove("hidden");
};

export const showBookATripSection = () => {
  upcomingTripsSection.classList.add("hidden");
  pendingTripsSection.classList.add("hidden");
  pastTripsSection.classList.add("hidden");
  annualTotalSection.classList.add("hidden");
  bookATripSection.classList.remove("hidden");
};

export const showPastTrips = () => {
  upcomingTripsSection.classList.add("hidden");
  pendingTripsSection.classList.add("hidden");
  bookATripSection.classList.add("hidden");
  annualTotalSection.classList.add("hidden");
  pastTripsSection.classList.remove("hidden");
};

export const showPendingTrips = () => {
  upcomingTripsSection.classList.add("hidden");
  pastTripsSection.classList.add("hidden");
  bookATripSection.classList.add("hidden");
  annualTotalSection.classList.add("hidden");
  pendingTripsSection.classList.remove("hidden");
};

export const showUpcomingTrips = () => {
  pendingTripsSection.classList.add("hidden");
  pastTripsSection.classList.add("hidden");
  bookATripSection.classList.add("hidden");
  annualTotalSection.classList.add("hidden");
  upcomingTripsSection.classList.remove("hidden");
};


export const showUserFirstName = (name) => {
  welcomeName.innerHTML += `Welcome ${name}`;
};

export const renderUpcomingTrips = (theUsersTrips) => {
  console.log(theUsersTrips)
  if (typeof theUsersTrips !== "string") {
    theUsersTrips.forEach(trip => {
      upcomingTrips.innerHTML = ''
      upcomingTripsSection.innerHTML += `
    <div class= "trip-wrapper">
      <p> Location  ${trip.destination}</p>
      <image  class="trip-images" src="${trip.image} alt=${trip.alt}">
      <p> Flight Cost ${trip.estimatedFlightCostPerPerson}</p>
      <p> Hotel Daily ${trip.estimatedLodgingCostPerDay}</p>
    </div>
    `;
    }) 
  } 
}


export const renderPastTrips = (theUsersTrips) => {

  theUsersTrips.forEach(trip => {
    pastTripsSection.innerHTML = ''
    pastTripsSection.innerHTML += `
    <div class= "trip-wrapper">
      <p> Location  ${trip.destination}</p>
      <image  class="trip-images" src="${trip.image} alt=${trip.alt}">
      <p> Flight Cost ${trip.estimatedFlightCostPerPerson}</p>
      <p> Hotel Daily ${trip.estimatedLodgingCostPerDay}</p>
    </div>
    `;
  })
}

export const renderCost = (cost) => {

  if (typeof cost === 'string') {
    annualTotal.innerHTML += `
    <p>${cost}</p>
    `
  } else {
    annualTotalSection.innerHTML = '';
    annualTotalSection.innerHTML += `
  <p>Flight - $${cost.totalFlightPrice}</p>
  <p>Hotel - $${cost.totalLodgingPrice}</p>
  <p>Subtotal - $${cost.subTotal}</p>
  <p>Agent Fee - $${cost.agentFee}</p>
  <p>Total $${cost.total}</p>
  `
  } 
}

export const createDropDown = (places) => {
  places.forEach((place) => {
    const option = document.createElement("option");
    option.textContent = place;
    destination.appendChild(option);
  });
};

export const showErrorMessage = (trip) => {
  if (typeof trip === 'string') {
    bookingError.innerText = `${trip}`;
  }
}

export const clearErrorMessage = () => {
  if (bookingError.innerText = "Your're booking has be submitted. It should appear in Upcoming Trips!") {
     setTimeout(() => {
       bookingError.innerHTML = ''
     }, 3000);
  }
}