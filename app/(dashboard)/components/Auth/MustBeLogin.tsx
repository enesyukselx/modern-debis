"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const MustBeLogin = ({ children }: { children: React.ReactNode }) => {
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:3000/api/info?session=" +
                    Cookies.get("sessionId")
            );
            if (response.data.student.name === "") {
                router.push("/");
            }
        };

        fetch();
    }, [params, router]);

    return children;
};

export default MustBeLogin;
