import { cn } from "@/app/utils/cn";
import { cookies } from "next/headers";
import Link from "next/link";

const getData = async (slug) => {
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

const Page = async ({ params }) => {
    const data = await getData(params.slug[0]);
    const courses = data.courses;
    return (
        <div>
            {courses.length ? (
                courses.map((course, index) => {
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
                                    "bg-slate-100 border-2 border-slate-300":
                                        course.value ===
                                        decodeURIComponent(params.slug[1]),
                                }
                            )}
                            key={index}
                        >
                            <span>{course.text}</span>
                            {course.value ===
                                decodeURIComponent(params.slug[1]) && (
                                <div>Selected</div>
                            )}
                        </Link>
                    );
                })
            ) : (
                <div className="py-5 px-6 mb-2 rounded bg-red-200 font-bold">
                    Bu döneme ait ders bulunamadı!
                </div>
            )}
        </div>
    );
};

export default Page;
