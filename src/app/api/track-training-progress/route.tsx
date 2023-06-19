import {NextResponse} from 'next/server'
import {MLResourcePoolREST} from "@/app/helpers/rest";


export async function POST(reqest: Request) {
    const body = await reqest.json()
    try {
        const combineRes = await MLResourcePoolREST('http://127.0.0.1:8000/track-ml-progress', 'POST', JSON.stringify(body))
        return await NextResponse.json(combineRes)

    } catch (e) {
        console.log(e)
        return NextResponse.json({"msg": e})
    }
}
