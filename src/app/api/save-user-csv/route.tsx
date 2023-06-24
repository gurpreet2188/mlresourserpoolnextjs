import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'
import Papa from 'papaparse'

export async function POST (reqest: Request) {
  const body = await reqest.json()
  try {
    
    const pathDir = path.join(process.cwd(), `/users/${body.userID}`)
    const dirStatus = await fs.stat(pathDir)
    if (dirStatus.isDirectory()) {
      const unParsedData = Papa.unparse(body.csvData)
      
      await fs.writeFile(pathDir+`/dataset.csv`, unParsedData)
    }
  } catch (e) {
    console.log(e)
  }
  return NextResponse.json({ yaml: 'check' })
}
