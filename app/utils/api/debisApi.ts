import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import iconv from "iconv-lite";

const debisApi = async (
    method: "POST" | "GET",
    url: string,
    data: { sessionId: string }
) => {
    const axiosGetConfig: AxiosRequestConfig = {
        headers: {
            Cookie: "PHPSESSID=" + data.sessionId,
            Host: "debis.deu.edu.tr",
        },
        responseType: "arraybuffer",
    };

    try {
        if (method === "GET") {
            const response: AxiosResponse = await axios.get(
                "https://debis.deu.edu.tr/" + url,
                axiosGetConfig
            );

            return {
                data: iconv.decode(response.data, "ISO-8859-9"),
                cookie: response.headers,
            };
        }
    } catch (err) {
        console.log(err);
    }
};

export default debisApi;
