import {promises as fs} from 'fs'
import yaml from 'js-yaml'
import {NextResponse} from 'next/server'
import path from 'path'

export async function POST(reqest: Request) {
    const body = await reqest.json()
    console.log(body)
    try {
        // const yamlDirectory = path.join(process.cwd(), '/src/app/api/docker-setup/yamlFiles/docker-compose.yml');
        const pathDir = path.join(process.cwd(), `/users/${body.userID}`)
        await fs.mkdir(pathDir, {recursive: true})
        const dirStatus = await fs.stat(pathDir)
        if (dirStatus.isDirectory()) {
            const mlFolder = path.join(process.cwd(), `/dockerImage`)
            const checkFile = mlFolder + `/${body.userID}.yml`
            let check = false
            try {
                await fs.access(checkFile)
                check = true
            } catch {
                check = false
            }
            if (check) {
                const portsFile = path.join(process.cwd(), `/yamlFiles/ports.json`)
                const configString = await fs.readFile(portsFile, 'utf8')
                const configJSON = await JSON.parse(configString)

                return NextResponse.json({port: configJSON[body.userID], "status": "done"})
            } else {
                const srcDir = path.join(process.cwd(), `/yamlFiles/docker-compose.yml`,)


                const portsFile = path.join(process.cwd(), `/yamlFiles/ports.json`)
                const configString = await fs.readFile(portsFile, 'utf8')
                const configJSON = await JSON.parse(configString)
                const arrIndex = configJSON.ports.length - 1
                const newPortNumber = parseInt(configJSON.ports[arrIndex]) + 1
                configJSON.ports.push(newPortNumber)
                configJSON[body.userID] = newPortNumber
                const strConfigJSON = JSON.stringify(configJSON)
                await fs.writeFile(portsFile, strConfigJSON)

                const ymlFile = await fs.readFile(srcDir, 'utf8')
                const data = yaml.load(ymlFile)
                data['services'][body.userID] = {
                    ...data['services']['ml'],
                    container_name: body.userID,
                    ports: [newPortNumber + ":8000"]
                }
                // data['services']['ml']['container_name'] = body.userID
                // data['services']['ml']['ports'] = [newPortNumber+":8000"]
                data['services']['celery_worker' + body.userID] = {
                    ...data['services']['celery_worker'],
                    container_name: 'celery_worker' + body.userID,
                    depends_on: [`${body.userID}`]
                }
                // data['services']['celery_worker']['container_name'] = 'celery_worker' + body.userID
                // data['services']['celery_worker']['depends_on'] = [`${body.userID}`]
                delete data['services']['ml']
                delete data['services']['celery_worker']
                const newYML = yaml.dump(data)
                await fs.writeFile(mlFolder + `/${body.userID}.yml`, newYML)
                return NextResponse.json({port: newPortNumber, "status": "done"})
            }
            // await fs.copyFile(srcDir, pathDir+`/${body.userID}.yml`)

        }
        // const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
        // const file = await fs.readFile(yamlDirectory , 'utf8')
        // console.log("file",file)
        // const doc = yaml.load(file)
        // console.log(doc.services.celery_worker)
    } catch (e) {
        console.log(e)
    }
    return NextResponse.json({yaml: 'check'})
}
