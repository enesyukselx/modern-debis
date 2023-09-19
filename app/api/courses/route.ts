import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import qs from "querystring";
import { IConfig, TSemester, TSession } from "@/app/types/api-types";

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

    try {
        const semesterData = qs.stringify({
            ogretim_donemi_id: semester,
        });

        const config: IConfig = {
            headers: {
                Cookie: "PHPSESSID=" + session,
                Host: "debis.deu.edu.tr",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            responseType: "arraybuffer",
        };

        const response = await axios.post(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            semesterData,
            config
        );
        const decodedBody = iconv.decode(response.data, "ISO-8859-9");
        const $ = cheerio.load(decodedBody, {
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
    } catch (error) {
        console.error(error);
    }
}
