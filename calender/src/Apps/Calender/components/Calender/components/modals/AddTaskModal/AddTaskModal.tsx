import React, { ChangeEvent, useState } from 'react';
import ModalDialog from '../../../../../../../components/Modals/ModalDialog';
import { MonthDataModel } from '../../../../../../../models/MonthDataModel';
import TasksService from '../../../../../../../services/TasksService';
import ReactLoader from 'react-loader';

type AddTaskProps = {
    day: number;
    month: number;
    year: number;
    onCancel?: () => void;
    onSave?: () => void;
};

const AddTaskModal: React.FC<AddTaskProps> = ({ onCancel, onSave, day, month, year }) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [formObject, setFormObject] = useState<MonthDataModel>({
        dayNumber: day,
        monthNumber: month,
        yearNumber: year,
        tasks: {
            shortDescription: '',
            description: '',
            importance: 0,
            place: '',
            time: '12:00'
        }
    });

    const [time, setTime] = useState<{ hours?: string; minutes?: string }>({ hours: '12', minutes: '00' });

    const handleShortDescription = (value: ChangeEvent<HTMLInputElement>) => {
        setFormObject((prevState) => ({
            ...prevState,
            tasks: {
                ...prevState.tasks,
                shortDescription: value.target.value
            }
        }));
    };

    const handleDescription = (value: ChangeEvent<HTMLTextAreaElement>) => {
        setFormObject((prevState) => ({
            ...prevState,
            tasks: {
                ...prevState.tasks,
                description: value.target.value
            }
        }));
    };

    const handlePlace = (value: ChangeEvent<HTMLInputElement>) => {
        setFormObject((prevState) => ({
            ...prevState,
            tasks: {
                ...prevState.tasks,
                place: value.target.value
            }
        }));
    };

    const handleHours = (value: ChangeEvent<HTMLInputElement>) => {
        setTime((prevState) => ({ ...prevState, hours: value.target.value }));
    };

    const handleMinutes = (value: ChangeEvent<HTMLInputElement>) => {
        setTime((prevState) => ({ ...prevState, minutes: value.target.value }));
    };

    const handleImportance = (value: ChangeEvent<HTMLInputElement>) => {
        setFormObject((prevState) => ({
            ...prevState,
            tasks: {
                ...prevState.tasks,
                importance: value.target.value as unknown as number
            }
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        const data: MonthDataModel = { ...formObject };
        if (data.tasks?.time) {
            data.tasks.time = data.tasks?.time ? time.hours + ':' + time.minutes : '12:00';
        }

        TasksService.addTask(data)
            .then(() => {
                // FIXME should be replaced with notification
                console.log('Task added');
            })
            .catch((error) => {
                // FIXME should be replaced with notification
                console.log(error);
            })
            .finally(() => {
                setIsSaving(false);
                onSave && onSave();
            });
    };

    return isSaving ? (
        <ReactLoader loaded={!isSaving} className="react-spinner-loader-swing" />
    ) : (
        <ModalDialog header="Create new task" onCancel={onCancel} onSubmit={handleSave} submitText="Create">
            <div className="lnc-add-task">
                <div className="lnp-input-field">
                    <span>Short description:</span>
                    <input placeholder="Enter up to 15 characters..." onChange={handleShortDescription} />
                </div>
                <div className="lnp-input-field">
                    <span>Description:</span>
                    <textarea placeholder="Enter task description..." onChange={handleDescription} />
                </div>
                <div className="lnp-input-field">
                    <span>Place:</span>
                    <input placeholder="Enter task place(optional)..." onChange={handlePlace} />
                </div>
                <div className="lnp-input-field lnm-time">
                    <span>Time:</span>
                    <input
                        type="number"
                        min={0}
                        max={23}
                        className="lnm-hours"
                        placeholder="12"
                        onChange={handleHours}
                    />
                    <span className="lnm-separator">:</span>
                    <input
                        type="number"
                        min={0}
                        max={59}
                        className="lnm-minutes"
                        placeholder="00"
                        onChange={handleMinutes}
                    />
                </div>
                <div className="lnp-input-field">
                    <span>Importance:</span>
                    <input
                        type="number"
                        min={1}
                        max={30}
                        placeholder="How important is this task..."
                        onChange={handleImportance}
                    />
                </div>
            </div>
        </ModalDialog>
    );
};

export default AddTaskModal;
