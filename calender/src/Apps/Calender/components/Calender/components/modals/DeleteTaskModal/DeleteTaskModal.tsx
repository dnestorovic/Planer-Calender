import React, { useState } from 'react';
import ModalDialog from '../../../../../../../components/Modals/ModalDialog';
import ReactLoader from 'react-loader';
import TasksService from '../../../../../../../services/TasksService';

type DeleteTaskProps = {
    taskId: string;
    onCancel?: () => void;
    onDelete?: () => void;
};

const DeleteTaskModal: React.FC<DeleteTaskProps> = ({ onCancel, onDelete, taskId }) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDelete = () => {
        setIsDeleting(true);
        TasksService.deleteTask(taskId)
            .then(() => {
                // FIXME Replace with notifications once it is done
                console.log('Deleted');
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsDeleting(false);
                onDelete && onDelete();
            });
    };

    return isDeleting ? (
        <ReactLoader loaded={!isDeleting} className="react-spinner-loader-swing" />
    ) : (
        <ModalDialog header="Delete meeting?" onCancel={onCancel} onSubmit={handleDelete} submitText="Yes, delete">
            <p>Are you sure you want to delete this meeting?</p>
        </ModalDialog>
    );
};

export default DeleteTaskModal;
