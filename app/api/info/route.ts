import { NextRequest } from "next/server";
import cheerio from "cheerio";
import { IStudent } from "@/app/types/api-types";
import debisApi from "@/app/utils/api/debisApi";
import getParams from "@/app/utils/api/getParams";

export async function GET(request: NextRequest) {
    const params = getParams(request, "session");
    const student: IStudent = {};

    const response: any = await debisApi(
        "GET",
        "OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
        { Cookie: `PHPSESSID=${params[0]}` }
    );

    const $ = cheerio.load(response.iconv, {
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
}
