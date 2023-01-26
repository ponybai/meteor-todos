import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react';
import { LoginWithGithub } from './LoginWithGithub';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    };

    return (
        <form onSubmit={submit} className="login-form">
            <LoginWithGithub/>
            <div>
                <label htmlFor='username'>Username</label>

                <input 
                    type="text"
                    placeholder='Username'
                    name='username'
                    required
                    onChange={e => setUsername(e.target.value)}
                    ></input>
            </div>

            <div>
                <label htmlFor='password'>Password</label>

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                ></input>
            </div>

            <div>
                <button type='submit'>Log In</button>
            </div>
        </form>
    );
}