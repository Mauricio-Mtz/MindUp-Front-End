/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPaypal } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { toast } from "sonner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const SERVER = import.meta.env.VITE_API_URL;

export const PaymentMethod = ({ onPay, suscription }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [preferenceId, setPreferenceId] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const collectionStatus = queryParams.get('collection_status');

        if (onPay && collectionStatus) {
            onPay(collectionStatus.toLowerCase());
        }
    }, [onPay]);

    initMercadoPago('APP_USR-f9adb8d9-88c4-417a-b36e-60a256f4761e', { locale: "es-MX" });

    // Función para crear el pago en el backend (primer paso)
    const createOrder = async (amount, currency) => {
        try {
            const response = await fetch(`${SERVER}/payments/create-paypal-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, currency })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Error en la creación del pago");
            
            return result;
        } catch (error) {
            console.error("Error en la creación del pago:", error);
            throw error;
        }
    };

    // Función para ejecutar el pago en el backend (segundo paso)
    const capturePayment = async (orderId) => {
        try {
            const response = await fetch(`${SERVER}/payments/capture-paypal-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    orderId, 
                    studentEmail: user.email,
                    amount: suscription.amount // Usar el monto de la suscripción
                })
            });

            const result = await response.json();
            onPay(result.status.toLowerCase());
            if (!response.ok) throw new Error(result.message || "Error al ejecutar el pago");
        } catch (error) {
            console.error("Error al ejecutar el pago:", error);
        }
    };

    const createPreference = async () => {
        try {
            const response = await fetch(`${SERVER}/payments/create-mercadopago-preference`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentEmail: user.email,
                    items: [{
                        title: suscription.description, // Usar descripción de la suscripción
                        quantity: 1,
                        unit_price: suscription.amount // Usar monto de la suscripción
                    }]
                }),
            });
            const data = await response.json();
            setPreferenceId(data.id);
        } catch (error) {
            console.error('Error al crear el pago:', error);
        }
    };

    return (
        <div className="flex flex-col gap-4 mt-2 p-4 border rounded-lg shadow-lg mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-2">Método de Pago</h2>
            <div className="space-y-2">
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`rounded-lg border w-full ${paymentMethod === "paypal" ? "bg-accent" : ""}`}
                    >
                        <FaPaypal className="h-6 w-6" />
                        PayPal
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => { setPaymentMethod("mercadopago"); createPreference(); }}
                        className={`rounded-lg border w-full ${paymentMethod === "mercadopago" ? "bg-accent" : ""}`}
                    >
                        <CiCreditCard1 className="h-6 w-6" />Mercado Pago
                    </Button>
                </div>

                <div className="mt-4">
                    {isLoading && <p className="text-blue-500 text-center">Procesando pago...</p>}
                    {paymentMethod === "paypal" && (
                        <PayPalScriptProvider options={{
                            clientId: "Adg2w8GVLBfeD8yfOpHi_EVcEVhtJxDVtM4PH7Zj6nsePkUyzLSmFGr2VBp2yQh6-CmaggA3jjuOUhsj",
                            currency: suscription.currency // Usar moneda de la suscripción
                        }}>
                            <PayPalButtons 
                                style={{ shape: "rect", layout: "vertical" }}
                                createOrder={async () => {
                                    const { orderId } = await createOrder(suscription.amount, suscription.currency); // Usar valores de la suscripción
                                    return orderId;
                                }}
                                onApprove={async (data) => {
                                    setIsLoading(true);
                                    try {
                                        await capturePayment(data.orderID);
                                    } catch (error) {
                                        console.error("Error al ejecutar el pago:", error);
                                        toast.error("Error al crear el pago.");
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                                onError={(err) => {
                                    console.error("PayPal error:", err);
                                    toast.error("Error al crear el pago.");
                                }}
                            />
                        </PayPalScriptProvider>
                    )}

                    {paymentMethod === "mercadopago" && (
                        <Wallet initialization={{ 
                            preferenceId: preferenceId,
                            redirectMode: 'self'
                        }} />
                    )}
                </div>
            </div>
        </div>
    );
};
