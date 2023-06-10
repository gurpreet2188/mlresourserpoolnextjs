import { NextResponse } from "next/server"
const Docker = require('dockerode')

export async function GET(reqest: Request){
    const docker = new Docker({socketPath: '/var/run/docker.sock'})
    let containersList = {} 
    docker.listContainers((err:string, containers:Array<Object>) =>{
        containersList = containers[0]
        console.log(containers, err)
    })
    return NextResponse.json({containersList})
}