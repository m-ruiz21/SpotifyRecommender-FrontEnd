import { NextRequest } from "next/server";
import { getFeaturesAsync } from "./get-features";

export const GET = async (
    req: NextRequest,
    { params }: { params: { name: string } }
) => {
    const name  = params.name;

    console.log(`[Song Search]: Received request for ${name}`);
    
    let res: Response;
    try {
        const features = await getFeaturesAsync(name);

        const res_body = JSON.stringify(features)
        res = new Response(res_body, {status: 200})
    } catch (error: any) {
        const res_body = JSON.stringify({ error: error.message || error.toString() || "Unknown error"})
        res = new Response(res_body, {status: 500})      
    }

    console.log(`[Song Search]: Completed Search Song Request for ${name}`);
    return res;
};