import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import cheerio from "cheerio";
import { ISchedule, TSession } from "@/app/types/api-types";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const session: TSession = searchParams.get("session");

    if (!session) {
        return new Response(
            JSON.stringify({
                error: "Session is missing",
            })
        );
    }
    try {
        const response: AxiosResponse = await axios.get(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/DersProgrami/index.php",
            {
                headers: {
                    Cookie: "PHPSESSID=" + session,
                    Host: "debis.deu.edu.tr",
                },
            }
        );

        const $ = cheerio.load(response.data);

        const courses: ISchedule[] = [];

        const table = $(
            'table[width="99%"][border="1"][cellspacing="0"][cellpadding="0"][align="center"][bordercolor="#FF9900"]'
        );
        const tr = table.find("tr");

        tr.each((i, element) => {
            const td = $(element).find("td");
            const course = {
                time: td.eq(0).text(),
                monday: td.eq(1).text(),
                tuesday: td.eq(2).text(),
                wednesday: td.eq(3).text(),
                thursday: td.eq(4).text(),
                friday: td.eq(5).text(),
            };
            courses.push(course);
        });

        courses.shift();

        return new Response(
            JSON.stringify({
                courses,
            })
        );
    } catch (error) {
        console.error(error);
        return;
    }
}
