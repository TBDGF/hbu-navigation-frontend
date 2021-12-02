import Graph from "./Graph";
import {useRequest} from "ahooks";
import {getWebGraph} from "./api/requests";


const handleWebGraph = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            getWebGraph().then(
                result => resolve(result)
            )
        }, 1000);
    });
}

function App() {
    const {data, error, loading} = useRequest(handleWebGraph);

    if (!loading) {
        data.nodes.forEach(item=>{
            item.x*=1.2
            item.y*=1.2
        })
        return (
            <Graph data={data}/>
        )
    } else {
        return (
            <div>hello</div>
        )
    }
}

export default App;
