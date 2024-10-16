import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/elementos/navbar';
import { ProgressBar } from '@/components/elementos/progressBar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function Pay() {
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        const fetchPaymentData = async () => {
            const simulatedData = {
                plan: 'Plan Mensual',
                price: '$9.99',
                nextPaymentDate: '15 de Octubre de 2024',
                paymentMethod: 'Tarjeta de Crédito',
                billingCycle: 'Cada mes'
            };

            const simulatedHistory = [
                { month: 'Septiembre 2024', amount: '$9.99', date: '15 de Septiembre de 2024', method: 'Tarjeta de Crédito' },
                { month: 'Agosto 2024', amount: '$9.99', date: '15 de Agosto de 2024', method: 'Tarjeta de Crédito' },
                { month: 'Julio 2024', amount: '$9.99', date: '15 de Julio de 2024', method: 'Tarjeta de Crédito' },
                { month: 'Junio 2024', amount: '$9.99', date: '15 de Junio de 2024', method: 'Tarjeta de Crédito' },
            ];

            setTimeout(() => {
                setPaymentData(simulatedData);
                setPaymentHistory(simulatedHistory);
            }, 1000);
        };

        fetchPaymentData();
    }, []);

    if (!paymentData) {
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] flex flex-col justify-center items-center">
                <ProgressBar />
                <h1 className='text-3xl font-bold text-center'>Cargando información de pago...</h1>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className='px-20 mt-4'>
                <h1 className='text-3xl font-bold'>Detalles de Pago</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Información de Suscripción</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='mt-2'>Plan: <b>{paymentData.plan}</b></p>
                            <p className='mt-2'>Precio: <b>{paymentData.price}</b></p>
                            <p className='mt-2'>Próxima Fecha de Pago: <b>{paymentData.nextPaymentDate}</b></p>
                            <p className='mt-2'>Método de Pago: <b>{paymentData.paymentMethod}</b></p>
                            <p className='mt-2'>Ciclo de Facturación: <b>{paymentData.billingCycle}</b></p>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={() => navigate('/edit-payment')}>Editar Información de Pago</Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="mt-8">
                    <h2 className='text-2xl font-bold'>Historial de Pagos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                        {paymentHistory.map((payment, index) => (
                            <Card key={index} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{payment.month}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='mt-2'>Monto: <b>{payment.amount}</b></p>
                                    <p className='mt-2'>Fecha de Pago: <b>{payment.date}</b></p>
                                    <p className='mt-2'>Método de Pago: <b>{payment.method}</b></p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
