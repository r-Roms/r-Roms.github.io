import type { Snippet } from 'svelte';
export type NodeExtraProperties = Record<string, any>;
export type SankeyProps = {
    /**
     * The function to get the nodes from the data.
     * @default (d: any) => d.nodes
     */
    nodes?: (d: any) => any;
    /**
     * The function to get the node ID from the node data.
     *
     * @default (d: any) => d.index
     */
    nodeId?: (d: any) => any;
    /**
     * @see https://github.com/d3/d3-sankey#alignments
     *
     * @default sankeyJustify
     */
    nodeAlign?: ((node: SankeyNode<any, any>, n: number) => number) | 'left' | 'right' | 'center' | 'justify';
    /**
     * The width of the nodes.
     *
     * @default 4
     */
    nodeWidth?: number;
    /**
     * The padding between nodes.
     *
     * @default 10
     */
    nodePadding?: number;
    /**
     * The function to sort the nodes.
     */
    nodeSort?: (a: SankeyNode<any, any>, b: SankeyNode<any, any>) => number | undefined;
    /**
     * The function to get the links from the data.
     *
     * @default (d: any) => d.links
     */
    links?: (d: any) => any;
    /**
     * The function to sort the links.
     *
     */
    linkSort?: (a: SankeyLink<any, any>, b: SankeyLink<any, any>) => number | undefined;
    /**
     * A function to be called when the data is updated.
     */
    onUpdate?: (data: SankeyGraph<{}, {}>) => void;
    children?: Snippet<[
        {
            nodes: SankeyNode<NodeExtraProperties, any>[];
            links: SankeyNode<NodeExtraProperties, any>[];
        }
    ]>;
};
import { type SankeyNode, type SankeyLink, type SankeyGraph } from 'd3-sankey';
declare const Sankey: import("svelte").Component<SankeyProps, {}, "">;
type Sankey = ReturnType<typeof Sankey>;
export default Sankey;
