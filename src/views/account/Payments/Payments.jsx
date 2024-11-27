import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

import { PaymentData } from './PaymentData';
import { Subscription } from './Subscription';
import { PaymentMethod } from './PaymentMethod';
import { PaymentHistory } from './PaymentHistory';

const SERVER = import.meta.env.VITE_API_URL;

export default function Payments() {
    const suscriptionData = {
        description: "Suscripción Mensual",
        amount: 120.00,
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
        fetchPaymentData(user.email);
    }, []);
    
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

    const isCloseToExpiration = (expirationDate) => {
        const today = new Date();
        const expiration = new Date(expirationDate);
        const differenceInDays = (expiration - today) / (1000 * 60 * 60 * 24);
        return differenceInDays <= 5;
    };

    const handlePay = (status) => {
        fetchPaymentData(user.email);
        const messages = {
            completed: "Pago completado",
            approved: "Pago aprobado",
            pending: "Pago pendiente",
            failed: "Pago fallido",
            rejected: "Pago rechazado",
        };
        toast[status === "completed" || status === "approved" ? "success" : status === "pending" ? "info" : "error"](messages[status] || "Estado desconocido");
    };

    return (
        <>
            {loading && (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-4 h-full w-full">
    <div className='h-full w-full md:w-8/12'>
        <h2 className="scroll-m-20 border-b pb-2 text-center sm:text-left text-2xl sm:text-3xl font-semibold tracking-tight">Detalles de Pago</h2>
        <ScrollArea className='h-full border-b'>
            <div className='flex flex-col sm:flex-row gap-4'>
                {/* Mostrar PaymentData y PaymentMethod según las condiciones */}
                {paymentHistory.length > 0 ? (
                    <div className='flex flex-col sm:flex-row gap-4 w-full'>
                        {selectedPayment && <PaymentData paymentData={selectedPayment} className="w-full sm:w-1/2" />}
                        {/* Mostrar PaymentMethod si el pago está a punto de expirar */}
                        {selectedPayment && isCloseToExpiration(selectedPayment.end_date) && (
                            <PaymentMethod 
                                onPay={handlePay} 
                                suscription={suscriptionData} 
                                className="w-full sm:w-1/2" 
                            />
                        )}
                    </div>
                ) : (
                    <div className='flex flex-col sm:flex-row gap-4 w-full'>
                        <Subscription 
                            subscription={suscriptionData} 
                            className="w-full sm:w-1/2" 
                        />
                        <PaymentMethod 
                            onPay={handlePay} 
                            suscription={suscriptionData} 
                            className="w-full sm:w-1/2" 
                        />
                    </div>
                )}
            </div>
        </ScrollArea>
    </div>
    {paymentHistory.length > 0 && (
        <PaymentHistory 
            paymentHistory={paymentHistory} 
            setSelectedPayment={setSelectedPayment} 
        />
    )}
</div>
        </>
    );
}
