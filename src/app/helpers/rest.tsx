export async function MLResourcePoolREST(
    url: string,
    method = 'GET',
    body: BodyInit | null = null
) {
    const res = await fetch(url, {method: method, body: body})
    
        const data = await res.json()
        console.log("msg", data)
        return await data
}
