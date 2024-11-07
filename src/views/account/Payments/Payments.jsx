import { useState, useEffect } from 'react';
import { ProgressCircle } from '@/components/elements/progressCircle';
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaymentData } from './PaymentData';
import { Subscription } from './Subscription';
import { PaymentMethod } from './PaymentMethod';
import { PaymentHistory } from './PaymentHistory';

const SERVER = import.meta.env.VITE_API_URL;

export default function Payments() {
    const suscriptionData = {
        description: "Suscripción Mensual",
        amount: 12.09,
        currency: "MXN",
        billingCycle: "Mensual",
        renewalType: "Manual",
        benefits: [
            "Acceso todos los cursos",
            "Soporte prioritario",
            "Actualizaciones mensuales"
        ],
        renewalInfo: "Renueva tu suscripción manualmente cada mes para seguir disfrutando de los beneficios.",
        callToAction: "Suscribete ahora",
        terms: "Cancelación en cualquier momento"
    };    
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchPaymentData = async (userEmail) => {
            try {
                const response = await fetch(`${SERVER}/payments/getPaymentsByStudent?email=${encodeURIComponent(userEmail)}`);
                const data = await response.json();
                setPaymentHistory(data.data);
                // Seleccionar el pago actual si existe
                const currentPayment = data.data.find(payment => payment.is_current === 1);
                setSelectedPayment(currentPayment);
            } catch (error) {
                console.error("Error al obtener datos de pago:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPaymentData(user.email);
    }, []);

    const isCloseToExpiration = (expirationDate) => {
        const today = new Date();
        const expiration = new Date(expirationDate);
        const differenceInDays = (expiration - today) / (1000 * 60 * 60 * 24);
        return differenceInDays <= 5;
    };

    return (
        <>
            {loading && (
                <div className='bg-black bg-opacity-30 fixed inset-0 flex justify-center items-center'>
                    <div className='flex flex-col items-center'>
                        <h1 className="text-xl font-bold text-center">Cargando</h1>
                        <ProgressCircle />
                    </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-4 h-[550px] w-full">
                {/* Sección de Detalles de Pago */}
                <div className='h-full w-full md:w-8/12'>
                    <h2 className="scroll-m-20 border-b pb-2 text-center sm:text-left text-2xl sm:text-3xl font-semibold tracking-tight">Detalles de Pago</h2>
                    <ScrollArea className='h-full border-b'>
                        <div className='flex gap-2'>
                            {/* Mostrar PaymentData y PaymentMethod según las condiciones */}
                            {paymentHistory.length > 0 ? (
                                <>
                                    {selectedPayment && <PaymentData paymentData={selectedPayment} />}
                                    {/* Mostrar PaymentMethod si el pago está a punto de expirar */}
                                    {selectedPayment && isCloseToExpiration(selectedPayment.end_date) && <PaymentMethod />}
                                </>
                            ) : (
                                <>
                                    <Subscription subscription={suscriptionData} />
                                    <PaymentMethod />
                                </>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Sección de Historial de Pagos */}
                {paymentHistory.length > 0 && (
                    <PaymentHistory paymentHistory={paymentHistory} setSelectedPayment={setSelectedPayment} />
                )}
            </div>
        </>
    );
}
