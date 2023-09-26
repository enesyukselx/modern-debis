import { NextRequest } from "next/server";

const getParams = (request: NextRequest, ...params: string[]) => {
    const { searchParams } = new URL(request.url);
    const paramsArr: string[] = [];
    params.forEach((param) => {
        const paramValue = searchParams.get(param);
        if (!paramValue) {
            console.log(`Missing ${param} parameter`);
        }
        paramsArr.push(paramValue!);
    });
    return paramsArr;
};

export default getParams;
