import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import qs from "querystring";

import {
    ISession,
    TPassword,
    TUserName,
    ILoginData,
    IConfig,
} from "@/app/types/api-types";

let session: ISession = {};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userName: TUserName = searchParams.get("username");
    const password: TPassword = searchParams.get("password");

    if (!userName || !password) {
        return new Response(
            JSON.stringify({ error: "Missing userName or password" })
        );
    }

    const data: ILoginData = {
        username: userName,
        password: password,
        emailHost: "ogr.deu.edu.tr",
    };

    const loginData: string = qs.stringify({ ...data });

    const config: IConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const response: AxiosResponse = await axios.post(
        "https://debis.deu.edu.tr/debis.php",
        loginData,
        config
    );

    const cookie = response.headers["set-cookie"]![0].split(";")[0];

    session = {
        cookie: cookie,
    };

    return new Response(
        JSON.stringify({
            cookie,
        })
    );
}
