// ModalComponent.jsx
export default function ModalComponent({ isOpen, closeModal }) {
    if (!isOpen) return null; // No renderiza la modal si isOpen es falso
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-md shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Únete a la Organización</h2>
          <p className="mb-4">Aquí puedes unirte a nuestra organización y ser parte del cambio. Completa el formulario para comenzar.</p>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">Cancelar</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  