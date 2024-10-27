import NabvarA from "@/components/elements/nabvarAside"
import ChartUserXcourse from "@/components/elements/charts/usuerByCourse/chartUserByCourse";
import ChartFinishedCourse from "@/components/elements/charts/averageFinishedCourses/averageFinishedCourses";
import HeaderAdmin from "@/components/elements/headerAdmins";
import Table1 from "@/components/elements/tables/tableCourses/tableCourses";
export default function CourseOrg() {
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <NabvarA/>
      <HeaderAdmin title={"Gestión de Cursos"}/>
      <div className="flex flex-col gap-2 py-1 pl-14">
        <main className='sm:px-1 p-2 md:px-2 md:p-4 lg:p-4 lg:px-8 py-0'>
          {/* Seccion de graficos */}
          <div className="hidden sm:grid flex-1 items-start gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="flex flex-row gap-4">
              <ChartUserXcourse/> 
            </div>
            <div className="flex flex-row gap-4">
              <ChartFinishedCourse/>  
            </div>
            <div className="flex flex-row gap-4">
              <ChartUserXcourse/>  
            </div>
          </div>
          {/* Seccion de CRUD */}
          <div className='bg-card border px-4 my-6 ' style={{borderRadius: '10px'}}>
            <Table1/>
          </div>          
        </main>
      </div>
    </div>
  );
}