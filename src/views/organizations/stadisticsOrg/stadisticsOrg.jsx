import ChartUserXcourse from "@/components/elements/charts/usuerByCourse/chartUserByCourse";
import ChartFinishedCourse from "@/components/elements/charts/averageFinishedCourses/averageFinishedCourses";

export default function StadisticsOrg() {
    return (
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
    )
}
