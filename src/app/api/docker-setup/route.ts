import {promises as fs} from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { NextResponse } from "next/server"


export async function GET(reqest: Request) {
  try {
    const yamlDirectory = path.join(process.cwd(), '/src/app/api/docker-setup/yamlFiles/docker-compose.yml');

  
    // const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
    const file = await fs.readFile(yamlDirectory , 'utf8')
    console.log("file",file)
    const doc = yaml.load(file)
    console.log(doc.services.celery_worker)
  } catch (e) {
    console.log(e)
  }
  return NextResponse.json({ "yaml": "check" })
}