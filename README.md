Deployment and App Config Checklist

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
** build and copy from the FE to BE folder