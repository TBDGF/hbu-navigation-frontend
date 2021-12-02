export const data = {
    nodes: [
        {
            id: 'library',
            type: 'graphin-circle',
            style: {
                label: {
                    value: '图书馆',
                },
            },
        },
        {
            id: 'north-gate-2',
            type: 'graphin-circle',
            style: {
                label: {
                    value: '北2门口',
                },
            },
        },
        {
            id: 'node-2',
            label: 'node-2',
            type: 'graphin-circle',
            style: {
                label: {
                    value: 'node-2',
                },
            },
        },
        {
            id: 'node-3',
            label: 'node-3',
            type: 'graphin-circle',
            style: {
                label: {
                    value: 'node-3',
                },
            },
        },
        {
            id: 'node-4',
            label: 'node-4',
            type: 'graphin-circle',
            style: {
                label: {
                    value: 'node-4',
                },
            },
        },
        {
            id: 'node-5',
            label: 'node-5',
            type: 'graphin-circle',
            style: {
                label: {
                    value: 'node-5',
                },
            },
        },
    ],
    edges: [
        { source: 'library', target: 'north-gate-2', id: 'edge1',
            style:{
                label: {
                    value:"77m",
                }
            }
        },
        { source: 'library', target: 'node-2', id: 'edge2' },
        { source: 'north-gate-2', target: 'node-3', id: 'edge3'},
        { source: 'node-2', target: 'node-3', id: 'edge4' },
        { source: 'node-3', target: 'node-4', id: 'edge5' },
    ],
};

export const paths = [
    { edges: ['edge1', 'edge3', 'edge5'], nodes: ['library', 'north-gate-2', 'node-3', 'node-4'] },
    { edges: ['edge2', 'edge4', 'edge5'], nodes: ['library', 'node-2', 'node-3', 'node-4'] },
];

