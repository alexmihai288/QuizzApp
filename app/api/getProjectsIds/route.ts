import { db } from "@/lib/db";

export async function GET(){
    try {
        
        const allProjectsId = await db.project.findMany({
            select:{
                id:true
            }
        })

        return new Response(JSON.stringify(allProjectsId));

    } catch (error) {
        
    }
}