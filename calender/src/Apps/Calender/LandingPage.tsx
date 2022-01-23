import React from 'react';
import useState from 'react-hook-use-state';
import { useMount } from 'react-use';
import Banner from './components/Banner/Banner';
import Login from '../Login/Login';

const LandingPage = () => {
    const [showBanner, setShowBanner] = useState<boolean>(false);

    useMount(() => {
        setShowBanner(true);
        setTimeout(() => {
            setShowBanner(false);
        }, 14050);
    });

    return showBanner ? <Banner /> : <Login />;
};

export default LandingPage;
