# E-Commerce Backend
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This application is a mock e-commerce backend, combining the node packages express, sequelize, mySQL2, and dotenv to create a working API that a site could query to receive or modify data from several related tables in a database. I created it to get a stronger working knowledge of sequelize specifically, and I certainly solidified my knowledge of express js while working through this project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

    
## Installation:

First, the user must install node, then run npm i from the CLI to install the necessary packages. 

Next, change the .env.example file to match your mySQL username and password (root is commonly the username). Then, change its filename to .env (nothing should be before the .) Note: this will not expose your credentials.

Then, install the mySQL CLI, log into it and run "source db/schema.sql" to create the database (note: if you have a pre-existing local database named ecommerce_db, this will delete it).

Run the command "npm run seed" from the command line to create the tables and content within the database.

In order to interact with the mock API server, the user will need to download an API client or API design platform; I recommend insomnia.

## Usage

Start the server by running the command "npm start" from the CLI. You should see the message "App listening on port 3001!" in your CLI if all is well (if not, review the error and revisit the installation instructions). Then, using insomnia (or something similar), you can use the defined routes  to manipulate the tables in the database(see below for the list of routes).

There are 4 related tables in the database: category, product, tag, and product_tag. A graphical representation of the database structure is below (1s are the primary key side of a link, * denotes the foreign key side of a link):

![Screenshot](assets/images/db-structure.jpg?raw=true "Database Structure")

There are 15 routes in all, each of which allows the user to manipulate or retrieve data from these tables:

Get all routes (when these queries are sent, the server will respond with all the rows from the chosen table, along with some associated data):
```
http://localhost:3001/api/categories/
```
```
http://localhost:3001/api/products/
```
```
http://localhost:3001/api/tags/
```
Get by id routes (replace the # with a valid integer to return information from a specific row, along with some associated data):
```
http://localhost:3001/api/categories/#
```
```
http://localhost:3001/api/products/#
```
```
http://localhost:3001/api/tags/#
```

Post routes, used to add data to the database (a JSON body must be included; sample JSON bodies are provided for each):
```
http://localhost:3001/api/categories/
```
Sample JSON:
```
    {
        "category_name": "tools" 
    }
```
```
http://localhost:3001/api/products/
```
Sample JSON:
```
    {
        "product_name": "Basketball",
        "price": 200.00,
        "stock": 3,
        "tagIds": [1, 2, 3, 4],
        "category_id": 1
    }
```
```
http://localhost:3001/api/tags/
```
Sample JSON:
```
    {
        "tag_name": "bronze"
    }
```

Put routes, used to update information in specific rows (replace the # with a valid id. A JSON body must be included; sample JSON bodies are provided for each):
```
http://localhost:3001/api/categories/#
```
Sample JSON:
```
    {
        "category_name": "Gardening" 
    }
```
```
http://localhost:3001/api/products/#
```
Sample JSON:
```
    {
        "product_name": "Nutcracker",
        "price": 20.00,
        "stock": 5,
        "tagIds": [3, 1, 5, 2],
        "category_id": 2
    }
```
```
http://localhost:3001/api/tags/#
```
Sample JSON:
```
    {
        "tag_name": "copper"
    }
```

Delete routes, used to remove a row from a table at the requested row (the user must replace the # with a valid id)
```
http://localhost:3001/api/categories/#
```
```
http://localhost:3001/api/products/#
```
```
http://localhost:3001/api/tags/#
```

Screenshots of insomnia sending queries to the server and responding:

![Screenshot](assets/images/Screenshot1.jpg?raw=true "Screenshot 1")

![Screenshot](assets/images/Screenshot2.jpg?raw=true "Screenshot 2")

![Screenshot](assets/images/Screenshot3.jpg?raw=true "Screenshot 3")


Video of each route manipulating the database (featuring insomnia): https://drive.google.com/file/d/1oHjsnQHeyuFXJRO7uTiQ2P4hmkfulO6L/view?usp=sharing

## Credits

The following npm packages were used to create this project:
Express js: https://expressjs.com/
Sequelize: https://sequelize.org/
MySQL2: https://www.npmjs.com/package/mysql2
dotenv: https://www.npmjs.com/package/dotenv

Some code was provided by the instructional staff at the Georgia Tech full stack developer boot camp I'm attending.

Insomnia was used to test and display the server's functions in the provided screenshots and a video: https://insomnia.rest/

## License

Copyright 2022 Adam Brock
      
This program is licensed using the MIT license: https://opensource.org/licenses/MIT.

## Questions

Feel free to reach out to me with questions at a.paulbrock@gmail.com.

My GitHub profile is at https://github.com/abrock3.