import cheerio from "cheerio";
import { NextRequest } from "next/server";
import qs from "querystring";
import { ICourseArr } from "@/app/types/api-types";
import debisApi from "@/app/utils/api/debisApi";
import getParams from "@/app/utils/api/getParams";

export async function GET(request: NextRequest) {
    const params = getParams(request, "session", "semester", "course");

    const courseData = qs.stringify({
        ogretim_donemi_id: params[1],
        ders: params[2],
    });

    const response: any = await debisApi(
        "POST",
        "OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
        { Cookie: `PHPSESSID=${params[0]}` },
        courseData
    );

    const $ = cheerio.load(response.iconv, {
        decodeEntities: false,
    });

    const table = $('table[style="margin-top:10px"] > tbody > tr > td > table');

    const td = table.find("td");
    const courseDetails: string[] = [];
    for (let i = 0; i < td.length; i++) {
        courseDetails.push(td.eq(i).text());
    }

    const courseArr: ICourseArr = {
        credit: courseDetails[11],
        type: courseDetails[14],
        professor: courseDetails[20],
        status: courseDetails[23],
        results: [],
    };

    courseDetails.forEach((element, index) => {
        if (
            element == "Vize" ||
            element == "Final" ||
            element == "Bütünleme Notu" ||
            element == "Ödev" ||
            element == "Quiz" ||
            element == "Vize / Ödev"
        ) {
            courseArr.results?.push({
                name: courseDetails[index],
                avarage: courseDetails[index + 2],
                result: courseDetails[index + 4],
            });
        }

        if (
            element == "Yarıyıl Sonu Başarı Notu" ||
            element == "Bütünleme Sonu Başarı Notu" ||
            element == "Başarı Notu"
        ) {
            courseArr.results?.push({
                name: courseDetails[index],
                result: courseDetails[index + 4],
            });
        }
    });

    return new Response(
        JSON.stringify({
            courseArr,
        })
    );
}
