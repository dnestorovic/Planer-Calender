const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const { Months } = require('./model');

module.exports.getById = async (req, res, next) =>{

    const id = req.params.id;
    try{
        const tasks = await Months.findById(id).exec();
        if(tasks === null){
            res.status(404).json();
        }

        res.status(200).json(tasks);
    }catch(error){
        next(error);
    }
}

module.exports.getAllTasks = async (req, res, next) =>{

    const monthNumber = req.params.monthNumber;
    try{
        const tasks = await Months.find({monthNumber: monthNumber}).exec();
        if(tasks === null){
            res.status(404).json();
        }

        res.status(200).json(tasks);
    }catch(error){
        next(error);
    }
}

module.exports.getByOrderNumber = async (req, res, next) =>{

    const dayInMonth = req.params.orderNumber;
    const monthNumber = req.params.monthNumber;
    const yearNumber = req.params.yearNumber;
    try{
        const tasks = await Months.find({dayNumber: dayInMonth, monthNumber: monthNumber,
             yearNumber: yearNumber}).exec();
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
        const newMonth = new Months({
            _id: new mongoose.Types.ObjectId(),
            yearNumber: yearNumber,
            monthNumber: monthNumber,
            dayNumber: dayNumber,
            tasks: tasks
        });
        
        
        await newMonth.save();
        res.status(201).json({'Message' : "New Task added"})
    }catch(error){
        next(error);
    }
}

module.exports.deleteByDate = async (req, res, next) =>{

    const id = req.params.id;
    try{
        await Months.deleteOne({_id: id});
        res.status(200).json();
    }catch(error){
        next(error);
    }
}


module.exports.updateTask = async (req, res, next) =>{

    const id = req.params.id;
    const {yearNumber, monthNumber, dayNumber, tasks} = req.body;
    try{
        await Months.updateOne({_id : id}, {$set: {dayNumber: dayNumber, monthNumber: monthNumber}});
        res.status(200).json();
    }catch(error){
        next(error);
    }
}
