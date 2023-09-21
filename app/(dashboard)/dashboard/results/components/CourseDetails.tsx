import { cookies } from "next/headers";

interface ICourseDetailsProps {
    slugs: string[];
}

const getData = async (courseId: string, semesterId: string) => {
    const cookieStore = cookies();

    const response = await fetch(
        process.env.API_URL +
            "course?session=" +
            cookieStore.get("sessionId")?.value +
            "&semester=" +
            semesterId +
            "&course=" +
            courseId,
        {
            cache: "no-store",
        }
    );
    if (!response.ok) {
        throw new Error(`Could not fetch, received ${response.status}`);
    }
    return response.json();
};

const CourseDetails = async ({ slugs }: ICourseDetailsProps) => {
    const data = await getData(
        decodeURIComponent(slugs[1]),
        decodeURIComponent(slugs[0])
    );
    const course = data.courseArr;

    return (
        <div className="font-normal">
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-200 text-center py-1 rounded mt-2 border-2 border-gray-300 text-xs">
                    <span className="font-bold">Kredi: </span>
                    {course.credit}
                </div>
                <div className="bg-slate-200 text-center py-1 rounded mt-2 border-2 border-gray-300 text-xs">
                    <span className="font-bold">Ders Türü: </span>
                    {course.type}
                </div>
            </div>
            <div className=" bg-slate-200 text-center py-1 rounded mt-2 border-2 border-gray-300 text-xs">
                <div>{course.professor}</div>
            </div>
            <div className=" bg-slate-200 text-center py-1 rounded mt-2 border-2 border-gray-300 text-xs">
                <div>
                    <span className="font-bold">Ders durumu: </span>{" "}
                    {course.status}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
                {course.results.map((result: any, index: number) => {
                    if (result.result === "") return;

                    return (
                        <div
                            className="bg-slate-200 text-center py-1 rounded border-2 border-gray-300 text-xs"
                            key={index}
                        >
                            <div>
                                <span className="font-bold">
                                    {result.name}:{" "}
                                </span>{" "}
                                {result.result}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseDetails;
