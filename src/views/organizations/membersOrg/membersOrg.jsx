// MembersOrg.jsx
import TableComponent from "@/components/elements/TableComponent/TableComponent";
import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";

const SERVER = import.meta.env.VITE_API_URL;

export default function MembersOrg() {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar la modal

  const handleDeleteMember = async (action, memberData) => {
    switch (action) {
      case "delete":
        console.log("Deleting member", memberData);
        break;
      default:
        break;
    }
  }

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${SERVER}/users/getMembers`);
      const data = await response.json();
      setMembers(data.data);
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      {/* Botón para abrir la modal */}
      <button onClick={openModal} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md">
        Unirse a la Organización
      </button>

      {/* Modal para unirse a la organización */}
      <ModalComponent isOpen={isModalOpen} closeModal={closeModal} />

      {members && members.length > 0 ? (
        <TableComponent 
          TableComponentData={members} 
          TableComponentType={"members"} 
          onActionClick={handleDeleteMember} 
        />
      ) : (
        <div>No hay miembros disponibles.</div>
      )}
    </div>
  );
}
