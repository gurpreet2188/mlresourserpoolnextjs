import { NextResponse } from "next/server"
const Docker = require('dockerode')

export async function GET(reqest: Request){
    const docker = new Docker({socketPath: '/var/run/docker.sock'})
    let containersList = []
    await docker.listContainers((err:string, containers:Array<Object>) =>{
        for (const  i in containers) {
            console.log(containers[i]['Id'])
        }
        // containersList = containers[0]['Id']
        console.log(containersList, err)
    })
    return await NextResponse.json({containersList})
}