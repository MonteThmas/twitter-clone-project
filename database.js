//The require("mongoose")call above returns a Singleton object.
// It means that the first time you call require("mongoose"), it
//is creating an instance of the Mongoose class and returning it.
//On subsequent call , it will return the same instance that was
// created and returned to you the first time

const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }


    connect() {
        mongoose.connect("mongodb+srv://admin:525504@twitterclonecluster.suebclb.mongodb.net/?retryWrites=true&w=majority&appName=TwitterCloneCluster")
        .then(() => {

            console.log("Database connection successful");
        })
        .catch((err) => {
            console.log("Database connection error" + err);
        })
    }
}

module.exports = new Database();