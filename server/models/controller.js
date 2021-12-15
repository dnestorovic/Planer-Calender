const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const { Months } = require('./model');


module.exports.getAllTasks = async (req, res, next) =>{

    try{
        const allTasks = await Months.find({}).exec() 
        res.status(200).json(allTasks);
    }catch(error){
        next(error);
    }
}

module.exports.getByOrderNumber = async (req, res, next) =>{

    const orderNumber = req.params.orderNumber;
    try{
        const tasks = await Months.findById({dayInMonth: orderNumber}).exec();
        if(tasks === null){
            res.status(404).json();
        }

        res.status(200).json(tasks);
    }catch(error){
        next(error);
    }

};

module.exports.addTask = async (req, res, next) => {

    const {yearNumber, monthNumber, dayNumber, dayInMonth, tasks} = req.body;

    try{
        tasksArray = [];
        tasks.forEach(element => {
            const newTask = {
                taskId: new mongoose.Types.ObjectId(),
                shortDescription: element.shortDescription,
                description: element.description,
                importance : element.importance,
                place: element.place,
                time: element.time
            };
            tasksArray.push(newTask);
        });
        
        const newMonth = new Months({
            _id: new mongoose.Types.ObjectId(),
            yearNumber: yearNumber,
            monthNumber: monthNumber,
            dayNumber: dayNumber,
            dayInMonth: dayInMonth,
            tasks: tasksArray
        });
        
        await newMonth.save();
        res.status(201).json({'Message' : "New Task added"})
    }catch(error){
        next(error);
    }



}