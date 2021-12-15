import React from 'react';
import Navigation from "../../../../components/Navigation/Navigation";
import useState from "react-hook-use-state";
import {useMount} from "react-use";
import {getNextMonthNumber, getPreviousMonth, getPreviousMonthNumber} from "../../../../utilities/DateTimeUtilities";
import CalenderTable from "./components/CalenderTable";

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState<number>(0);

    const handlePrevious = () => {
        console.log(getPreviousMonth(currentMonth))
        setCurrentMonth(previousState => getPreviousMonthNumber(previousState))
    }

    const handleNext = () => {
        setCurrentMonth(previousState => getNextMonthNumber(previousState))
    }

    useMount(() => {
        const month: number = new Date().getUTCMonth();
        setCurrentMonth(month)
    });

    console.log(currentMonth)
    return (
        <div className='ln-calender'>
            <Navigation currentMonth={currentMonth} rootClass='lnc-navigation' onPrevious={handlePrevious} onNext={handleNext}/>
            <CalenderTable />
        </div>
    );
};

export default Calender;
