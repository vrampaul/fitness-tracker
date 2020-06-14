//distance traveled
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now(),
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Exercise Type is Required",
            },
            name: {
                type: String,
                trim: true,
                required: "Exercise Name is Required",
            },
            duration: {
                type: Number,
                trim: true,
            },
            weight: {
                type: Number,
                trim: true,
            },
            reps: {
                type: Number,
                trim: true,
            },
            sets: {
                type: Number,
                trim: true,
            },
            distance: {
                type: Number,
                trim: true,
            },
        },
    ],
    totalDuration: {
        type: Number,
    },
});

WorkoutSchema.methods.setTotalDuration = function () {
    let total = 0;
    console.log("Help!");
    this.exercises.forEach((exercise) => {
        total += exercise.duration;
    });
    this.totalDuration = total;
    console.log(this.totalDuration);
    return this.totalDuration;
};

WorkoutSchema.methods.addExercise = function (exercise) {
    this.exercises.push(exercise);
    this.setTotalDuration();
    return this.save();
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
