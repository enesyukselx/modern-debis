import { NextRequest } from "next/server";
import qs from "querystring";

import { ISession, TPassword, TUserName } from "@/app/types/api-types";
import debisApi from "@/app/utils/api/debisApi";
import getParams from "@/app/utils/api/getParams";

let session: ISession = {};

export async function GET(request: NextRequest) {
    const params = getParams(request, "username", "password");

    if (!params[0] || !params[1]) {
        return new Response(
            JSON.stringify({ error: "Missing userName or password" })
        );
    }

    const loginData: string = qs.stringify({
        username: params[0],
        password: params[1],
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
