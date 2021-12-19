import React, { useEffect, useRef, useState } from 'react';import DateTimeUtilities from '../../../../../../utilities/DateTimeUtilities';import CalenderTableCell from './CalenderTableCell';import { DragDropContext, DropResult } from 'react-beautiful-dnd';import TasksService from '../../../../../../services/TasksService';import { MonthDataModel } from '../../../../../../models/MonthDataModel';import ReactLoader from 'react-loader';type CalenderTableProps = {    monthNumber: number;    yearNumber: number;    rootClass?: string;};const CalenderTable: React.FC<CalenderTableProps> = ({ rootClass = '', monthNumber, yearNumber }) => {    const [monthInterval, setStartingDayOfMonth] = useState<{ start: number; end: number }>({        start: 0,        end: 0    });    const [selectedItem, setSelectedItem] = useState<MonthDataModel | null>(null);    const [isLoading, setIsLoading] = useState(false);    const daysInWeek = useRef<number[]>([        ...Array(7)            .fill(1, 0, 7)            .map((el, index) => index)    ]);    const weeksInMonth = useRef<number[]>([        ...Array(5)            .fill(1, 0, 5)            .map((el, index) => index)    ]);    const getStart = () => {        return DateTimeUtilities.getStartingDayOfMonth(monthNumber, yearNumber);    };    const getEnd = () => {        return DateTimeUtilities.getEndingDayOfMonth(monthNumber, yearNumber);    };    // Todo refactor extract functions    const handleDrop = (result: DropResult) => {        setIsLoading(true);        TasksService.getById(result.draggableId)            .then((data) => {                setSelectedItem(data);                const newData = { ...data };                newData.dayNumber = +(result.destination?.droppableId || 0);                TasksService.updateTask(newData, result.draggableId)                    .then(() => console.log('Updated'))                    .finally(() => {                        setTimeout(() => {                            setIsLoading(false);                        }, 300);                    });            })            .finally(() => {                setTimeout(() => {                    setIsLoading(false);                }, 300);            });    };    useEffect(() => {        setStartingDayOfMonth({            start: getStart(),            end: getEnd()        });    }, [yearNumber, monthNumber]);    return isLoading ? (        <ReactLoader loaded={!isLoading} className="fa-spin" />    ) : (        <table className={[rootClass, 'ln-calender-table'].join(' ')}>            <tbody>                <DragDropContext onDragEnd={handleDrop}>                    {weeksInMonth.current.map((week) => {                        const days: any[] = [];                        daysInWeek.current.forEach((day) => {                            if ((week === 0 && day < monthInterval.start) || (week === 4 && day > monthInterval.end)) {                                days.push(                                    <td key={week * 7 + day}>                                        <CalenderTableCell                                            dayInMonth={week * 7 + day - monthInterval.start + 1}                                            month={monthNumber}                                            year={yearNumber}                                            isEmptyCell={true}                                            selectedItem={selectedItem}                                        />                                    </td>                                );                            } else {                                days.push(                                    <td key={week * 7 + day}>                                        <CalenderTableCell                                            dayInMonth={week * 7 + day - monthInterval.start + 1}                                            month={monthNumber}                                            year={yearNumber}                                            selectedItem={selectedItem}                                        />                                    </td>                                );                            }                        });                        return <tr key={week}>{days}</tr>;                    })}                </DragDropContext>            </tbody>        </table>    );};export default CalenderTable;