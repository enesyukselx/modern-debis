"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const MustBeLogin = ({ apiUrl }: { apiUrl?: string }) => {
    const params = useParams();
    const router = useRouter();

    if (Cookies.get("sessionId") === undefined) router.push("/");
    if (Cookies.get("student") === undefined) router.push("/");

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                apiUrl + "info?session=" + Cookies.get("sessionId")
            );
            if (response.data.student.name === "") {
                Cookies.remove("sessionId");
                Cookies.remove("student");
                router.push("/");
            }
        };

        fetch();
    }, [params, router, apiUrl]);

    return <></>;
};

export default MustBeLogin;
