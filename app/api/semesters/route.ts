import { NextRequest } from "next/server";
import cheerio from "cheerio";
import { TSession } from "@/app/types/api-types";
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
        "OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
        {
            sessionId: session,
        }
    );

    const $ = cheerio.load(response.data, {
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
}
