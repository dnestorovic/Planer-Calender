import BaseService from "./BaseService";
import {MonthDataModel} from "../models/MonthDataModel";

interface ITasks {
    getTasksFormMonth: (month: number) => Promise<MonthDataModel[]>;
}

const TasksService: () => ITasks = () => {
    const baseUrl = 'http://localhost:8001/months/';

    const getTasksFormMonth = (month: number) => {
        return BaseService.get(baseUrl + 'allTasks/' + month);
    }

    return {getTasksFormMonth}
}

export default TasksService();
