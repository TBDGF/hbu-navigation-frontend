export async function getWebGraph() {
    let data
    await fetch("http://localhost:8080/api/get")
        .then(res => res.json())
        .then(
            res => {
                data = res
            }
        )
    return data
}

export async function getWebPaths(start,destination) {
    let data
    await fetch("http://localhost:8080/api/traverse/dijkstra"+"?start="+start+"&destination="+destination)
        .then(res => res.json())
        .then(
            res => {
                data = res
            }
        )
    return data
}