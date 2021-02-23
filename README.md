# PET STORE API

This is a API which uses Node.js, MongoDB, and express. It routes the user requests, fetches/adds/updates/deletes data and sends back a suitable response. 

By default, it runs on PORT:5050. 
To run this, you need:

to create a `.env` file. In that .env file, specify the port you wish to use(or not, it will run on 5050 by default) and add a mongodb url. The url must have a username, password and must end with `/petstore`. When making a database in atlas, the user needs to make sure that the Database name and the collection name, both are, `petstore`. 
If you are facing any difficulties, contact the owner of this repository. 

Once a `.env` file has been created, do the following to run this:

* yarn install: to install the dependencies.
* yarn build: This will compile the ts into javascript. 
* yarn start: This will start the server.

go to `localhost:5050/api/pet/(route)`. 

# Routes: 
* /showall 

This route, once accessed, shows all the pets of the petstore. The Response sent has all pet names, their and their owner's data. It also incudes the last update date. 
A get request.
* request format:
{
  (no data needs to be sent)
}

* /add

This route can be used to add a new pet to the pet store. 
A post request.
The pet data request format is(.json):
            {"pet": "pet's name",
            "owner": "owner's name" ,
            "ownerphone": "owner's phone number",
            "owneremail": "owner's emailid",
            "species": "the species of the pet",
            "breed": "The breed of the pet",
            "age": "Their age",
            "weight": "Their weight",
            "gender": "The gender"}
            
once this request is sent, a unique tag and a date is generated for every new addition and added to this data and stored in the Database. Send the tag generated as a response. 

* /show 

This route displays the details of a particular pet. The client needs to send the unique tag as a request and the API fetches the pet details. The pet name is not sent as a request as multiple pets in the pet store can have the same name and it is not ideal to fetch them all. Hence, a unique tag is used.
A GET request.
The request format:
{
  "tag":"the unique tag generated at the time of creation (/add)"
}

* /update

This route can be used to update the pet data. Every paramter can be updated except the unique tag.
A PUT request.
request format:
{
"tag":"the tag generated at the time of creation (/add)",
"pet":"the new pet name",
"ownerphone":"the new phone number"
(data that needs to be update, if no other fields are sent, the data will remain the same)
}

* /delete

This route is used to delete pet data. To ensure only the owner can delete the data, the request format includes the name of the owner and the tag. The pet name is not used as multiple pets can have the same name. Tags are unique.
A delete request.
The request format is:
{
"tag":"tag",
"owner":"owner"
}

* /ownerallpets

This route displays the pet names and details of all pets owned by a particular owner. 
A get request.
Request format:
{
"owner":"owner's name"
}

* /ownerofpet

This route displays the name, emailId and the phone number of the owner of a pet. Since multiple pets can have the same name, the request includes the unique tag. 
A get request.
request format:
{
"tag":"the unique tag assigned to the pet",
"pet":"the name of the pet"
}

* /allowners

This displays the names of all of the owners of the pets of the pet store. Also displays the tag of their pet(s). 
A get request. 
request format;
{
(no data)
}
