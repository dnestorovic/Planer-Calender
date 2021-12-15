import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronCircleLeft, faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
import DateTimeUtilities from "../../utilities/DateTimeUtilities";

type NavigationProps = {
    rootClass?: string;
    currentMonth: number;
    onPrevious: () => void;
    onNext: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ rootClass, onPrevious, onNext, currentMonth }) => {
    return (
        <div className={['ln-navigation', rootClass].join(' ')}>
            <button onClick={onPrevious}><FontAwesomeIcon icon={faChevronCircleLeft} /></button>
            <span className='lnp-month-label'>{DateTimeUtilities.getMonthFromNumber(currentMonth)}</span>
            <button onClick={onNext}><FontAwesomeIcon icon={faChevronCircleRight} /></button>
        </div>
    );
};

export default Navigation;
