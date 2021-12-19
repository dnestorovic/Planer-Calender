import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faSort, faUserTie } from '@fortawesome/free-solid-svg-icons';
import TasksService from '../../../../../../services/TasksService';
import { MonthDataModel } from '../../../../../../models/MonthDataModel';
import Tag from '../../../../../../components/Tag/Tag';
import DateTimeUtilities from '../../../../../../utilities/DateTimeUtilities';
import { Droppable } from 'react-beautiful-dnd';
import DeleteTaskModal from '../modals/DeleteTaskModal';

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
    Sort
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

    const deleteTag = (id: string) => {
        setTaskAction({ action: TaskActions.Delete, taskId: id });
    };

    const renderTasks = () => {
        return dailyTasks.map((task, index) => (
            <Tag
                key={index}
                tagContent={task.tasks.shortDescription}
                tagId={task._id}
                priority={task.tasks.importance}
                onTagClose={deleteTag}
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
                    <FontAwesomeIcon icon={faUserTie} />
                </button>
                <button className={'lnm-sort-icon'}>
                    <FontAwesomeIcon icon={faSort} />
                </button>
                <button className={'lnm-add-icon'}>
                    <FontAwesomeIcon icon={faCalendarPlus} />
                </button>
            </div>
            {taskAction?.action === TaskActions.Delete ? (
                <DeleteTaskModal taskId={taskAction?.taskId || ''} onCancel={cancelModal} onDelete={refresh} />
            ) : null}
        </div>
    ) : (
        <div>EMPTY HERE</div>
    );
};

export default CalenderTableCell;
