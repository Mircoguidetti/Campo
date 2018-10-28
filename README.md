# Campo

This project demonstrates how to build a fictional full stack Javascript web application for reviewing Campgrounds.

## Get started

### 1. Download the example & install dependencies

Clone the repository with the following command:

```sh     
git clone git@github.com:Mircoguidetti/campo.git
```

Next, navigate into the downloaded folder and install the NPM dependencies:

```sh
cd campo
yarn install
```

### 2. Setup the database service

If you want to specifically run the app locally here are the steps: (Assuming you are going to have MongoDB installed you need to run these commands to open a connection with the database)

```sh
mkdir mongo-data
cd mongo/bin
./mongod --dbpath ~/mongo-data
```


### 3. Start the server

The `start` script starts the server (on `http://localhost:3000`)

```sh
npm start
```
