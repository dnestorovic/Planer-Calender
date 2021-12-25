import React from 'react';
import ModalDialog from '../../../../../../../components/Modals/ModalDialog';
import { MonthDataModel } from '../../../../../../../models/MonthDataModel';
import TasksUtility from '../../../../../../../utilities/TasksUtility';

type ShowTasksModalProps = {
    tasks: MonthDataModel[];
    onClose: () => void;
};

const ShowTasksModal: React.FC<ShowTasksModalProps> = ({ tasks, onClose }) => {
    return (
        <ModalDialog readonly={true} header="Your daily tasks" onCancel={onClose}>
            <div className="ln-show-tasks">
                <ul className="ln-tasks-list">
                    {tasks.map((task, index) => (
                        <li key={index} className="lnp-task">
                            <header className={TasksUtility.calculatePriorityClass(task?.tasks?.importance || 10)}>
                                {task?.tasks?.shortDescription}
                            </header>
                            <p className="lnp-main">{task?.tasks?.description}</p>
                            <div className="lnp-footer">
                                <span>{task?.tasks?.place}</span>
                                <span>{task?.tasks?.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </ModalDialog>
    );
};

export default ShowTasksModal;
