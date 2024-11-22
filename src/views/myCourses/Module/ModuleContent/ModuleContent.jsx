/* eslint-disable react/prop-types */
import { VideoEmbed } from "./VideoEmbed";
import { ModuleQuiz } from "./ModuleQuiz";

export function ModuleContent({ content, questions, studentCourseId, moduleId }) {
    return (
        <div>
            {content.map((item, index) => (
                <div key={index} className="mb-10">
                    <h1 className="text-2xl font-bold">{item?.subTitle ?? null}</h1>
                    <p className="mt-4">{item?.text ?? null}</p>
                    <VideoEmbed videoUrl={item.videoUrl} />
                </div>
            ))}
            <ModuleQuiz 
                questions={questions}
                studentCourseId={studentCourseId}
                moduleId={moduleId}
            />
        </div>
    );
}