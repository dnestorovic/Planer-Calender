import React from 'react';
import useState from 'react-hook-use-state';
import { useMount } from 'react-use';
import Banner from './components/Banner/Banner';
import Login from './components/Login/Login';

const LandingPage = () => {
    const [showBanner, setShowBanner] = useState<boolean>(false);

    // FIXME turn on banner after development
    useMount(() => {
        setShowBanner(true);
        setTimeout(() => {
            setShowBanner(false);
        }, 14050);
    });

    return showBanner ? <Banner /> : <Login />;
};

export default LandingPage;
