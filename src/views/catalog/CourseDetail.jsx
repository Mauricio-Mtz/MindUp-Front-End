import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SERVER = import.meta.env.VITE_API_URL;

export default function CourseDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course: initialCourse } = location.state;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${SERVER}/content/getCourse/${initialCourse.id}`);
        const result = await response.json();

        if (result.success) {
          setCourse(result.data);
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error('Error al obtener los datos del curso', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [initialCourse.id]);

  const handleEnroll = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      const response = await fetch(`${SERVER}/users/enrollCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: initialCourse.id, studentEmail: user.email }),
      });
      const result = await response.json();

      if (result.success) {
        console.log('Inscripción exitosa');
        navigate('/my-courses');
      } else {
        console.error(`Error al inscribirse: ${result.message}`);
      }
    } catch (err) {
      console.error('Error al inscribirse en el curso', err)
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Cargando...</div>;
  }

  return (
    <>
      {course && (
        <>    
          <div className="relative w-full max-h-[170px] group">
            <img
              className="w-full max-h-[170px] object-cover rounded-md"
              src={`https://codeflex.space/images/courses/${course.img}`}
              alt={course.name}
              onError={(e) => { e.target.src = "/assets/images/no-img.png"; }}
            />
            <div className="absolute inset-0 bg-white dark:bg-black opacity-50 rounded-md"></div>
            <h2 className="absolute bottom-2 left-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {course.name}
            </h2>
          </div>
          <p className="leading-7">{course.description}</p>
          <button
            onClick={handleEnroll}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Inscribirse al curso
          </button>
        </>
      )}
    </>
  );
}
