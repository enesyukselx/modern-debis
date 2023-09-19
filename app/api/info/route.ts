import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import cheerio from "cheerio";
import iconv from "iconv-lite";

import { IStudent, TSession } from "@/app/types/api-types";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const session: TSession = searchParams.get("session");

    if (!session) {
        return new Response(
            JSON.stringify({
                error: "Session is not defined",
            })
        );
    }

    try {
        const response: AxiosResponse = await axios.get(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            {
                headers: {
                    Cookie: "PHPSESSID=" + session,
                    Host: "debis.deu.edu.tr",
                },
                responseType: "arraybuffer",
            }
        );

        const student: IStudent = {};
        const decodedBody = iconv.decode(response.data, "ISO-8859-9");

        const $ = cheerio.load(decodedBody, {
            decodeEntities: false,
        });

        const table = $('table[width="100%"][border="0"]').eq(1);

        for (let i = 0; i < 7; i++) {
            const tr = table.find("tr").eq(i);
            const td = tr.find("td").eq(1);

            if (i == 0) student.name = td.text();
            if (i == 1) student.number = td.text();
            if (i == 2) student.year = td.text();
            if (i == 3) student.faculty = td.text();
            if (i == 4) student.department = td.text();
            if (i == 6) student.advisor = td.text();
        }
        return new Response(
            JSON.stringify({
                student,
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Something went wrong",
            })
        );
    }
}
