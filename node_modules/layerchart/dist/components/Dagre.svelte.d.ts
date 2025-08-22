import { type Snippet } from 'svelte';
import dagre, { type Edge, type EdgeConfig, type GraphEdge } from '@dagrejs/dagre';
export type DagreGraphData = {
    nodes: Array<{
        id: string;
        parent?: string;
        label?: string | dagre.Label;
    }>;
    edges: Array<{
        source: string;
        target: string;
        label?: string;
    }>;
};
export declare const RankDir: {
    'top-bottom': string;
    'bottom-top': string;
    'left-right': string;
    'right-left': string;
};
export declare const Align: {
    none: undefined;
    'up-left': string;
    'up-right': string;
    'down-left': string;
    'down-right': string;
};
export declare const EdgeLabelPosition: {
    left: string;
    center: string;
    right: string;
};
export type DagreProps = {
    /**
     * Data of nodes and edges to build graph
     */
    data: DagreGraphData;
    /**
     * Function to extract nodes from data
     * @default (d: any) => d.nodes
     */
    nodes?: (d: any) => any;
    /**
     * Function to extract node ID from node data
     * @default (d: any) => d.id
     */
    nodeId?: (d: any) => any;
    /**
     * Function to extract edges from data
     * @default (d: any) => d.edges
     */
    edges?: (d: any) => any;
    /**
     * Set graph as directed (true, default) or undirected (false),
     * which does not treat the order of nodes in an edge as significant
     * @default true
     */
    directed?: boolean;
    /**
     * Allow a graph to have multiple edges between the same pair of nodes
     * @default false
     */
    multigraph?: boolean;
    /**
     * Allow a graph to have compound nodes - nodes which can be the
     * `parent` of other nodes
     * @default false
     */
    compound?: boolean;
    /**
     * Type of algorithm to assigns a rank to each node in the input graph
     * @default 'network-simplex'
     */
    ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
    /**
     * Direction for rank nodes
     * @default 'top-bottom'
     */
    direction?: keyof typeof RankDir;
    /**
     * Alignment for rank nodes
     * @default undefined
     */
    align?: keyof typeof Align | undefined;
    /**
     * Number of pixels between each rank in the layout
     * @default 50
     */
    rankSeparation?: number;
    /**
     * Number of pixels that separate nodes horizontally in the layout
     * @default 50
     */
    nodeSeparation?: number;
    /**
     * Number of pixels that separate edges horizontally in the layout
     * @default 10
     */
    edgeSeparation?: number;
    /**
     * Default node width if not defined on node
     * @default 100
     */
    nodeWidth?: number;
    /**
     * Default node height if not defined on node
     * @default 50
     */
    nodeHeight?: number;
    /**
     * Default link label width if not defined on edge
     * @default 100
     */
    edgeLabelWidth?: number;
    /**
     * Default edge label height if not defined on edge
     * @default 20
     */
    edgeLabelHeight?: number;
    /**
     * Default edge label position
     * @default 'center'
     */
    edgeLabelPosition?: keyof typeof EdgeLabelPosition;
    /**
     * Default pixels to move the label away from the edge if not defined on edge
     * Applies only when labelpos is l or r
     * @default 10
     */
    edgeLabelOffset?: number;
    /**
     * Filter nodes
     * @default () => true
     */
    filterNodes?: (nodeId: string, graph: dagre.graphlib.Graph) => boolean;
    /**
     * Exposed to access to Dagre Graph instance via `bind:graph`
     */
    graph?: dagre.graphlib.Graph;
    children?: Snippet<[
        {
            nodes: Array<dagre.Node>;
            edges: Array<Edge & EdgeConfig & GraphEdge>;
            graph: dagre.graphlib.Graph;
        }
    ]>;
};
declare const Dagre: import("svelte").Component<DagreProps, {}, "graph">;
type Dagre = ReturnType<typeof Dagre>;
export default Dagre;
