import React, {useEffect, useState} from 'react';
import {MonthDataModel} from "../../../../../../models/MonthDataModel";
import DateTimeUtilities from "../../../../../../utilities/DateTimeUtilities";

type CalenderTableProps = {
    monthData: MonthDataModel[] | null;
    rootClass?: string;
}

const CalenderTable: React.FC<CalenderTableProps> = ({ rootClass, monthData }) => {

    const [startingDayOfMonth, setStartingDayOfMonth] = useState<number | null>(0);

    useEffect(() => {
        setStartingDayOfMonth(
            monthData && monthData[0] && DateTimeUtilities.getStartingDayOfMonth(monthData[0].monthNumber, monthData[0].yearNumber)
        )
    }, [monthData]);


    return monthData ? (
        <table className={[rootClass, 'ln-calender-table'].join(' ')}>
            <tbody>
            <tr><td>{startingDayOfMonth}</td></tr>
            </tbody>
        </table>
    ) : <div>No data available</div>;
};

export default CalenderTable;
