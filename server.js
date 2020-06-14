const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.send(index.html);
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, data) => {
        // If statement to catch errors
        if (err) {
            res.send(err);
            // Display Data in JSON data format
        } else {
            res.json(data);
            //console.log(data);
        }
    });
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts/range", (req, res) => {
    const startDate = new Date().setDate(new Date().getDate() - 7);
    db.Workout.find({ day: { $gte: startDate } }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});
//get one workout by the id and push a new exercise into the exercises array
app.put("/api/workouts/:id", async (req, res) => {
    try {
        const currentWorkout = await db.Workout.findOne({
            _id: req.params.id,
        });

        const savedWorkout = await currentWorkout.addExercise(req.body);
        res.json(savedWorkout);
    } catch (err) {
        throw err;
    }
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body, (err, data) => {
        // If statement to catch errors
        //console.log(req.body);
        if (err) {
            res.send(err);
            // Display Data in JSON data format
        } else {
            res.json(data);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
