import { NextResponse } from "next/server"
// const Docker = require('dockerode')
import {mem} from 'systeminformation'

export async function GET(reqest: Request){
    const siMemLoad = ((await mem()))
    return NextResponse.json({siMemLoad})
}