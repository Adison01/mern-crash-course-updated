<!--
Video Link for this project: https://youtu.be/O3BUHwfHf84?si=cFtqRL0ojgVFLOIV

 to deploy both fronend and backend application togather we have to run them in same port,
so we have to download cross-env package and add below script in package.josn 

1. go back to mern-crash-course location:
 a. npm run globals
 b. npm run build > this will make dist and node_modules folder in frontend project and backend project
  "scripts": {
    "globals": "npm i -g cross-env",
    "dev": "cross-env NODE_ENV=development  nodemon backend/server.js",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
    "start": "cross-env NODE_ENV=production  node backend/server.js"
  },

2. run project locally : got to mern-crash-course project location npm install , then go to mongoDB.com and
 login mongodb with email: adi*******in@gmail.com pass: Salauddin01,
 then npm run start

  -->