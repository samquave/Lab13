# FS-SP17-Lab9

# Lab 09: Chirper

##### Covalence

## Info

* You will be creating Chirper, a web-based messaging system

* Chirper is used by millions of people

* Chirper allows people to send absurdly short, non-useful messages to no one in particular

* These messages are called chirps

## Getting started

* You will want to write the server code before you write the front-end code

* You will need to install nodemon globally:

```

npm install -g nodemon

```

* You will also need to install Mocha dependencies:

```

npm install

```

* To start your server, from the root of your project, run the following command:

```

nodemon

```

* There is a Mocha tester included for you to run. It will check and make sure your server behaves as it should

* It only covers the basics. Passing all the tests doesn't mean your server is correct.

* To run the Mocha tester, when your server is running (i.e. you ran `nodemon` as mentioned above), open a new tab in terminal and run:

```

npm test

```

* TO VIEW YOUR WEBPAGE: Go to http://localhost:3000 in your browser. DO NOT open index.html in Finder like we have been doing.

## Submission Instructions

* Simply make sure you commit to your repository and push before the lab is due

## Objectives

* This will be your first lab where you will be building a front-end and back-end!

### Front-end:

* You will build your front-end in the `client` folder

* Your index.html webpage should have a text box with a button labeled "Chirp!"

* There should be a styled list of chirps displayed on the page

* When the page loads, make a GET request to `http://localhost:3000/api/chirps`

* When the server responds, create a div for each chirp and put it in the page so it is visible

* The text field and button at the top of the page should behave as follows:

* The button should be disabled when the text field is empty

* As soon as the field is no longer empty, the button should be enabled

* If the field becomes empty again, the button should be disabled

* Clicking the button will send the chirp off to the back-end you will build. Specifically, you should:

* Create a JS object with properties `message`, `user`, and `timestamp`

* Send a POST request to `http://localhost:3000/api/chirps`

* Make sure to set your content type to json

* Make sure to convert the JS object to JSON before sending it in the post request

* Once the server sends a response, make the new tweet show up in the tweet list

### Back-end:

* You will build an HTTP server using NodeJS

* You will write your server logic in index.js

* The skeleton of the file has been completed for you

* Your server should:

* Check the request url path (the Node `url` module may be useful for this)

* If the path is `/`:

* Set the response code for OK and the content type for html

* respond with the contents of `index.html` in the `client` folder

* Otherwise if the path is `/api/chirps`:

* Check the request method

* If the request is a GET request:

* Read the JSON stored in data.json in the `server` folder

* Set the response code for OK and content type for json

* Respond with the JSON data from the file

* NOTE: Instead of reading and then responding, you can respond more efficiently by creating a read stream and piping it to the response

* Otherwise if the request is a POST request:

* Read the JSON stored in data.json in the `server` folder

* This data is in JSON format

* You need to convert it to a JS object

* It will become an array (because that's what I started the file out with)

* Collect the data sent in the POST request. It will be JSON

* Turn the collected data into a JS object

* Push that JS object onto the array

* Then, convert the array back into JSON and write it back to the data.json file

* Finally, set the response code for ACCEPTED (201) and content type for json

* End the response

* In all other cases:

* Do not worry what the request method is

* Look at the request url / path to determine what you should do

* For example, if the requested path is /style.css:

* Read the file style.css from the `client` folder

* Set the response code for OK and the content type to css

* Respond with the contents of the file

* OR: pipe a read stream to res

* You will probably find the [path.parse() function](https://nodejs.org/api/path.html#path_path_parse_path) very useful

* You only have to worry about .js, .css, and .html files

* If you are going to add any images to your client folder and include them in your html, you will want to make sure you respond to those file types as well

* If an error occurs when reading the file (i.e. the file doesn't exist):

* Set the response code to 404

* Respond with 'Not Found'
