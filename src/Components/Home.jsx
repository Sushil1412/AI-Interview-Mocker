import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import AddNewInterview from './AddNewInterview';
import InterviewList from './InterviewList';
const Home = () => {
    return (
        <>
            <div className='homContainer'>
                <h2 className='heading'> Dahsboard</h2>
                <h2 className='desc'>Create and Start your AI mockup Interview</h2>
                <AddNewInterview />
                <InterviewList />


            </div>

        </>
    )
}

export default Home
