import { NextRequest } from "next/server";
import qs from "querystring";

import { ISession, TPassword, TUserName } from "@/app/types/api-types";
import debisApi from "@/app/utils/api/debisApi";

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

    const loginData: string = qs.stringify({
        username: userName,
        password: password,
        emailHost: "ogr.deu.edu.tr",
    });

    const response: any = await debisApi("POST", "debis.php", {}, loginData);

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
