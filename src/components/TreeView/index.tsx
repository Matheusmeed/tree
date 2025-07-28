import { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  MiniMap,
} from 'react-flow-renderer';
import dagre from 'dagre';
import { Container } from './styles';
import CustomNode from '../CustomNode';
import { treeData } from './data';

const nodeTypes = {
  custom: CustomNode,
};

const nodeWidth = 160;
const nodeHeight = 130;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
dagreGraph.setGraph({ rankdir: 'TB' });

const TreeView = () => {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    treeData.forEach((item) => {
      dagreGraph.setNode(item.id, { width: nodeWidth, height: nodeHeight });
    });

    treeData.forEach((item) => {
      if (item.parent) {
        dagreGraph.setEdge(item.parent, item.id);
        edges.push({
          id: `e-${item.parent}-${item.id}`,
          source: item.parent,
          target: item.id,
          animated: false,
          style: { stroke: '#464646' },
        });
      }

      nodes.push({
        id: item.id,
        data: { label: item.label },
        position: { x: 0, y: 0 },
        type: 'custom',
      });
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const pos = dagreGraph.node(node.id);
      node.position = { x: pos.x - nodeWidth / 2, y: pos.y - nodeHeight / 2 };
    });

    return { nodes, edges };
  }, []);

  return (
    <Container>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <MiniMap
          nodeColor='#5d5d5d'
          nodeStrokeColor='#5d5d5d'
          nodeBorderRadius={8}
          maskColor='rgba(255, 255, 255, 0.1)'
          style={{ background: '#00000062' }}
        />
        <Background color='#272726' gap={20} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </Container>
  );
};

export default TreeView;
