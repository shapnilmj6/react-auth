import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(googleProvider).then(function (result) {
            const { displayName, email } = result.user;
            const signInUser = { name: displayName, email }
            setLoggedInUser(signInUser);
            history.replace(from);
        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
    const handleFacebookSignIn = () => {

        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
            .then((result) => {
                var user = result.user;
                setLoggedInUser(user)
            })
    }


    const is_valid_email = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email);
    const hasNumber = input => /\d/.test(input);

    const switchForm = e => {
        const createdUser = { ...user };
        createdUser.existingUser = e.target.checked;
        setUser(createdUser);
    }
    const handleChange = e => {
        const newUserInfo = {
            ...user
        };
        //debugger;
        // perform validation
        let isValid = true;
        if (e.target.name === 'email') {
            isValid = is_valid_email(e.target.value);
        }
        if (e.target.name === "password") {
            isValid = e.target.value.length > 8 && hasNumber(e.target.value);
        }

        newUserInfo[e.target.name] = e.target.value;
        newUserInfo.isValid = isValid;
        setUser(newUserInfo);
    }
    const createAccount = (event) => {
        if (user.isValid) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res);
                    const createdUser = { ...user };
                    createdUser.isSignedIn = true;
                    createdUser.error = '';
                    setUser(createdUser);
                })
                .catch(err => {
                    console.log(err.message);
                    const createdUser = { ...user };
                    createdUser.isSignedIn = false;
                    createdUser.error = err.message;
                    setUser(createdUser);
                })
        }
        event.preventDefault();
        event.target.reset();
    }

    const signInUser = event => {
        if (user.isValid) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res);
                    const createdUser = { ...user };
                    createdUser.isSignedIn = true;
                    createdUser.error = '';
                    setUser(createdUser);
                })
                .catch(err => {
                    console.log(err.message);
                    const createdUser = { ...user };
                    createdUser.isSignedIn = false;
                    createdUser.error = err.message;
                    setUser(createdUser);
                })
        }
        event.preventDefault();
        event.target.reset();
    }


    return (
        <div className="App">
            {
                user.isSignedIn && <div>
                    <p> Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt=""></img>
                </div>
            }
            <h1>Our own Authentication</h1>
            <input type="checkbox" name="switchForm" onChange={switchForm} id="switchForm" />
            <label htmlFor="switchForm"> Returning User</label>
            <form style={{ display: user.existingUser ? 'block' : 'none' }} onSubmit={signInUser}>
                <input type="text" onBlur={handleChange} name="email" placeholder="Your Email" required />
                <br />
                <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" required />
                <br />
                <input type="submit" value="SignIn" />
            </form>
            <form style={{ display: user.existingUser ? 'none' : 'block' }} onSubmit={createAccount}>
                <input type="text" onBlur={handleChange} name="name" placeholder="Your Name" required />
                <br />
                <input type="text" onBlur={handleChange} name="email" placeholder="Your Email" required />
                <br />
                <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" required />
                <br />
                <input type="submit" value="Create Account" />
            </form>
            {
                user.error && <p style={{ color: 'red' }}>{user.error}</p>
            }



            <button onClick={handleGoogleSignIn}>Google sign in</button>
            <br />
            <button onClick={handleFacebookSignIn}>Facebook sign in</button>
            <h1>FbUser: {loggedInUser.displayName}</h1>
        </div>

    );
};

export default Login;