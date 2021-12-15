import React from 'react';
import useState from "react-hook-use-state";
import {useMount} from "react-use";
import Banner from "./components/Banner/Banner";
import Calender from "./components/Calender/Calender";

const CalenderOverview = () => {
    const [showBanner, setShowBanner] = useState<boolean>(false);

    // FIXME turn on banner after development
    useMount(() => {
        setShowBanner(false);
        setTimeout(() => {
            setShowBanner(false);
        }, 14000);
    });

    return showBanner ? <Banner /> : <Calender />;
};

export default CalenderOverview;
