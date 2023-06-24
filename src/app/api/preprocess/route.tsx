import {MLResourcePoolREST} from '@/app/helpers/rest'
import {NextResponse} from 'next/server'

export async function POST(reqest: Request) {
    const body = await reqest.json()
    try {
        const res = await MLResourcePoolREST(
            `http://127.0.0.1:${body.port}/preprocess-csv`,
            'POST',
            JSON.stringify(body)
        )
        return await NextResponse.json(res)
    } catch (e) {
        return NextResponse.json({"msg": e})
    }
}
