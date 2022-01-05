import React from 'react';
import { Link } from 'react-router-dom';
import { faCalendarAlt, faChartPie, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActionsMenu = () => {
    return (
        <div className="ln-actions-menu">
            <ul>
                <li title="Login">
                    <Link to="/login">
                        <FontAwesomeIcon icon={faUsers} />
                    </Link>
                </li>
                <li title="Reports">
                    <Link to="/reports">
                        <FontAwesomeIcon icon={faChartPie} />
                    </Link>
                </li>
                <li title="Calender">
                    <Link to="/calender">
                        <FontAwesomeIcon icon={faCalendarAlt} />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ActionsMenu;
