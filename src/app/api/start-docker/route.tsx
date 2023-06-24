import {NextResponse} from 'next/server'
import path from "path";
import {promises as fs} from "fs";
// const Dockerode = require('dockerode')
// var docker = new Dockerode({socketPath: '/var/run/docker.sock'});
import {exec} from "child_process";


export async function POST(reqest: Request) {
    const body = await reqest.json()
    const file = path.join(process.cwd(), `/dockerImage` + `/${body.userID}.yml`)
    let checkFile = false

    try {
        await fs.access(file)
        checkFile = true
    } catch {
        checkFile = false
        return NextResponse.json({error: "no file"})

    }


    try {
        if(checkFile){
           exec(`docker-compose -f ${file} up`, (err, stdout, stderr) => {
               if(err){
                   console.log(err)
               }
               if(stderr){
                   console.log(stderr)
               }
               if(stdout){
                   console.log(stdout)
               }
           })
        }
        return NextResponse.json({"msg": ""})

    } catch (e) {
        console.log("response error", e)
        return NextResponse.json({"msg": e})
    }
}
