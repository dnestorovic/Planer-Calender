export type Task = {
    taskId?: string;
    shortDescription?: string;
    description?: string;
    importance?: number;
    place?: string;
    time?: string;
};

export type MonthDataModel = {
    _id?: string;
    yearNumber?: number;
    monthNumber?: number;
    dayNumber?: number;
    tasks?: Task;
};
