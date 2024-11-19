import TableComponent from "@/components/elements/TableComponent/TableComponent";
import { useEffect, useState } from "react";
import { DeleteModal } from "@/components/elements/ModalComponent/DeleteModal/DeleteModal";
import GenerateCode from "@/components/elements/CodeComponent/GenerateCode/GenerateCode";

const SERVER = import.meta.env.VITE_API_URL;

export default function MembersOrg() {
  const [members, setMembers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const orgId = user.organization_id; // Ejemplo de ID de la organización
  const orgName = user.organization_name; // Ejemplo de nombre de la organización

  // Manejo de apertura del modal
  const openDeleteModal = (memberData) => {
    setSelectedMember(memberData);
    setIsDeleteModalOpen(true);
  };

  // Confirmación y ejecución de la eliminación
  const confirmDeleteMember = async (memberData) => {
    try {
      const response = await fetch(`${SERVER}/users/deleteUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: memberData.email, type: "member" }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchMembers();
        setIsDeleteModalOpen(false);
        setSelectedMember(null);
      }
      return data.success;
    } catch (error) {
      console.error("Error eliminando el miembro:", error);
      return false;
    }
  };

  // Obtener miembros de la organización
  const fetchMembers = async () => {
    try {
      const response = await fetch(`${SERVER}/users/getMembers/${user.organization_id}`);
      const data = await response.json();
      setMembers(data.data);
    } catch (error) {
      console.error("Error al obtener los miembros:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <>
      <DeleteModal
        type={"members"}
        isOpen={isDeleteModalOpen}
        closeModal={() => {
          setIsDeleteModalOpen(false);
          setSelectedMember(null);
        }}
        handleDelete={() => confirmDeleteMember(selectedMember)}
      />

      {/* Componente del código de registro */}
      <GenerateCode orgId={orgId} orgName={orgName} />

      {/* Tabla de miembros */}
      {members && members.length > 0 ? (
        <TableComponent
          key={members.length}
          TableComponentData={members}
          TableComponentType={"members"}
          onActionClick={(action, member) =>
            action === "delete" ? openDeleteModal(member) : null
          }
        />
      ) : (
        <div className="text-gray-500 text-center mt-4">
          No hay miembros disponibles.
        </div>
      )}
    </>
  );
}
