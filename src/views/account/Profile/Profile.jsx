import { useState, useEffect } from 'react';
import { ProgressCircle } from '@/components/elements/progressCircle';
import { ScrollArea } from "@/components/ui/scroll-area"
import { AccountForm } from './AccountForm';
import { InformationForm } from './InformationForm';
import { SettingsForm } from './SettingsForm';
import { RecommendedCourses } from './RecommendedCourses';

const SERVER = import.meta.env.VITE_API_URL;

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchUserData(user.email);
        fetchRecommendedCourses();
    }, []);

    const fetchUserData = async (userEmail) => {
        setLoading(true);
        try {
            const response = await fetch(`${SERVER}/users/getUser?email=${encodeURIComponent(userEmail)}`);
            const data = await response.json();
            setUserData(data.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecommendedCourses = async () => {
        try {
            const response = await fetch(`${SERVER}/Courses/getRecomendedCourses`);
            const data = await response.json();
            setRecommendedCourses(data.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {loading && 
                <div className='bg-black bg-opacity-30 fixed inset-0 flex justify-center items-center'>
                    <div className='flex w-32 items-center'>
                        <h1 className="text-xl font-bold text-center">Cargando</h1>
                        <ProgressCircle />
                    </div>
                </div>
            }
            {userData && (
                <div className="flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-4 h-[550px] w-full">
                    <div className='h-full w-full md:w-8/12'>
                        <h2 className="scroll-m-20 border-b pb-2 text-center sm:text-left text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">Perfil</h2>
                        <ScrollArea className='h-full border-b'>
                            <AccountForm userData={userData} setUserData={setUserData} />
                            <InformationForm userData={userData} setUserData={setUserData} />
                            <SettingsForm />
                        </ScrollArea>
                    </div>
                    <RecommendedCourses recommendedCourses={recommendedCourses} />
                </div>
            )}
        </>
    );
}
