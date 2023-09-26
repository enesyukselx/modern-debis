import { NextRequest } from "next/server";
import cheerio from "cheerio";
import qs from "querystring";
import debisApi from "@/app/utils/api/debisApi";
import getParams from "@/app/utils/api/getParams";

export async function GET(request: NextRequest) {
    const params = getParams(request, "session", "semester");

    const semesterData = qs.stringify({
        ogretim_donemi_id: params[1],
    });

    const response: any = await debisApi(
        "POST",
        "OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
        { Cookie: `PHPSESSID=${params[0]}` },
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
