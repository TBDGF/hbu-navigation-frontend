import React, {useContext, useState, useEffect} from 'react';
import Graphin, {GraphinContext} from '@antv/graphin';
import {Tooltip} from '@antv/graphin-components';
import {useRequest} from "ahooks";
import {getWebPaths} from "./api/requests";

const ShowPaths = () => {
    const {graph} = useContext(GraphinContext);
    const nodes = graph.getNodes();
    const edges = graph.getEdges();
    const [focused, setFocused] = useState(["第七教学楼", "学生宿舍梅园1号"]);
    const [pass,setPass]=useState([])
    const [selecting,setSelecting]=useState(false)

    const {data, error, loading, run} = useRequest(() => handleWebPaths(focused[0], focused[1], pass), {
        manual: true,
    });

    const handleWebPaths = (start, destination, pass) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                getWebPaths(start, destination, pass).then(
                    result => resolve(result)
                )
            }, 1000);
        });
    }

    useEffect(() => {

        const handleSelectChange = (target, selectedItems) => {

            if (target.select) {
                let array = target.selectedItems.nodes.map(node => {
                    return node.getModel().id
                })
                if (array.length === 2)
                    setFocused(array)
            }

        }

        graph.on("nodeselectchange", handleSelectChange);

    }, []);

    useEffect(() => {
        run()
    }, [focused])

    function handleShowPath(path,color) {
        nodes.forEach(node => {
            const model = node.getModel();
            if (path.nodes.includes(model.id)) {
                graph.setItemState(node, 'inactive', false);
            }
        });
        edges.forEach(edge => {
            const model = edge.getModel();
            if (path.edges.includes(model.id)) {
                graph.setItemState(edge, 'inactive', false);
                graph.updateItem(model.id, {
                    style: {
                        label: {
                            value: model.style.label.value,
                            opacity: 1
                        },
                        keyshape:{
                            stroke:color
                        }
                    }
                })
            }
        });
    }

    const handleShowPaths = (paths) => {
        console.log(paths)
        nodes.forEach(node => {
            const model = node.getModel();
            graph.setItemState(node, 'inactive', true);
        });
        edges.forEach(edge => {
            const model = edge.getModel();
            graph.setItemState(edge, "inactive", true)
            graph.updateItem(model.id, {
                style: {
                    label: {
                        value: model.style.label.value,
                        opacity: 0
                    },
                    keyshape:{
                        stroke:"#DDDDDD"
                    }
                }
            })
        })
        const colors=["red","orange","yellow","green","cyan","blue","purple"]
        paths.map((path,index) => {
            handleShowPath(path,colors[index])
        })
    }

    const handleClearPaths = (paths) => {
        paths.map(path => {
            handleClear(path)
        })
    }

    function handleClear(path) {
        nodes.forEach(node => {
            const model = node.getModel();
            graph.setItemState(node, 'inactive', false);
        });
        edges.forEach(edge => {
            const model = edge.getModel();
            graph.setItemState(edge, 'inactive', false);
            graph.updateItem(model.id, {
                style: {
                    label: {
                        value: model.style.label.value,
                        opacity: 1
                    },
                    keyshape:{
                        stroke:"#DDDDDD"
                    }
                }
            })
        });
    }

    return (
        <div style={{position: 'absolute', top: 5}}>
            <ul className="status-ul">
                <h3>请使用Ctrl或Shift来多选节点</h3>
                <h3>已选择: <span style={{color: "red"}}>{focused[0] + " to " + focused[1]}</span></h3>
                <h4>Designed&Made By AllenJi</h4>
                {(!loading && error === undefined && data !== undefined) ?
                    <div>
                        路径:
                        <button style={{marginLeft:5}} onClick={() => handleShowPaths(data)}>显示</button>
                        <button style={{marginLeft:5}} onClick={() => handleClearPaths(data)}>隐藏</button>
                    </div>
                    : null
                }
            </ul>
        </div>
    );
}

export default function Graph(props) {


    return (
        <Graphin data={props.data}
            // layout={{type: 'gForce', nodeSize: 10, preventOverlap: true, nodeSpacing: 10,}}
                 layout={{type: "preset"}}
                 height={900}
        >
            <Tooltip bindType="node" hasArrow={true}>
                <Tooltip.Node>
                    {model => {
                        return (
                            <div>
                                {model.information}
                            </div>
                        );
                    }}
                </Tooltip.Node>
            </Tooltip>
            <ShowPaths/>
        </Graphin>
    )
}