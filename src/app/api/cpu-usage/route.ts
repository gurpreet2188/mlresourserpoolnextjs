import { NextResponse } from "next/server"
// const Docker = require('dockerode')
import {currentLoad} from 'systeminformation'

export async function GET(reqest: Request){
    const siCPULoad = (((await currentLoad()).currentLoad))
    return NextResponse.json({siCPULoad})
}