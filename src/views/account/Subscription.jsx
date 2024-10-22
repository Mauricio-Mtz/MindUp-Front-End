import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/elements/navbar';
import { ProgressBar } from '@/components/elements/progressBar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function Sub() {
    const navigate = useNavigate();
    const [subscriptionData, setSubscriptionData] = useState(null);

    useEffect(() => {
        const fetchSubscriptionData = async () => {
            const simulatedData = {
                plan: 'Plan Mensual',
                price: '$9.99',
                nextPaymentDate: '15 de Octubre de 2024',
                billingCycle: 'Cada mes'
            };

            setTimeout(() => {
                setSubscriptionData(simulatedData);
            }, 1000);
        };

        fetchSubscriptionData();
    }, []);

    if (!subscriptionData) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] flex flex-col justify-center items-center">
                <ProgressBar />
                <h1 className='text-3xl font-bold text-center'>Cargando información de suscripción...</h1>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className='px-20 mt-4'>
                <h1 className='text-3xl font-bold'>Detalles de Suscripción</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Información de Suscripción</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='mt-2'>Plan: <b>{subscriptionData.plan}</b></p>
                            <p className='mt-2'>Precio: <b>{subscriptionData.price}</b></p>
                            <p className='mt-2'>Próxima Fecha de Pago: <b>{subscriptionData.nextPaymentDate}</b></p>
                            <p className='mt-2'>Ciclo de Facturación: <b>{subscriptionData.billingCycle}</b></p>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={() => navigate('/edit-subscription')}>Editar Información de Suscripción</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}
