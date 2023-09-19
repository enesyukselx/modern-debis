import axios, { AxiosResponse } from "axios";
import { NextRequest } from "next/server";
import cheerio from "cheerio";
import iconv from "iconv-lite";
import { IConfig, TSession } from "@/app/types/api-types";

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
        const config: IConfig = {
            headers: {
                Cookie: "PHPSESSID=" + session,
                Host: "debis.deu.edu.tr",
            },
            responseType: "arraybuffer",
        };

        const response: AxiosResponse = await axios.get(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            config
        );

        const decodedBody = iconv.decode(response.data, "ISO-8859-9"); // Convert Latin1 to UTF-8
        const $ = cheerio.load(decodedBody, {
            decodeEntities: false,
        });
        const options = $("#ogretim_donemi_id").find("option");
        const optionsArray: { value?: string; text?: string }[] = [];
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
                semesters: optionsArray,
            })
        );
    } catch (error) {
        console.error(error);
        return;
    }
}
