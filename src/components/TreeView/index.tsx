import { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  MiniMap,
  type Node,
  type Edge,
  type ReactFlowInstance,
} from 'react-flow-renderer';
import dagre from 'dagre';
import { ButtonsDiv, Container } from './styles';
import CustomNode from '../CustomNode';
import { treeData } from './data';

const nodeTypes = { custom: CustomNode };
const nodeWidth = 160;
const nodeHeight = 130;
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: 'TB' });

const TreeView = () => {
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [showNodeMenu, setShowNodeMenu] = useState<string | null>(null);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hiddenNodes, setHiddenNodes] = useState<string[]>([]);

  const getAllDescendants = (parentId: string, allNodes: Node[]): string[] => {
    const directChildren = allNodes
      .filter((n) => n.data.parent === parentId)
      .map((n) => n.id);
    return directChildren.reduce<string[]>((acc, childId) => {
      return [...acc, childId, ...getAllDescendants(childId, allNodes)];
    }, []);
  };

  const toggleHideNodes = (nodeId: string) => {
    setHiddenNodes((prev) => {
      const descendants = getAllDescendants(nodeId, nodes);
      const isAlreadyHidden = descendants.every((id) => prev.includes(id));

      return isAlreadyHidden
        ? prev.filter((id) => !descendants.includes(id))
        : [...prev, ...descendants];
    });
  };

  useEffect(() => {
    const n: Node[] = [];
    const e: Edge[] = [];

    treeData.forEach((item) => {
      dagreGraph.setNode(item.id, { width: nodeWidth, height: nodeHeight });
    });

    treeData.forEach((item) => {
      if (item.parent) {
        dagreGraph.setEdge(item.parent, item.id);
        e.push({
          id: `e-${item.parent}-${item.id}`,
          source: item.parent,
          target: item.id,
          style: { stroke: '#464646' },
        });
      }

      n.push({
        id: item.id,
        data: item,
        position: { x: 0, y: 0 },
        type: 'custom',
      });
    });

    dagre.layout(dagreGraph);
    n.forEach((node) => {
      const pos = dagreGraph.node(node.id);
      node.position = { x: pos.x - nodeWidth / 2, y: pos.y - nodeHeight / 2 };
    });

    setNodes(n);
    setEdges(e);
  }, []);

  return (
    <Container>
      <ReactFlow
        nodes={nodes
          .filter((n) => !hiddenNodes.includes(n.id))
          .map((n) => {
            const descendants = getAllDescendants(n.id, nodes);
            const hasHiddenChildren = descendants.some((id) =>
              hiddenNodes.includes(id)
            );

            return {
              ...n,
              data: {
                ...n.data,
                showNodeMenu,
                setShowNodeMenu,
                toggleHideNodes,
                hasHiddenChildren,
              },
            };
          })}
        edges={edges.filter(
          (e) =>
            !hiddenNodes.includes(e.source) && !hiddenNodes.includes(e.target)
        )}
        nodeTypes={nodeTypes}
        fitView
        onInit={setRfInstance}
        nodesDraggable={false}
        nodesConnectable={false}
        selectNodesOnDrag={false}
        onPaneClick={() => setShowNodeMenu(null)}
      >
        <MiniMap
          nodeColor='#5d5d5d'
          nodeStrokeColor='#5d5d5d'
          nodeBorderRadius={8}
          maskColor='rgba(255, 255, 255, 0.1)'
          style={{ background: '#00000062', cursor: 'default' }}
        />
        <Background color='#272726' gap={20} size={1} />
        <ButtonsDiv>
          <button onClick={() => rfInstance?.fitView?.()}>
            <img src='/assets/icons/fit_view.svg' />
          </button>
          <button onClick={() => rfInstance?.zoomOut?.()}>
            <img src='/assets/icons/zoom_out.svg' />
          </button>
          <button onClick={() => rfInstance?.zoomIn?.()}>
            <img src='/assets/icons/zoom_in.svg' />
          </button>
        </ButtonsDiv>
      </ReactFlow>
    </Container>
  );
};

export default TreeView;
