import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// this data is hardcoded because it is not real authentication, just mock page
const targetUsername = 'Admin';
const targetPassword = '123456';

type CredentialsType = { username?: string; password?: string };

const Login = () => {
    const navigation = useNavigate();
    const [credentials, setCredentials] = useState<CredentialsType>({});
    const [invalidInputMessage, setInvalidInputMessage] = useState<string>('');

    const handleInput = (value: string, prop: keyof CredentialsType) => {
        setCredentials((prev) => ({ ...prev, [prop]: value }));
    };

    const handleLogin = () => {
        if (!(credentials.username === targetUsername && credentials.password === targetPassword)) {
            setInvalidInputMessage('Invalid credentials');

            return;
        }

        navigation('/calender');
    };

    return (
        <div className="ln-login">
            <div className="lnp-login-image" />
            <div className="lnp-login-form">
                <h1>Welcome</h1>
                <p>Let’s start our journey by getting to know each other</p>
                <div className="lnp-form-field">
                    <label>Username:</label>
                    <input
                        value={credentials.username}
                        onChange={(event) => handleInput(event.currentTarget.value, 'username')}
                    />
                </div>
                <div className="lnp-form-field">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={(event) => handleInput(event.currentTarget.value, 'password')}
                    />
                </div>
                <p className="lnp-error-message">{invalidInputMessage}</p>
                <footer>
                    <button className="lnm-submit" onClick={handleLogin}>
                        <span>Submit</span>
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Login;
