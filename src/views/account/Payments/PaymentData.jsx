/* eslint-disable react/prop-types */
export function PaymentData({ paymentData }) {
    console.log("Payment data ", paymentData);

    // Convertir fechas a un formato legible
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Estilo condicional para suscripciones actuales
    const containerClass = paymentData.is_current 
        ? "flex flex-col gap-4 mt-2 p-4 border shadow-lg mx-auto w-full rounded-lg border-green-500" 
        : "flex flex-col gap-4 mt-2 p-4 border shadow-lg mx-auto w-full rounded-md";

    return (
        <div className={containerClass}>
            <h2 className="text-3xl font-bold text-center mb-2">Suscripción</h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-medium">Plan:</span>
                    <span className="font-semibold">Mensual</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium">Precio:</span>
                    <span className="font-semibold">${paymentData.amount}</span>
                </div>              
                {paymentData.is_current === 1 && (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Fecha de Inicio:</span>
                            <span className="font-semibold">{formatDate(paymentData.start_date)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Fecha de Expiración:</span>
                            <span className="font-semibold">{formatDate(paymentData.end_date)}</span>
                        </div>
                    </>
                )}
                <div className="flex justify-between items-center">
                    <span className="font-medium">Método de Pago:</span>
                    <span className="font-semibold">{paymentData.method}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium">Estado de Pago:</span>
                    <span className="font-semibold">{paymentData.payment_status}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-medium">ID de Transacción:</span>
                    <span className="font-semibold">{paymentData.transaction_id}</span>
                </div>
            </div>
        </div>
    );
}
