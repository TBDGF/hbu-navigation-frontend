import React, {useContext, useState, useEffect} from 'react';
import Graphin, {IG6GraphEvent, GraphinContext, Utils} from '@antv/graphin';
import {Tooltip, FindPathPanel, Toolbar} from '@antv/graphin-components';
import {INode, NodeConfig} from '@antv/g6';
import {useRequest} from "ahooks";
import {getWebGraph, getWebPaths} from "./api/requests";

const ShowPaths = (props) => {
    const {graph} = useContext(GraphinContext);
    const nodes = graph.getNodes();
    const edges = graph.getEdges();
    const [focused, setFocused] = useState(null);

    useEffect(() => {

        const handleClick = (evt) => {
            const nodes = graph.findAllByState("node", "selected")
            let array = nodes.map(node => {
                return node.getModel().id
            })
            setFocused(array)
            console.log(nodes[0].getModel().id)
        };

        graph.on('node:click', handleClick);
        return () => {
            graph.off('node:click', handleClick);
        };
    }, []);

    function handleShowPath(path) {
        nodes.forEach(node => {
            const model = node.getModel();
            if (!path.nodes.includes(model.id)) {
                graph.setItemState(node, 'inactive', true);
            }
        });
        edges.forEach(edge => {
            const model = edge.getModel();
            if (!path.edges.includes(model.id)) {
                graph.setItemState(edge, 'inactive', true);
                graph.updateItem(model.id,{
                    style:{
                        label:{
                            value:model.style.label.value,
                            opacity:0
                        }
                    }
                })
            } else {
                graph.setItemState(edge, 'active', true);
                graph.updateItem(model.id,{
                    style:{
                        label:{
                            value:model.style.label.value,
                            opacity:1
                        }
                    }
                })
            }
        });
    }

    function handleClear(path) {
        nodes.forEach(node => {
            const model = node.getModel();
            if (!path.nodes.includes(model.id)) {
                graph.setItemState(node, 'inactive', false);
            }
        });
        edges.forEach(edge => {
            const model = edge.getModel();
            if (!path.edges.includes(model.id)) {
                graph.setItemState(edge, 'inactive', false);
                graph.updateItem(model.id,{
                    style:{
                        label:{
                            value:model.style.label.value,
                            opacity:1
                        }
                    }
                })
            } else {
                graph.setItemState(edge, 'active', false);
                graph.updateItem(model.id,{
                    style:{

                        label:{
                            value:model.style.label.value,
                            opacity:1
                        }
                    }
                })
            }
        });
    }

    if (props.paths!=null){
        return (
            <div style={{position: 'absolute', top: 5}}>
                <ul className="status-ul">
                    <h3>{focused}</h3>

                    {props.paths.map((path, index) => {
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <li key={index} onMouseEnter={() => handleShowPath(path)}
                                onMouseLeave={() => handleClear(path)}
                            >
                                路径-{index + 1}
                                <button onClick={}>显示</button><button>取消</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }else
        return null;
};

const handleWebPaths = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            getWebPaths("图书馆","南1门口").then(
                result => resolve(result)
            )
        }, 1000);
    });
}

export default function Graph(props) {
    const {data, error, loading} = useRequest(handleWebPaths);
    console.log(data)
    return (
        <Graphin data={props.data} layout={{type: 'gForce',nodeSize: 10,preventOverlap:true}}>
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
            <ShowPaths paths={loading?null:data}/>
        </Graphin>
    )
}