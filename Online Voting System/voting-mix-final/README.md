# Voting system backend

A concept for a nation-wide online voting system

## Contributing

  In order to contribute, follow the [GUIDE](./CONTRIBUTING.md)

## Installation

Requires:

- node v10.15.1 and npm - Running a newer version of node should work in theory, but it's not recommended
- mysql >=5.7.0 - MySQL server running on port 3306(default), having user **root** with an **empty password**
You can change the database connection parameters inside `knexfile.js`

Clone the repository, cd into the folder and using the terminal run

  `npm install`

followed by (**MAKE SURE THAT MYSQL IS RUNNING**)

  `npm run migrate`

Finally, run the app with

  `npm start`

The app should be running on localhost:8080

You can add a national admin by running `node add-national-admin.js`
(you must have run `npm run migrate` or `npm start` beforehand)

## Troubleshooting

If you get an error during `npm run migrate` or any error regarding "database xxxx doesn't exist"
**MAKE SURE YOUR MYSQL INSTANCE IS RUNNING** and the run `node ./knexdbcreate.js`
