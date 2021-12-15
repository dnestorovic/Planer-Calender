import React, {useEffect} from 'react';
import Navigation from "../../../../components/Navigation/Navigation";
import useState from "react-hook-use-state";
import {useMount} from "react-use";
import {getNextMonthNumber, getPreviousMonthNumber} from "../../../../utilities/DateTimeUtilities";
import CalenderTable from "./components/CalenderTable/CalenderTable";
import {MonthDataModel} from "../../../../models/MonthDataModel";
import TasksService from "../../../../services/TasksService";

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState<number>(0);
    const [monthData, setMonthData] = useState<MonthDataModel[] | null>(null);

    const fetchMonthData = (month?: number) => {
        // TODO add loader
        TasksService.getTasksFormMonth(month || currentMonth).then((data) => {
            data ? setMonthData(data) : setMonthData(null);
        }).catch((error) => {
            setMonthData(null);
            console.log("Notifications service is yet to be implemented!");
        })
    }

    const handlePrevious = () => {
        setCurrentMonth(previousState => {
            const prevMonth = getPreviousMonthNumber(previousState);
            fetchMonthData(prevMonth);

            return prevMonth;
        })
    }

    const handleNext = () => {
        setCurrentMonth(previousState => {
            const nextMonth = getNextMonthNumber(previousState);
            fetchMonthData(nextMonth);

            return nextMonth;
        })
    }

    useMount(() => {
        const month: number = new Date().getUTCMonth();
        setCurrentMonth(month)
        fetchMonthData(month);
    });

    return (
        <div className='ln-calender'>
            <Navigation currentMonth={currentMonth} rootClass='lnc-navigation' onPrevious={handlePrevious} onNext={handleNext}/>
            <CalenderTable monthData={monthData}/>
        </div>
    );
};

export default Calender;
