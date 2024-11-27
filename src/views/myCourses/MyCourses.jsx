import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from '../../components/elements/navbar';
import CourseList from './CourseList';
import Course from "./Course/Course";
import Module from './Module/Module';
import { useToast } from "@/hooks/use-toast";

const SERVER = import.meta.env.VITE_API_URL;

export default function MyCourses() {
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const checkSubscriptionStatus = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    setSubscriptionStatus('unauthenticated');
                    setIsLoading(false);
                    return;
                }

                const response = await fetch(`${SERVER}/payments/getSubscriptionStatusByStudent?email=${user.email}`);
                const result = await response.json();

                if (result.success) {
                    setSubscriptionStatus('active');
                } else {
                    setSubscriptionStatus('inactive');
                    toast({
                        variant: "destructive",
                        description: result.message || "Su suscripción no está activa."
                    });
                }
            } catch (error) {
                console.error('Error checking subscription status:', error);
                setSubscriptionStatus('error');
                toast({
                    variant: "destructive",
                    description: "No se pudo verificar el estado de su suscripción."
                });
            } finally {
                setIsLoading(false);
            }
        };

        checkSubscriptionStatus();
    }, [toast]);

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Redirect logic based on subscription status
    if (subscriptionStatus !== 'active') {
        return <Navigate to="/pricing" replace />;
    }

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