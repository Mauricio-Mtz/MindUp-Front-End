/* eslint-disable react/prop-types */
export function CourseHeader({ course }) {
    return (
        <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                src={`https://codeflex.space/images/courses/${course.img}`}
                alt={course.name}
                onError={(e) => {
                    e.target.src = "/assets/images/no-img.png";
                }}
            />
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h1 className="text-4xl font-bold text-white drop-shadow-md">{course.name}</h1>
            </div>
        </div>
    );
}
