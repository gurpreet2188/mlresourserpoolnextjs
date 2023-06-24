import { NextResponse } from 'next/server'
import formidable from 'formidable-serverless'
import fs from 'fs'
import csv from 'csv-parser'

export async function POST (request: Request) {
  // console.log(request)
  const form = new formidable.IncomingForm()
  // form.uploadDir = './'
  form.keepExtensions = true
  // const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  // form.keepExtensions = true;
  form.parse(request, (err, fields, files) => {
    console.log(err, fields, files);
  })

  const { path: filePath, name: fileName } = files.file

  const columns: Array<string> = []

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('headers', headerList => {
      columns.push(...headerList)
    })
    .on('end', () => {
      fs.unlinkSync(filePath)

      return NextResponse.json({ columns: columns })
    })

  return NextResponse.json({ msg: 'file error' })
}
