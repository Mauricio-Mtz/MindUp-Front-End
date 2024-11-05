import { Routes, Route } from "react-router-dom";
import Navbar from '../../components/elements/navbar';
import CourseList from './CourseList';
import Course from './Course';
import Module from './Module';

export default function MyCourses() {
    return (
        <>
            <Navbar />
            <div className='px-2 sm:px-5 lg:px-10 xl:px-20 py-4 flex flex-col gap-4'>
                <Routes>
                    <Route path="" element={<CourseList />} />
                    <Route path="course/:courseName" element={<Course />} />
                    <Route path="module/:moduleName" element={<Module />} />
                </Routes>
            </div>
        </>
    );
}
