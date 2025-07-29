export interface ITreeData {
  id: string;
  label: string;
  parent: string | null;
  isMain?: boolean;
}

export const treeData = [
  { id: '1', label: 'Father', parent: null, isMain: true },
  { id: '2', label: 'Child 1', parent: '1' },
  { id: '3', label: 'Child 2', parent: '1' },
  { id: '4', label: 'Child 3', parent: '1' },
  { id: '5', label: 'Grandchild 1', parent: '2' },
  { id: '6', label: 'Grandchild 2', parent: '2' },
];
