'use client'

import {usePathname} from 'next/navigation'
import MLResourcePool from '../MLResourcePool'
import {createContext, useEffect, useState} from 'react'


export const UserIDContext = createContext()
export default function Home() {
    const userid = usePathname()?.replace('/', '')
    const [port, setPort] = useState(8000)
    const [checkDocker, setCheckDokcer] = useState(false)
    useEffect(() => {
        const f = async () => {
            const res = await fetch('/api/create-user', {method: 'POST', body: JSON.stringify({userID: userid})})
            const d = await res.json()
            console.log(d)
            setPort(d?.port)

            if (d.status === 'done') {
                const res = await fetch('/api/start-docker', {method: 'POST', body: JSON.stringify({userID: userid})})
                const d = await res.json()
                console.log(d)

                const dockerCheckInterval = setInterval(async () => {
                    const dockerRes = await fetch('/api/check-docker-container', {
                        method: 'POST',
                        body: JSON.stringify({userID: userid})
                    })
                    const dockerData = await dockerRes.json()
                    console.log(dockerData)
                    if (dockerData.msg) {
                        clearInterval(dockerCheckInterval)
                        setCheckDokcer(true)
                    }
                }, 7000)
            }
        }
        f()
    }, [userid])

    return (
        <UserIDContext.Provider value={[userid, port]}>
            <div
                className='flex flex-row  w-[100%] h-[100%] relative'
                style={{backgroundColor: '#1e1e1e'}}
            >
                <h1 className='text-white text-2xl absolute right-[1rem] top-[1rem]'>{userid}</h1>
                <MLResourcePool/>

                <div className='absolute left-[1rem] bottom-[1rem]'>
                    <p className='text-white text-lg'>Docker Container: {checkDocker ? "Connected" : "Connecting..."}</p>
                </div>
            </div>
        </UserIDContext.Provider>
    )
}
