import {NextResponse} from "next/server"
import {ContainerInfo} from "dockerode";
import Dockerode from 'dockerode/index'
// const Docker = require('dockerode')
const dockerode = require('dockerode')
const docker = new dockerode({socketPath: '/var/run/docker.sock'})


export async function POST(reqest: Request):Promise<NextResponse> {
    const body = await reqest.json()

    const containers: Dockerode.ContainerInfo[] = await new Promise((resolve, reject) => {
        docker.listContainers((err: any, containers: Dockerode.ContainerInfo[]) => {
            if (err) reject(err);
            resolve(containers);
        });
    })

    let check = false
    containers.forEach((v: Dockerode.ContainerInfo) => {
        if (v['Names'][0] === `/${body.userID}`) {
            check = true
        }
    })

    return NextResponse.json({"msg": check})
}

