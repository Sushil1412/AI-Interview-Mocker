import React, { useEffect, useState } from 'react';
import { Clerk } from '@clerk/clerk-js';
import webSecurityImage from '../assets/web-security.svg';
import './Dashboard.css';
import Header from './Header';
import Home from './Home';



// Load the publishable key from the environment
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if the key is present
if (!clerkPubKey) {
    throw new Error('Clerk Publishable Key is missing! Add it to your .env file.');
}

const clerk = new Clerk(clerkPubKey);

const Dashboard = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userButtonMounted, setUserButtonMounted] = useState(false);
    const [signInMounted, setSignInMounted] = useState(false);

    useEffect(() => {
        // Load Clerk when the component is mounted
        const loadClerk = async () => {
            await clerk.load();

            if (clerk.user) {
                // User is signed in
                setIsSignedIn(true);
                setUserButtonMounted(true);
            } else {
                // User is not signed in
                setIsSignedIn(false);
                setSignInMounted(true);
            }
        };

        loadClerk();
    }, []);

    useEffect(() => {
        // Mount UserButton only if the user is signed in
        if (userButtonMounted) {
            const userButtonDiv = document.getElementById('user-button');
            clerk.mountUserButton(userButtonDiv);
        }
    }, [userButtonMounted]);

    useEffect(() => {
        // Mount SignIn only if the user is not signed in
        if (signInMounted) {
            const signInDiv = document.getElementById('sign-in');
            clerk.mountSignIn(signInDiv);
        }
    }, [signInMounted]);

    if (isSignedIn) {
        // Render Dashboard when the user is signed in
        return (<>
            <Header />
            <div id="Dashboard">

                <Home />

            </div>
        </>
        );
    } else {
        // Render the SignIn page if the user is not signed in
        return (
            <div className="login-image">
                <img
                    src={webSecurityImage}
                    alt="Background"
                    className="login-pic"
                />

                <div id="sign-in">
                    {/* Sign-in content goes here */}
                </div>
            </div>

        );
    }
};

export default Dashboard;
