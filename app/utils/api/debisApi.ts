import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import iconv from "iconv-lite";

const debisApi = async (
    method: string,
    endpoint: string,
    headers?: any,
    data?: any
) => {
    const config: AxiosRequestConfig = {
        method: method,
        url: `https://debis.deu.edu.tr/${endpoint}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Host: "debis.deu.edu.tr",
            ...headers,
        },
        responseType: "arraybuffer",
        responseEncoding: "utf8",
        data: data,
    };

    try {
        const response = await axios(config);
        return {
            data: response.data,
            iconv: iconv.decode(response.data, "ISO-8859-9"),
        };
    } catch (error) {
        console.error(error);
    }
};

export default debisApi;
