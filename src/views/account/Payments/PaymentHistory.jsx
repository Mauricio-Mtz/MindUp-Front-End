/* eslint-disable react/prop-types */
// RecommendedCoursesList.js
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PaymentHistory({ paymentHistory, setSelectedPayment }) {
    return (
        <div className='hidden md:block h-full w-full md:w-4/12'>
            <h2 className="scroll-m-20 border-b pb-2 text-center sm:text-left text-2xl sm:text-3xl font-semibold tracking-tight">Historial de Pagos</h2>
            <ScrollArea className="h-full border-b">
                {paymentHistory.length === 0 ? (
                    <p>No hay historial de pagos disponible.</p>
                ) : (
                    <ul className="space-y-2 my-2">
                        {paymentHistory.map((payment) => {
                            const paymentDate = new Date(payment.payment_date);
                            const formattedDate = paymentDate.toLocaleDateString('es-ES', {
                                month: 'long',
                                year: 'numeric'
                            });
                            const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

                            // Clase condicional para destacar el pago actual
                            const cardClass = payment.is_current 
                                ? "flex flex-col cursor-pointer border border-green-500 shadow-lg" // Estilo para el pago actual
                                : "flex flex-col cursor-pointer";

                            return (
                                <Card 
                                    key={payment.payment_id} 
                                    className={cardClass}
                                    onClick={() => setSelectedPayment(payment)}
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            {capitalizedDate} 
                                            {payment.is_current && (
                                                <span className="ml-2 text-green-700 font-semibold">(Suscripción Actual)</span>
                                            )}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mt-2">Monto: <b>{payment.amount}</b></p>
                                        <p className="mt-2">Fecha de Pago: <b>{paymentDate.toLocaleDateString('es-ES')}</b></p>
                                        <p className="mt-2">Método de Pago: <b>{payment.method}</b></p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </ul>
                )}
            </ScrollArea>
        </div>
    );
}
