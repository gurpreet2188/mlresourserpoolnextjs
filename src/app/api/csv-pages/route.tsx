import {MLResourcePoolREST} from '@/app/helpers/rest'
import {NextResponse} from 'next/server'

export async function POST(request: Request):Promise<NextResponse> {
    const body = await request.json()
    try {
        const res = await MLResourcePoolREST(
            `http://127.0.0.1:${body.port}/csv-pages`,
            'POST',
            JSON.stringify({
                page_number: body.page_number,
                connectedWith: body.connectedWith
            })
        )
        return NextResponse.json({res})
    } catch {
        return NextResponse.json({"msg": "failed"})
    }
}
