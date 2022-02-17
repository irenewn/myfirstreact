import React from 'react';
import ListCourseComponent from './ListCourseComponent';
import CourseComponent from './CourseComponent';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default class InstructorApp extends React.Component {
    render(){
        return(
            <Router>
                <div className="jumbotron text-center">
                    <h1>Instructor Application</h1>
                    {/* switch are replace by routes */}
                    <Routes>
                        {/* component are replace by element */}
                        <Route path="/" exact element={<ListCourseComponent />} />
                        <Route path="/courses" exact element={<ListCourseComponent/>} />
                        <Route path="/courses/:id" strict element={<CourseComponent/>} />
                        <Route path="/courses/lala" element={<ListCourseComponent/>} />
                    </Routes>
                </div>
            </Router>
        )
    }
}