import { cookies } from "next/headers";
import SelectSemester from "./components/SelectSemester";

const getData = async () => {
    const cookieStore = cookies();

    const res = await fetch(
        process.env.API_URL +
            "semesters?session=" +
            cookieStore.get("sessionId").value
    );
    if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
    }
    return res.json();
};

const Layout = async ({ children }) => {
    const data = await getData();
    return (
        <>
            <h1 className="text-4xl">Notlarım</h1>
            <SelectSemester semesters={data.semesters} />
            <div className="mt-4">{children}</div>
        </>
    );
};

export default Layout;
