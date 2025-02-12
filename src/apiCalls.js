import { getUserFirstName } from "./scripts";
import { showUserFirstName } from "./domUpdates";

export const fetchTrips = () => {
  return fetch("http://localhost:3001/api/v1/trips")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.trips);
      return data.trips;
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
  };

export const fetchDestinations = () => {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.destinations);
      return data.destinations;
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
  }; 

export const fetchLoginInfo = (user) => {
  let endpoint = user.endpoint;
   fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let name = getUserFirstName(data)
      console.log(name)
      showUserFirstName(name)
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
};


export const postTripBooking = (newTrip) => {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(newTrip),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok && response.status !== 422) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("New activity data:", data);
      return fetch("http://localhost:3001/api/v1/trips"); 
    })
    .then((response) => response.json())
    .then((updatedData) => {
      console.log("Updated data:", updatedData)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
