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

type FormErrorType = {
    shortDescription?: string;
    description?: string;
    place?: string;
};

const AddTaskModal: React.FC<AddTaskProps> = ({ onCancel, onSave, day, month, year }) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [errorObject, setErrorObject] = useState<FormErrorType>({});
    const [formObject, setFormObject] = useState<MonthDataModel>({
        dayNumber: day,
        monthNumber: month,
        yearNumber: year,
        tasks: {
            shortDescription: '',
            description: '',
            importance: 1,
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

    const handleImportance = (value: ChangeEvent<HTMLSelectElement>) => {
        setFormObject((prevState) => ({
            ...prevState,
            tasks: {
                ...prevState.tasks,
                importance: value?.target?.value as any as number
            }
        }));
    };

    const isInvalidForm = (): boolean => {
        const errors: FormErrorType = {};
        const mandatoryMessage = 'This field is mandatory';

        if (!formObject?.tasks?.shortDescription) {
            errors.shortDescription = mandatoryMessage;
        }

        if (!formObject?.tasks?.description) {
            errors.description = mandatoryMessage;
        }

        if (!formObject?.tasks?.place) {
            errors.place = mandatoryMessage;
        }

        setErrorObject(errors);

        return Object.values(errors).includes(mandatoryMessage);
    };

    const handleSave = () => {
        if (isInvalidForm()) {
            return;
        }

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
                    <div className="lnp-field">
                        <input placeholder="Enter up to 15 characters..." onChange={handleShortDescription} />
                        <span className="lnm-error-message">{errorObject?.shortDescription}</span>
                    </div>
                </div>
                <div className="lnp-input-field">
                    <span>Description:</span>
                    <div className="lnp-field">
                        <textarea placeholder="Enter task description..." onChange={handleDescription} />
                        <span className="lnm-error-message">{errorObject?.description}</span>
                    </div>
                </div>
                <div className="lnp-input-field">
                    <span>Place:</span>
                    <div className="lnp-field">
                        <input placeholder="Enter task place(optional)..." onChange={handlePlace} />
                        <span className="lnm-error-message">{errorObject?.place}</span>
                    </div>
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
                    <select onChange={handleImportance} defaultValue={1}>
                        <option value={1}>Low</option>
                        <option value={6}>Medium</option>
                        <option value={11}>High</option>
                        <option value={16}>Very High</option>
                    </select>
                </div>
            </div>
        </ModalDialog>
    );
};

export default AddTaskModal;
