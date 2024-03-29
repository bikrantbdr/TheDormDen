﻿# The Dorm Den  🐐

A Hostel Web Portal using MERN stack

## [Live Preview](https://dormden.netlify.app/) 🎈

![This is an image](https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/HomePage.png)


## About ℹ️

**`The Dorm Den`** is a Hostel Web Portal implemented in `MERN stack` by [Bikrant Bidari](https://github.com/bikrantbdr), [Sudeep Kaucha](https://github.com/Sudeep-K), [Sameer Shrestha](https://github.com/SAMEER-SHRESTHA911) and [Arahanta Pokhrel](https://github.com/arahanta). While creating the project, we learnt about `Event Listeners in React`, `React State`, `Conditional Rendering in React`, `React Hooks(useEffect,useState)`, `React Routers`, `Styled components`, etc.  A user can search for hostels as per his/her requirement and a hostel owner can showcase his/her hostel. After creating the project, `Frontend` was deployed to `Netlify`and `Backend` was deployed to `Render`.

## Technologies Used 💻

<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="50" height="50"/> </a>                                         <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="50" height="50"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer">  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="50" height="50"/> </a>                                      <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="50" height="50"/> </a>                                                          <a href="https://www.figma.com/" target="_blank" rel="noreferrer">  <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="50" height="50"/> </a>                                       <a href="https://postman.com" target="_blank" rel="noreferrer">  <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="50" height="50"/> </a>                             <a href ="https://npmjs.com/>" target="_blank" rel="noreferrer">  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt = "npm" width = "50" height="50" /> </a>                       <a href="https://www.cloudinary.com/" target="_blank" rel="noreferrer"> <img src="https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/cloudinary.png" alt = "cloudinary" width="50" height="50">
  

</br >

## Includes the following features ⚙️

        - Places autocomplete
        - Geo encoding
        - Filtering
        - Sorting
        - Encryption 

</br>

## Usage 🪄

```bash
###Clone the repository using Github CLI
git clone https://github.com/bikrantbdr/TheDormDen.git
```

<h4>Frontend</h4>

```bash
###Go to the client folder
cd client
###Install Dependencies
npm install
```

```bash
###Start the developmet server(App will open in a new window)
npm start
```

<h4>Backend</h4>

```bash
###Go to the Backend folder
cd Backend
###Install Dependencies
npm install
```

```bash
###Create a .env file inside the Backend folder and add the following things inside that file:

MONGODB_URI = 
SECRET = 
PORT = 
SMPT_SERVICE = 
SMPT_EMAIL = 
SMPT_PASSWORD = 
COOKIE_EXPIRES_IN = 
CLOUDINARY_NAME =
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 

#Fill in the blank contents of the .env file with your data
```

```bash
###Deploy backend server locally
npm run dev
```
<br/>

<h2>Steps we used to complete this project 🪜</h2>

## ➡️ Frontend

### 1. Initialize Frontend of the project 🐲

-   [x] Initialize the project using `npx create-react-app thedormden` which will create a
        complete **React App** pre-configured and pre-installed with the dependencies.
-   [x] Delete the Boiler plate.

### 2. Organize the project 🧹

-   [x] Create `components`, `utils`, `assets` and `Pages` folder inside the `src` directory.

### 3. Routing and Rendering 🛣️

-   [x] Index.jsx renders the React components
-   [x] App.jsx routes to the different pages.

### 4. Designing the Pages ✂️✨

-   [x] Design basic layout of the pages
-   [x] 

### 5. Pages 📄

-   [x] Create different pages according to the requirements

    #### 5.1 Home Page:
    ![Home page](https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/HomePage.png)

    #### 5.2 Search Page
    ![Search Page](https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/SearchPage.png)

    #### 5.3 Individual Page
    ![Individual Page](https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/IndividualHostelPage.png)

    #### 5.4 Dashboard(User, Admin)
    ![User Page](https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/UserDashboard.png)
    ![Admin Page](https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/AdminDashboard.png)

    #### 5.5 Login Page
    ![Login](https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/LoginPage.png)
    #### 5.6 Register Page
    ![Register Page](https://github.com/SAMEER-SHRESTHA911/Readme/blob/main/output/ReisterUser.png)

### 6. Packages 📦

-   [x] Install the packages to be used.
```bash
npm install 'npm-package-name'
```
-   [x] Some of the packages used in our project are
    

    #### 6.1 Styled Components
    
    - Used to write CSS code within the JSX components.

    #### 6.2 React Icons 

    - To access customizable icons for use in React components

    #### 6.3 Pigeon Map 🗺️

    - Display and access location details.

    #### 6.4 Axios

    - Handle request from the frontend and get respond from the backend

    #### 6.5  React Router DOM

    - Implement dynamic routing in the web app.

    #### 6.6 Universal Cookie

    - Access cookies from all the routes.

    #### 6.7 JWT decode

    - Decode the data from the cookie. 
</br>

### 7.  API(Application Programming Interface)📥

-   [x] Add the API's used in the project.
-   [x] Some of the used API's are

    #### 7.1 Places Autocomplete API
    -   predicts place in response to an HTTP response
    #### 7.2 Geo Encoding API
    -   provide geocoding and reverse geoencoding of addresses

### 8. Make App Responsive 📱

-   [x] Change _Absolute_ units to _Relative_.
-   [x] Make App responsive for mobile by adding `media query`. 😊

### 9. Prepare for Deployment 🪢

-   [x] Delete **unnecessary** files from directory and format code with `Prettier`.
-   [x] Test for _Responsiveness_ and make changes if need be.
-   [x] Add links to `Live Preview` and _screenshots_ in Readme file.

### 10. Deploy 🚀

-   [x] Use official documentation of [Netlify](https://docs.netlify.com/) to deploy Frontend🎆🎆🎆

<br/>

## ➡️ Backend

### 1. Initialize the Backend
-   [x] Create a new project and initialize it with the package manager i.e.npm init.

-   [x] Install necessary packages and dependencies, such as bcrypt, cloudinary, cors, dotenv, jsonwebtoken, mongoose, nodemailer, uuid, etc.

### 2. Organize the project 🧹 

-   [x] Create folders to organize the code that are index,app, models, router, controllers,  utils, etc.

-   [x] Define the database schema and models using Mongoose.

-   [x] Some of the files and their uses in the project

    #### 2.1 Index file: 
    - Responsible for setting up the environment and starting the server
    #### 2.2 App file:
    - Define the core functionality of the server, including middleware and route handling
    #### 2.3 Router file:
    - maps incoming request to the appropriate controller function
    #### 2.4 Model file: 
    - handles database queries, data validation and other operations related to data
    #### 2.5 Util function:
    - provide resuable function which include token verification,query handling,logging and error handling

### 3.  Implement server functionality 🎬

-   [x]  Define routes and controllers to handle HTTP requests and responses, e.g., GET, POST, PUT, DELETE, etc.

-   [x] Implement authentication and authorization using JWTs and middleware functions.

-   [x] Implement error handling and logging using middleware functions,that are errorHandler, logger, etc.

-   [x] Implement file upload and management using Cloudinary and middleware functions.

-   [x] Implement email sending and verification using Nodemailer and middleware functions.

### 4.  Test the server 🧪

-   [x] Test the server functionality and endpoints using tools such as Postman, Jest, Mocha, etc.we used postman

-   [x] Debug and fix any issues or errors.

### 5. Prepare for deployment ✈️

-   [x] Set environment variables and configurations for the server, such as PORT, MONGODB_URI, CLOUDINARY_URL, JWT_SECRET, etc

-   [x] Add build scripts to package.json for production deployment.

-   [x]  Test the server locally and ensure it works correctly.

### 6. Deployment 🚀

-   [x] Use official documentation of [Render](https://render.com/docs) to deploy Backend.

<br/>

## Future Changes ♾️

-   [ ] Improve SEO
-   [ ] Add animations and provide a better User Experience

#### Quote ✒️

"If the code is working but it isn't supposed to work and you don't know the reason, kindly don't touch the code. In short, If it works, don't change it." - Every Frustrated Coder
💭✨💯

    
