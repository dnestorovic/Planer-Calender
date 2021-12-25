const calculatePriorityClass = (priority: number) => {
    if (priority < 5) {
        return 'lnm-basic';
    } else if (priority >= 5 && priority < 10) {
        return 'lnm-recommended';
    } else if (priority >= 10 && priority < 15) {
        return 'lnm-important';
    } else {
        return 'lnm-very-important';
    }
};

const TaskUtility = { calculatePriorityClass };

export default TaskUtility;
