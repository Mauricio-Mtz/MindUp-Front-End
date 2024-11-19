import ChartUserXcourse from "@/components/elements/charts/usuerByCourse/chartUserByCourse";
import ChartFinishedCourse from "@/components/elements/charts/averageFinishedCourses/averageFinishedCourses";
import Table1 from "@/components/elements/tables/tableCourses/tableCourses";
export default function CourseOrg({onEditCourse}) {
  
  return (
    <div >
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
        <Table1 handleEditCourse={onEditCourse}/>
      </div>          
    </div>
  );
}