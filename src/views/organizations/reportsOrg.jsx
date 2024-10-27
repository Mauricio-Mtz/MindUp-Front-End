import NabvarA from "@/components/elements/nabvarAside"
import HeaderAdmin from "@/components/elements/headerAdmins";

export default function ReportsOrg() {
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <NabvarA/>
        <HeaderAdmin title={"Gestión de Reportes"}/>
        <div className="flex flex-col gap-2 py-1 pl-14">
          <main className='sm:px-1 p-2 md:px-2 md:p-4 lg:p-4 lg:px-8 py-0'>
            {/* Seccion de graficos */}
            hola - reports
            <br />

            {/* Seccion de CRUD */}
            hola
            
          </main>
        </div>
    </div>
  );
}