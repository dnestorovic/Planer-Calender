import BaseService from './BaseService';
import { MonthDataModel } from '../models/MonthDataModel';

interface ITasks {
    getById: (id: string) => Promise<MonthDataModel>;
    getTasksForMonth: (month: number) => Promise<MonthDataModel[]>;
    getTaskForDay: (day: number, month: number, year: number) => Promise<MonthDataModel[]>;
    deleteTask: (id: string) => Promise<any>;
    addTask: (data: MonthDataModel) => Promise<any>;
    updateTask: (taskData: MonthDataModel, id: string) => Promise<any>;
}

const TasksService: () => ITasks = () => {
    const baseUrl = 'http://localhost:8001/months/';

    const getTasksForMonth = (month: number) => {
        return BaseService.get(baseUrl + 'allTasks/' + month);
    };

    const getTaskForDay = (dayInMonth: number, month: number, year: number) => {
        return BaseService.get(baseUrl + 'dailyTasks/' + dayInMonth + '/' + month + '/' + year);
    };

    const deleteTask = (id: string) => {
        return BaseService.delete(baseUrl + '/' + id);
    };

    const getById = (id: string) => {
        return BaseService.get(baseUrl + '/' + id);
    };

    const addTask = (taskData: MonthDataModel) => {
        return BaseService.post<MonthDataModel>(baseUrl, taskData);
    };

    const updateTask = (taskData: MonthDataModel, id: string) => {
        return BaseService.put(baseUrl + '/' + id, taskData);
    };

    return { getTasksForMonth, getTaskForDay, deleteTask, getById, addTask, updateTask };
};

export default TasksService();
