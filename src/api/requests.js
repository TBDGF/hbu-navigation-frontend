const BASE_URL="http://hbu-navigation.allenji.cn/"

export async function getWebGraph() {
    let data
    await fetch(BASE_URL+"api/get")
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
    await fetch(BASE_URL+"api/traverse/dijkstra"+"?start="+start+"&destination="+destination)
        .then(res => res.json())
        .then(
            res => {
                data = res
            }
        )
    return data
}