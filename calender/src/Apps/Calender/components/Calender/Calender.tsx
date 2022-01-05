import React from 'react';
import Navigation from '../../../../components/Navigation/Navigation';
import useState from 'react-hook-use-state';
import { useMount } from 'react-use';
import { getNextMonthNumber, getPreviousMonthNumber } from '../../../../utilities/DateTimeUtilities';
import CalenderTable from './components/CalenderTable/CalenderTable';
import OverviewPage from '../../../OverviewPage/OverviewPage';

const Calender = () => {
    const [currentMonth, setCurrentMonth] = useState<number>(0);

    const handlePrevious = () => {
        setCurrentMonth((previousState) => {
            return getPreviousMonthNumber(previousState);
        });
    };

    const handleNext = () => {
        setCurrentMonth((previousState) => {
            return getNextMonthNumber(previousState);
        });
    };

    useMount(() => {
        setCurrentMonth(new Date().getUTCMonth());
    });

    return (
        <OverviewPage>
            <div className="ln-calender">
                <Navigation
                    currentMonth={currentMonth}
                    rootClass="lnc-navigation"
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                />
                {/*FIXME year should not be fixed*/}
                <div className="lnp-content">
                    <CalenderTable monthNumber={currentMonth} yearNumber={2021} />
                </div>
            </div>
        </OverviewPage>
    );
};

export default Calender;
