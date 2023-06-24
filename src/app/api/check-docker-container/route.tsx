import {NextResponse} from "next/server"
// const Docker = require('dockerode')
const Dockerode = require('dockerode')
const docker = new Dockerode({socketPath: '/var/run/docker.sock'})


export async function POST(reqest: Request) {
    const body = await reqest.json()

    const containers = await new Promise((resolve, reject) => {
        docker.listContainers((err, containers) => {
            if (err) reject(err);
            resolve(containers);
        });
    })
    let check = false
    containers.forEach(v => {
        if (v['Names'][0] === `/${body.userID}`) {
            check = true
        }
    })

    return NextResponse.json({"msg": check})
}

