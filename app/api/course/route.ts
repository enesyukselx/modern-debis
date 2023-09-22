import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { NextRequest } from "next/server";
import iconv from "iconv-lite";
import qs from "querystring";
import {
    TSemester,
    TSession,
    TCourse,
    IConfig,
    ICourseArr,
} from "@/app/types/api-types";
import debisApi from "@/app/utils/api/debisApi";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const session: TSession = searchParams.get("session");
    const semester: TSemester = searchParams.get("semester");
    const course: TCourse = searchParams.get("course");

    if (!session || !semester || !course) {
        return new Response(
            JSON.stringify({
                error: "Session or semester or course is missing",
            })
        );
    }

    try {
        const courseData = qs.stringify({
            ogretim_donemi_id: semester,
            ders: course,
        });

        const response: any = await debisApi(
            "POST",
            "OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            { Cookie: `PHPSESSID=${session}` },
            courseData
        );

        const $ = cheerio.load(response.iconv, {
            decodeEntities: false,
        });

        const table = $(
            'table[style="margin-top:10px"] > tbody > tr > td > table'
        );

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
    } catch (error) {
        console.error(error);
    }
}
