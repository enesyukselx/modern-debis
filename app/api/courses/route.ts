import { NextRequest } from "next/server";
import cheerio from "cheerio";
import qs from "querystring";
import { TSemester, TSession } from "@/app/types/api-types";
import debisApi from "@/app/utils/api/debisApi";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const session: TSession = searchParams.get("session");
    const semester: TSemester = searchParams.get("semester");

    if (!session || !semester) {
        return new Response(
            JSON.stringify({
                error: "Session or semester is missing",
            })
        );
    }

    const semesterData = qs.stringify({
        ogretim_donemi_id: semester,
    });

    const response: any = await debisApi(
        "POST",
        "OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
        { Cookie: `PHPSESSID=${session}` },
        semesterData
    );

    const $ = cheerio.load(response.iconv, {
        decodeEntities: false,
    });
    const optionsArray: { value?: string; text?: string }[] = [];
    const options = $("#ders").find("option");
    options.each((i, element) => {
        const option = {
            value: $(element).attr("value"),
            text: $(element).text(),
        };
        optionsArray.push(option);
    });
    optionsArray.shift();

    return new Response(
        JSON.stringify({
            courses: optionsArray,
        })
    );
}
