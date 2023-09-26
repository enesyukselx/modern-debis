import { cookies } from "next/headers";
import SelectSemester from "./components/SelectSemester";
import { ReactNode } from "react";

const getData = async () => {
    const cookieStore = cookies();

    const res = await fetch(
        process.env.API_URL +
            "semesters?session=" +
            cookieStore.get("sessionId")?.value
    );
    if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
    }
    return res.json();
};

const Layout = async ({ children }: { children: ReactNode }) => {
    const data = await getData();

    return (
        <>
            <h1 className="text-4xl">Notlarım</h1>
            <SelectSemester semesters={data.semesters} />
            {children}
        </>
    );
};

export default Layout;
