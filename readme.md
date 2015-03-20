# Quickstart
Install dependency before starting the server:
```
npm install
node init.js
```
(make sure you already have mongoDB running)

# Initialization 

If you are running the app for the first time, you'd be redirected to `/init` for some start-up configuration.

After initialization, `.env` and `data_seeding.js` files would be created: this is when
your app is ready to be deployed.

#Note (if you are deploying using git: e.g. to Heroku)
`.env` and `data_seeding.js` are both included in the `.gitignore` file. That means they will not be uploaded to the server with `git push`. You would need to remove them from the `.gitignore` file. (Or else you'd run into some error.) 


#Admin Panel
You can log into the admin panel (by visiting `/keystone`) after initilaization. The admin panel is where you can add & update events, mentors, and diffferent sections of the website.
