import { NextRequest } from "next/server";
import { getFeaturesAsync } from "./get-features";
import { getRecommendationsAsync } from "./get-recs";

export const GET = async (
    req: NextRequest,
    { params }: { params: { name: string } }
) => {
    const name  = params.name;
    const bearerToken = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!name || !bearerToken) {
        return new Response("Missing required parameters", { status: 400 });
    }

    console.log(`[Song Search]: Received request for ${name}`);
    
    let res: Response;
    try {
        const features = await getFeaturesAsync(name);
        const songs = await getRecommendationsAsync(name, features, bearerToken); 

        const res_body = JSON.stringify(songs)
        res = new Response(res_body, {status: 200})
    } catch (error: any) {
        const res_body = JSON.stringify({ error: error.message || error.toString() || "Unknown error"})
        res = new Response(res_body, {status: 500})      
    }

    console.log(res)
    console.log(`[Song Search]: Completed Search Song Request for ${name}`);
    return res;
};