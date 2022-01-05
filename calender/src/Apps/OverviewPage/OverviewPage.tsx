import React from 'react';
import ActionsMenu from '../../components/Menu/ActionsMenu';

const OverviewPage: React.FC = ({ children }) => {
    return (
        <div className="ln-overview-page">
            <ActionsMenu />
            {children}
        </div>
    );
};

export default OverviewPage;
