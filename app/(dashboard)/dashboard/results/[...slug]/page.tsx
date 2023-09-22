import { cn } from "@/app/utils/cn";
import { cookies } from "next/headers";
import Link from "next/link";
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

const Page = async ({ params }: { params: { slug: string[] } }) => {
    const data = await getData(params.slug[0]);
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
                            <Link
                                href={
                                    "/dashboard/results/" +
                                    params.slug[0] +
                                    "/" +
                                    course.value
                                }
                                className={cn(
                                    "block py-5 px-6 mb-2 rounded bg-slate-300 font-bold cursor-pointer hover:bg-slate-200",
                                    "",
                                    {
                                        "bg-slate-100 border-2 border-slate-300 hover:bg-slate-100":
                                            course.value ===
                                            decodeURIComponent(params.slug[1]),
                                    }
                                )}
                                key={index}
                            >
                                <span>{course.text}</span>
                                {course.value ===
                                    decodeURIComponent(params.slug[1]) && (
                                    <CourseDetails slugs={params.slug} />
                                )}
                            </Link>
                        );
                    }
                )
            ) : (
                <div className="py-5 px-6 mb-2 rounded bg-red-200 font-bold">
                    Bu döneme ait ders bulunamadı!
                </div>
            )}
        </div>
    );
};

export default Page;