import NabvarA from "@/components/elements/nabvarAside"
import HeaderAdmin from "@/components/elements/headerAdmins";
import { useLocation, useParams } from "react-router-dom";
export default function EditCourse() {
  const { name } = useParams();
  const location = useLocation();
  const courseId = location.state?.courseId;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <NabvarA/>
      <HeaderAdmin/>
      <div className="flex flex-col gap-2 py-1 pl-14">
        <main className='sm:px-1 p-2 md:px-2 md:p-4 lg:p-4 lg:px-8 py-0'>
          {name ? (
            <h1>Hola {name}</h1>
          ) : (
            <div>
              <h1>Hola</h1>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}