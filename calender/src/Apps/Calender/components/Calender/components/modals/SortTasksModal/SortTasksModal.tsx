import React, { useState } from 'react';
import { SortDirection } from '../../../../../../../models/GlobalModels';
import ModalDialog from '../../../../../../../components/Modals/ModalDialog';

type SortTasksModalProps = {
    onSort: (attribute: string, direction: SortDirection) => void;
    onCancel: () => void;
};

const sortingOptions = [
    { value: 'importance', label: 'Importance' },
    { value: 'time', label: 'Time' },
    { value: 'place', label: 'Place' }
];

const sortBy = [
    { value: SortDirection.ASC, label: 'Ascending' },
    { value: SortDirection.DESC, label: 'Descending' }
];

const SortTasksModal: React.FC<SortTasksModalProps> = ({ onSort, onCancel }) => {
    const [sortAttribute, setSortAttribute] = useState<string>(sortingOptions[0].value);
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASC);

    const handleSave = () => {
        onSort(sortAttribute, sortDirection);
    };

    return (
        <ModalDialog header="Sort tasks" onCancel={onCancel} onSubmit={handleSave} submitText="Sort">
            <div className="ln-sort-tasks">
                <div className="lnp-input-field">
                    <span>Sort by:</span>
                    <select
                        className="lnp-select"
                        defaultValue={sortAttribute}
                        onChange={(value) => {
                            setSortAttribute(value?.currentTarget?.value);
                        }}>
                        {sortingOptions.map((option, index) => (
                            <option value={option.value} key={index}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="lnp-input-field">
                    <span>Sort direction:</span>
                    <select
                        className="lnp-select"
                        defaultValue={sortDirection}
                        onChange={(value) => setSortDirection(value?.currentTarget?.value as SortDirection)}>
                        {sortBy.map((option, index) => (
                            <option value={option.value} key={index}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </ModalDialog>
    );
};

export default SortTasksModal;
