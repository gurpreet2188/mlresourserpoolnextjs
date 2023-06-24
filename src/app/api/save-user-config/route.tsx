import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST (reqest: Request) {
  const body = await reqest.json()
  // console.log(body['userID'])
  try {
    // const yamlDirectory = path.join(process.cwd(), '/src/app/api/docker-setup/yamlFiles/docker-compose.yml');
    const pathDir = path.join(process.cwd(), `/users/${body.userID}`)
   
    const nodeJSON = JSON.stringify({settings: body.settings, config: body.config})

    await fs.mkdir(pathDir, { recursive: true })
    const dirStatus = await fs.stat(pathDir)
    if (dirStatus.isDirectory()) {
      await fs.writeFile(pathDir+`/nodeConfig.json`, nodeJSON)
    }
  } catch (e) {
    console.log(e)
  }
  return NextResponse.json({ yaml: 'check' })
}
