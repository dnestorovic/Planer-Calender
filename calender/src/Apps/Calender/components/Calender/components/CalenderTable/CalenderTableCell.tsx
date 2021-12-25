import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faSort, faUserTie } from '@fortawesome/free-solid-svg-icons';
import TasksService from '../../../../../../services/TasksService';
import { MonthDataModel } from '../../../../../../models/MonthDataModel';
import Tag from '../../../../../../components/Tag/Tag';
import DateTimeUtilities from '../../../../../../utilities/DateTimeUtilities';
import { Droppable } from 'react-beautiful-dnd';
import { SortDirection } from '../../../../../../models/GlobalModels';
import ArrayUtility from '../../../../../../utilities/ArrayUtility';
import SortTasksModal from '../modals/SortTasksModal/SortTasksModal';
import AddTaskModal from '../modals/AddTaskModal/AddTaskModal';
import DeleteTaskModal from '../modals/DeleteTaskModal/DeleteTaskModal';
import ShowTasksModal from '../modals/ShowTasksModal/ShowTasksModal';

type CalenderCellProps = {
    isEmptyCell?: boolean;
    dayInMonth: number;
    month: number;
    year: number;
    selectedItem?: MonthDataModel | null;
};

enum TaskActions {
    Add,
    Edit,
    Delete,
    Sort,
    Show
}

const CalenderTableCell: React.FC<CalenderCellProps> = ({
    dayInMonth,
    month,
    year,
    isEmptyCell = false,
    selectedItem
}) => {
    const [dailyTasks, setDailyTasks] = useState<MonthDataModel[]>([]);
    const [taskAction, setTaskAction] = useState<{ action?: TaskActions | null; taskId?: string | null }>({
        action: null,
        taskId: null
    });

    const cancelModal = () => {
        setTaskAction({ action: null, taskId: null });
    };

    const refresh = () => {
        cancelModal();
        fetch();
    };

    const handleSort = (attribute: string, direction: SortDirection) => {
        setDailyTasks(ArrayUtility.sort(dailyTasks, direction, attribute));
        setTaskAction({ action: null, taskId: null });
    };

    const fetch = () => {
        if (!isEmptyCell && dayInMonth) {
            TasksService.getTaskForDay(dayInMonth, month, year)
                .then(setDailyTasks)
                .catch((error) => {
                    // Todo notification service should be done
                    console.log(error);
                });
        }
    };

    const addTask = () => {
        setTaskAction({ action: TaskActions.Add });
    };

    const deleteTask = (id: string) => {
        setTaskAction({ action: TaskActions.Delete, taskId: id });
    };

    const sortTasks = () => {
        setTaskAction({ action: TaskActions.Sort });
    };

    const showTasks = () => {
        setTaskAction({ action: TaskActions.Show });
    };

    const renderTasks = () => {
        return dailyTasks.map((task, index) => (
            <Tag
                key={index}
                tagContent={task?.tasks?.shortDescription || ''}
                tagId={task._id || ''}
                priority={task?.tasks?.importance || 1}
                onTagClose={deleteTask}
            />
        ));
    };

    useEffect(() => {
        fetch();
    }, [dayInMonth, selectedItem]);

    return !isEmptyCell ? (
        <div className="lnp-data-cell">
            <div className="lnp-cell-header">
                <span>{DateTimeUtilities.createDateString(dayInMonth, month, year)}</span>
            </div>
            <Droppable droppableId={dayInMonth.toString()}>
                {(provided) => {
                    return (
                        <div className="lnp-cell-main" {...provided.droppableProps} ref={provided.innerRef}>
                            {renderTasks()}
                        </div>
                    );
                }}
            </Droppable>
            <div className="lnp-cell-footer">
                <button className={'lnm-meeting-icon'}>
                    <FontAwesomeIcon icon={faUserTie} onClick={showTasks} />
                </button>
                <button className={'lnm-sort-icon'} onClick={sortTasks}>
                    <FontAwesomeIcon icon={faSort} />
                </button>
                <button className={'lnm-add-icon'} onClick={addTask}>
                    <FontAwesomeIcon icon={faCalendarPlus} />
                </button>
            </div>
            {taskAction?.action === TaskActions.Delete && (
                <DeleteTaskModal taskId={taskAction?.taskId || ''} onCancel={cancelModal} onDelete={refresh} />
            )}
            {taskAction?.action === TaskActions.Add && (
                <AddTaskModal day={dayInMonth} month={month} year={year} onCancel={cancelModal} onSave={refresh} />
            )}
            {taskAction?.action === TaskActions.Sort && <SortTasksModal onSort={handleSort} onCancel={cancelModal} />}
            {taskAction?.action === TaskActions.Show && <ShowTasksModal tasks={dailyTasks} onClose={cancelModal} />}
        </div>
    ) : null;
};

export default CalenderTableCell;
