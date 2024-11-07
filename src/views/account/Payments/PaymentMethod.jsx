import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPaypal } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

initMercadoPago('TEST-22df8501-a229-4429-bde9-893b75d4ff48');

export const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState(null);

    const handlePaymentSubmit = async (paymentData) => {
        try {
            const response = await fetch('/api/payments/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            });
            const result = await response.json();
            console.log("Resultado del pago:", result);
        } catch (error) {
            console.error("Error al procesar el pago:", error);
        }
    };

    return (
        <div className="flex flex-col gap-4 mt-2 p-4 border rounded-lg shadow-lg mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-2">Metodo de pago</h2>
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
                        onClick={() => setPaymentMethod("mercadopago")}
                        className={`rounded-lg border w-full ${paymentMethod === "mercadopago" ? "bg-accent" : ""}`}
                    >
                        <CiCreditCard1 className="h-6 w-6" />Mercado Pago
                    </Button>
                </div>

                <div className="mt-4"> 
                    {paymentMethod === "paypal" && (
                        <div className="w-full p-4 bg-white rounded-xl border">
                            <PayPalScriptProvider options={{
                                clientId: "Adg2w8GVLBfeD8yfOpHi_EVcEVhtJxDVtM4PH7Zj6nsePkUyzLSmFGr2VBp2yQh6-CmaggA3jjuOUhsj",
                                currency: "MXN",
                                intent: "capture",
                            }}>
                                <PayPalButtons 
                                    style={{ shape: "rect", layout: "vertical" }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then(details => {
                                            handlePaymentSubmit({ method: 'paypal', details });
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    )}
                    {paymentMethod === "mercadopago" && (
                        <CardPayment
                            initialization={{ amount: 10.00 }}
                            onSubmit={async (param) => {
                                handlePaymentSubmit({ method: 'mercadopago', details: param });
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
