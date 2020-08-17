# Installation Instructions
1. go to GIT REPOSITORY LINK HERE
2. fork and clone the repository
    - image of fork
    - img of link
    - git clone REPOSITORY
3. install all node packages
    - npm i
4. create the database
    - createdb -U <username> league_of_L
5. confirm database name is the same in the config/config.json
6. if on MAC, remove all <username> and <password> entities in the config.json
6. if on WINDOWS or LINUX, change <username> and <password> entries to the username and password of your database
7. migrate the models to the database
    - sequelize db:migrate
8. add a .env file with the following fields: 
    - SESSION_SECRET: Can be any random string; usually a hash in production
    - PORT: Usually 3000 or 8000
9. run the server!
    - nodemon
    - node server.js
