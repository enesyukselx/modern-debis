import { NextRequest } from "next/server";
import cheerio from "cheerio";
import { ISchedule, TSession } from "@/app/types/api-types";
import debisApi from "@/app/utils/api/debisApi";

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

    const response: any = await debisApi(
        "GET",
        "OgrenciIsleri/Ogrenci/DersProgrami/index.php",
        { Cookie: `PHPSESSID=${session}` }
    );

    const $ = cheerio.load(response.iconv);

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
}
