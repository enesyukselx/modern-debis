"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();

    if (Cookies.get("sessionId") || Cookies.get("student")) {
        Cookies.remove("sessionId");
        Cookies.remove("student");
        router.prefetch("/");
    }

    return (
        <div>
            <h1 className="text-center text-2xl font-bold text-gray-800">
                Çıkış yapılıyor...
            </h1>
        </div>
    );
};

export default Logout;
