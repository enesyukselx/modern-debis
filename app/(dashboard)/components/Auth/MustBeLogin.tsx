"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const MustBeLogin = ({
    children,
    apiUrl,
}: {
    children: React.ReactNode;
    apiUrl?: string;
}) => {
    const params = useParams();
    const router = useRouter();

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

    return children;
};

export default MustBeLogin;
