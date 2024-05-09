import React, { useContext } from 'react';
import { getApiUrl } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import './login.css';

import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const Login = () => {
    const { login } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const response = await fetch(getApiUrl('/api/auth/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed: ', errorData.message);
                return;
        }
        const {user, token} = await response.json();
        login(user);
        localStorage.setItem('token', token); 
        console.log('Login successful!');
        navigate('/');
        } catch (error) {
            console.error('Login failed: ', error.message);
            alert('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <div className='login-container'>
            <div className='login-header'>
                <div className='login-text'>Log In</div>
                <div className='login-underline'></div>
                <Link to={'/signup'}>Not yet signed up? Sign Up</Link>
            </div>
            <form className='login-inputs' onSubmit={handleLoginSubmit} >
                <div className='login-input'>
                    <img src={email_icon} alt='email-icon' />
                    <input id='email' type='email' name='email' placeholder='Email' autoComplete='email'/>
                </div>
                <div className='login-input'>
                    <img src={password_icon} alt='password-icon' />
                    <input id='password' type='password' name='password' placeholder='Password' autoComplete='current-password' />
                </div>
                <div className='login-forgot-password'>
                    Forgot Password? <span>Click Here!</span>
                </div>
                <div className='login-submit-container'>
                    <button type='submit' className='login-submit'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;