import Schedule from "../components/Schedule";
import { cookies } from "next/headers";

const getData = async () => {
    const cookieStore = cookies();

    const response = await fetch(
        process.env.API_URL +
            "schedule?session=" +
            cookieStore.get("sessionId")?.value
    );
    if (!response.ok) {
        throw new Error("Failed to fetch schedule");
    }

    return await response.json();
};

const Dashboard = async () => {
    const data = await getData();
    return (
        <>
            <h1 className="text-4xl">Ders Programı</h1>
            <Schedule schedule={data.courses} />
        </>
    );
};

export default Dashboard;
