import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(reqest: Request) {
  const body = await reqest.json()
  console.log(body['userID'])
  try {
    // const yamlDirectory = path.join(process.cwd(), '/src/app/api/docker-setup/yamlFiles/docker-compose.yml');
    const pathDir = path.join(process.cwd(), `/users/${body.userID}`)
    // const jsonData = JSON.stringify(body.config)
    await fs.mkdir(pathDir, { recursive: true })
    const dirStatus = await fs.stat(pathDir)
    if (dirStatus.isDirectory()) {
      const configString =  await fs.readFile(pathDir + `/nodeConfig.json`,'utf8')
      const configJSON = await JSON.parse(configString)
      return NextResponse.json({ 'userConfig': true,  'config': configJSON.config, settings: configJSON.settings} )
    } else {
      return NextResponse.json({ "userConfig": false })
    }
  } catch (e) {
    console.log(e)
  }
  return NextResponse.json({ yaml: 'check' })
}
