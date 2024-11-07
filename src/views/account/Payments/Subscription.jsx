/* eslint-disable react/prop-types */
export const Subscription = ({ subscription }) => {
    return (
        <div className="flex flex-col gap-4 mt-2 p-4 border rounded-lg shadow-lg mx-auto w-full">
            <h2 className="text-3xl font-bold text-center mb-2">{subscription.description}</h2>
            <p className="text-center mb-4">Accede a contenido exclusivo y cursos personalizados.</p>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Precio:</span>
                    <span className="font-semibold text-green-600">{`${subscription.amount} ${subscription.currency} / ${subscription.billingCycle}`}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Renovación:</span>
                    <span className="font-semibold">{subscription.renewalType}</span>
                </div>
                
                <div className="space-y-2 border-b pb-2">
                    <h3 className="text-lg font-medium">Beneficios:</h3>
                    <ul className="list-disc list-inside pl-2">
                        {subscription.benefits.map((benefit, index) => (
                            <li key={index} className="">{benefit}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className="text-center text-sm mt-4">{subscription.renewalInfo}</p>
            
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                {subscription.callToAction}
            </button>

            <p className="text-center text-xs mt-2">{subscription.terms}</p>
        </div>
    );
};

