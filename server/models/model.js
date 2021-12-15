const mongoose = require('mongoose');

const monthsSchema = new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,

yearNumber: mongoose.Schema.Types.Number,
monthNumber: mongoose.Schema.Types.Number,
dayNumber: mongoose.Schema.Types.Number,
dayInMonth: mongoose.Schema.Types.Number,

tasks : [{
    taskId: mongoose.Schema.Types.ObjectId,
    shortDescription: mongoose.Schema.Types.String,
    description: mongoose.Schema.Types.String,
    importance : mongoose.Schema.Types.Number,
    place: mongoose.Schema.Types.String,
    time: mongoose.Schema.Types.String
}]

});

const Months = mongoose.model('Months', monthsSchema);

module.exports = {
    Months
};
