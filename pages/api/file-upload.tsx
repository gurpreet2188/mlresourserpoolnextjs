import { NextResponse } from 'next/server'
import fs from 'fs'
export const config = {
    runtime: 'experimental-edge',
    api: {
        bodyParser: {
            sizeLimit: '40mb' // Set desired value here
        }
    }
}

export default async function POST (req: Request) {
  try {
    //   console.log(req)
    const formData = await req.formData()
    const file = await formData.get('file')

    console.log(file)

    const reader =  new FileReader()
    reader.onload = function (e) {
      const csvData = e.target.result;
  
      Papa.parse(csvData, {
        complete: function (results) {
          const { data } = results;
          
          // Extract the columns from the first row of data
          const columns = data.length > 0 ? data[0] : [];
  
          // Handle the columns as needed
          console.log(columns); // Array containing the column names
  
          // Rest of your code...
        },
      })
    }
  
    reader.readAsText(file)
  
    return NextResponse.json({ 'msg': "file recieved"})
  } catch (err) {
    console.log("errorNext",err)

    return NextResponse.json({ err }, { status: 400 })
  }
}
