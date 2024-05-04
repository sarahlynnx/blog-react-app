import React, { useState, useContext } from 'react';
import { getApiUrl } from '../api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import './loginsignup.css';

import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
    const { login } = useContext(UserContext);

    const navigate = useNavigate();
    const [action, setAction] = useState('Login');

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

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const response = await fetch(getApiUrl('/api/auth/register'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Signup failed: ', errorData.message);
                return;
            }

            console.log('Signup successful!');
            navigate('/');
        } catch (error) {
            console.error('Signup failed: ', error.message);
            alert('An error occurred while signing up. Please try again later.');

        }
    };

    return (
        <div className='login-container'>
            <div className='login-header'>
                <div className='login-text'>{action}</div>
                <div className='login-underline'></div>
            </div>
            <form className='login-inputs' onSubmit={action === 'Login' ? handleLoginSubmit : handleSignupSubmit} >
                {action==='Login'? null : (
                <div className='login-input'>
                    <img src={user_icon} alt='' />
                    <input id='name' type='text' name='name' placeholder='Name' autoComplete='given-name' />
                </div>
                )}
                <div className='login-input'>
                    <img src={email_icon} alt='' />
                    <input id='email' type='email' name='email' placeholder='Email' autoComplete='email'/>
                </div>
                <div className='login-input'>
                    <img src={password_icon} alt='' />
                    <input id='password' type='password' name='password' placeholder='Password' autoComplete={action==='Login'?'current-password':'new-password'}/>
                </div>
                {action==='Sign Up'? null : (
                    <div className='login-forgot-password'>
                        Forgot Password? <span>Click Here!</span>
                    </div>
                )}
                <div className='login-submit-container'>
                    <button type='submit' className={action==='Login' ? 'login-submit gray' : 'login-submit'} onClick={()=>{setAction('Sign Up')}}>
                        Sign Up
                    </button>
                    <button type='submit' className={action==='Sign Up' ? 'login-submit gray' : 'login-submit'} onClick={()=>{setAction('Login')}}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginSignup;