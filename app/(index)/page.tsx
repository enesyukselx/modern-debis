"use client";
import Form from "./components/Form";

export default function Home() {
    return (
        <main className="w-5/6 md:w-1/2 max-w-md m-auto">
            <div className="bg-white mt-20 p-4 border-gray-200 border-2 rounded-lg">
                <h1 className="text-center font-bold text-slate-900 text-xl">
                    modern-debis
                </h1>
                <hr className="my-2" />
                <Form />
            </div>
        </main>
    );
}
