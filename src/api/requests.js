const BASE_URL="http://hbu-navigation.allenji.cn/"
const LOCAL_URL="http://localhost:8088/"

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

export async function getWebPaths(start,destination,pass) {
    if (pass==null||pass.length===0){
        let data
        await fetch(BASE_URL+"api/traverse/dijkstra"+"?start="+start+"&destination="+destination)
            .then(res => res.json())
            .then(
                res => {
                    data = res
                }
            )
        return data
    }else{
        let data
        let body={
            "start": start,
            "destination": destination,
            "pass": pass
        }
        await fetch(BASE_URL+"api/traverse/paths",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })
            .then(res => res.json())
            .then(
                res => {
                    data = res
                }
            )
        return data
    }

}