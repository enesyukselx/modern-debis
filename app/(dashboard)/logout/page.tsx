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

    return null;
};

export default Logout;
