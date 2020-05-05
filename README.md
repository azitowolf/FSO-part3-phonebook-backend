# U Helsinki Fullstack Open Coursework

## Assignment 3b: Deploying App to the internet

## Notes App
### Source
https://github.com/azitowolf/notes-backend 
### Live Demo
https://pure-garden-57296.herokuapp.com/

## Phonebook App
### Source
https://github.com/azitowolf/phonebook-backend
### Live Demo
https://desolate-citadel-80539.herokuapp.com/


## Deployment and App Config Checklist

* BE get backend online
    * git repo init
    * procfile
    * process.env for server port
    * heroku init
    * test requests

* FE change URLs to relative URLS
    * add a proxy to config for development
    * CORs add middleware if needed for dev.
    * add static file middleware - app.use(express.static('build'))
    * run BE locally with static files 

* BE set up build process & automate
    * build and copy from the FE to BE folder

 ## Connecting BE Server to DB Checklist

* Command line tool to test the DB connection / flex coding muscles 
    * ex. input: node mongo.js yourpassword "Arto Vihavainen" 040-1234556

* Initial Setup / Wiring
    * add mongoose + DB connection string
    * dotenv library to mask the private variables
    * add formatting for the objects returned by mongoose (tostring method) and transform to remove unesecary backend data
    * move DB config to it's own module 
    * Use DB in route handlers
 
* Verify wiring
    * use REST client to test all routes, monitor in backend + DB
    * connect front end after all routes are confirmed working

* Error handling
    * Set up middleware for incorrect routes
    * Set up custom middleware for error handling
    * verify order of middleware. variables > HTTP requests > error handling 