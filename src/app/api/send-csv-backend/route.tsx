import {promises as fs, createReadStream} from 'fs'
import {NextResponse} from 'next/server'
import path from 'path'

export async function POST(reqest: Request) {
    const body = await reqest.json()
    try {
        const filePath = path.join(
            process.cwd(),
            `/users/${body.userID}/dataset.csv`
        )
        const fileStatus = await fs.stat(filePath)

        if (fileStatus) {
            const fileStream = await fs.readFile(filePath)
            const file = new Blob([fileStream], {type: 'text/csv'})
            const formData = new FormData()
            formData.append('file', file)

            try {
                const res = await fetch(`http://127.0.0.1:${body.port}/file-upload`, {
                    method: 'POST',
                    body: formData
                })
                const data = await res.json()
                return NextResponse.json({"msg": 'done'})
            } catch {
                return NextResponse.json({"msg": 'failed'})
            }
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({"msg": 'failed'})
    }
    return NextResponse.json({"msg": 'failed'})
}
