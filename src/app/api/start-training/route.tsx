import {NextResponse} from 'next/server'
import {MLResourcePoolREST} from "@/app/helpers/rest";


export async function POST(reqest: Request) {
    const body = await reqest.json()
    try {
        const taskRes = await MLResourcePoolREST(`http://127.0.0.1:${body.port}/start-train`, 'POST', JSON.stringify(body))
        return await NextResponse.json(taskRes)

    } catch (e) {
        console.log("response error", e)
        return NextResponse.json({"msg": e})
    }
}
