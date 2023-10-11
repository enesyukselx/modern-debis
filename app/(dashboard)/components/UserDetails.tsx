import fixTrChars from "@/app/utils/fixtrchars";
import { cookies } from "next/headers";

const UserDetails = () => {
    const cookieStore = cookies();
    const studentCookie = cookieStore.get("student")?.value;
    const student = JSON.parse(studentCookie!);

    return (
        <div>
            <h1 className="font-bold text-lg mb-1">
                {fixTrChars(student.name)}
            </h1>
            <span className="block text-orange-400 text-base font-bold">
                {fixTrChars(student.department)}
            </span>

            <div className="mt-4 p-2 bg-gray-200 rounded-lg text-center text-sm font-bold">
                {fixTrChars(student.year)}
            </div>
            <div className="mt-2 p-2 bg-gray-200 rounded-lg text-center text-sm font-bold">
                {student.number}
            </div>
            <div className="mt-2 p-2 bg-gray-200 rounded-lg text-center text-xs font-bold">
                DANIŞMAN: {fixTrChars(student.advisor)}
            </div>
        </div>
    );
};

export default UserDetails;
