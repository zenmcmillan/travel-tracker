# Travel Tracker

## Abstract:
This Application allows the user to book a trip and view their future trips as well as past trips. The user can also see a breakdown of the cost for the trip they just booked as well as the cost for all the trips they booked this year

## Application link:

[Travel Tracker Application](https://github.com/zenmcmillan/travel-tracker)

[Travel Tracker API](https://github.com/turingschool-examples/travel-tracker-api)

## Installation Instructions

1. Change into the directory you wish to clone the app into with the `cd` command.
2. Run `git clone git@github.com:zenmcmillan/travel-tracker.git` 
3. Run `npm install` and wait a few seconds until its finished installing
4. Run `npm start`
5. copy this `http://localhost:8080/` and put it into your browser
6. Run `git clone git@github.com:turingschool-examples/travel-tracker-api.git`
7. Run `npm install`
8. Run `npm start`
9. Copy this API link into your browser `http://localhost:3001/` it should `say Cannot GET /`
10. Now refresh the `http://localhost:8080/` and the application should be running

## Preview of App:

![travel-tracker](https://github.com/zenmcmillan/travel-tracker/assets/121205752/ef4bf559-41b2-4916-a92b-657d9480d714)


## Context:
This is the final project for the front end program at the Turing School of Software & Design. It took about 30 hours to complete this project

## Contributors:

[Zen McMillan](https://github.com/zenmcmillan)

## Learning Goals:

- Use object and array prototype methods to perform data manipulation
- Create a clear and accessible user interface
- Make network requests to retrieve data
- Implement a robust testing suite using TDD
- Write DRY, reusable code that follows SRP (Single Responsibility Principle)

## Wins + Challenges:

- Getting the booking form to work properly was challenging. I needed to get it to display the right message for when the user submits it with bad or incomplete data. The trip also wouldn't show in the upcoming trips section at first unless the page was refreshed. 

- This problem was solved by adding the network request that fetched data from the trips endpoint to the submit button event listener


