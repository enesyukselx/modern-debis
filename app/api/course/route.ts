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

        const response: AxiosResponse = await axios.post(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            semesterData,
            config
        );
        const decodedBody = iconv.decode(response.data, "ISO-8859-9"); // Convert Latin1 to UTF-8
        const $ = cheerio.load(decodedBody, {
            decodeEntities: false,
        });
        const courseData = qs.stringify({
            ogretim_donemi_id: semester,
            ders: course,
        });

        const courseResponse = await axios.post(
            "https://debis.deu.edu.tr/OgrenciIsleri/Ogrenci/OgrenciNotu/index.php",
            courseData,
            config
        );

        const decodedCourseBody = iconv.decode(
            courseResponse.data,
            "ISO-8859-9"
        );

        const $$ = cheerio.load(decodedCourseBody, {
            decodeEntities: false,
        });

        const table = $$(
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
