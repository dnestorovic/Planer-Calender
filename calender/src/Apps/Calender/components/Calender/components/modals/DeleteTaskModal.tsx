import React from 'react';
import ModalDialog from '../../../../../../components/Modals/ModalDialog';

type DeleteTaskProps = {
    onCancel?: () => void;
    onDelete?: () => void;
};

const DeleteTaskModal: React.FC<DeleteTaskProps> = ({ onCancel, onDelete }) => {
    return <ModalDialog header="Delete meeting?" onCancel={onCancel} onSubmit={onDelete} />;
};

export default DeleteTaskModal;
