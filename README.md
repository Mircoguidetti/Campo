# Campo

This project demonstrates how to build a fictional full stack Javascript web application for reviewing Campgrounds.

## Get started

### 1. Download the project & install dependencies

Clone the repository with the following command:

```    
> git clone git@github.com:Mircoguidetti/campo.git
```

Next, navigate into the downloaded folder and install the dependencies:

```
> cd campo
> npm install
```

### 2. Setup the database service

If you want to specifically run the app locally here are the steps: (Assuming you are going to have MongoDB installed you need to run these commands to open a connection with the database)

```
> mkdir mongo-data
> cd mongo/bin
> ./mongod --dbpath ~/mongo-data
```


### 3. Start the server

The `start` script starts the server (on `http://localhost:3000`)

```
> npm start
```
