import { cookies } from "next/headers";
import CourseDetails from "../components/CourseDetails";

const getData = async (slug: string) => {
    const cookieStore = cookies();

    const response = await fetch(
        process.env.API_URL +
            "courses?session=" +
            cookieStore.get("sessionId")!.value +
            "&semester=" +
            slug
    );

    if (!response.ok) {
        throw new Error("Could not fetch, received....");
    }

    return response.json();
};

const Page = async ({ params }: { params: { slug: string } }) => {
    const data = await getData(params.slug);
    const courses = data.courses;

    return (
        <div>
            {courses.length ? (
                courses.map(
                    (
                        course: { text: string; value: string },
                        index: number
                    ) => {
                        return (
                            <div key={index}>
                                {course.value && (
                                    <CourseDetails
                                        courseTitle={course.text}
                                        apiUrl={process.env.PUBLIC_API_URL!}
                                        value={course.value}
                                        sessionId={
                                            cookies().get("sessionId")!.value
                                        }
                                        semester={params.slug}
                                    />
                                )}
                            </div>
                        );
                    }
                )
            ) : (
                <div className="py-5 px-6 mb-2 mt-4 rounded-xl bg-red-600 text-white font-bold">
                    Bu döneme ait ders bulunamadı!
                </div>
            )}
        </div>
    );
};

export default Page;
