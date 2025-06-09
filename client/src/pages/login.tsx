import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SocialLogin from "../components/auth/SocialLogin";
import LoginPass from "../components/auth/LoginPass";
import { RootStore } from '../utils/TypeScript';

export default function Login() {
    const { auth } = useSelector((state: RootStore) => state);
    const history = useHistory();
    useEffect(() => {
        if (auth.access_token) {
            let url = history.location.search.replace("?", "/");
            return history.push(url)
        }
    }, [auth.access_token, history]);
    const [sms, setSms] = useState(false);

    return (
        <div className="auth_page">
            <div className="auth_box">
                <h3 className="text-uppercase text-center mb-4">Login</h3>
                <SocialLogin />
                <LoginPass />
                <small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
                    <span className="col-6">
                        <Link to='/forgot_password'>
                            Forgot password?
                        </Link>
                    </span>

                    <span className="col-6 text-end" onClick={() => setSms(!sms)}>
                        {sms ? 'Sign in with password' : 'Sign in with SMS'}
                    </span>
                </small>
            </div>
        </div>
    )
}