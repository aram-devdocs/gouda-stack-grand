Commands:
- npm run database
-- This will allow you to visit the remote interface at http://localhost:7474/

- npm run api
-- This is going to start the express API, currently in progress. Right now it gives you access to the database through the API and apollo, viewable at http://localhost:4000/. This lets you execute queries and mutations on the database based off of the schema
-- TODO: The OGM is added, but not yet implemented. This will allow you to interact with the database through the API in a more object-oriented way
--- The current example of this is at /users where there is a restful endpoint to access the data, but there is also a sandbox at http://localhost:4000/, where you can execute queries and mutations on the database based off of the schema