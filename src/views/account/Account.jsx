import { Routes, Route } from "react-router-dom";
import Navbar from '../../components/elements/navbar';
import Profile from './Profile/Profile';
import Payments from './Payments';
// import CourseList from './Subscription';

export default function Account() {
    return (
        <>
            <Navbar />
            <div className='px-2 sm:px-5 lg:px-10 xl:px-20 py-4 flex flex-col gap-4'>
                <Routes>
                    <Route path="" element={<Profile />} />
                    <Route path="payments" element={<Payments />} />
                </Routes>
            </div>
        </>
    );
}
