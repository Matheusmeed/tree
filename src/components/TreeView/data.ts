export interface ITreeData {
  id: string;
  label: string;
  type?: string;
  parent: string | null;
  isMain?: boolean;
  showNodeMenu: string | null;
  setShowNodeMenu: React.Dispatch<React.SetStateAction<string | null>>;
  toggleCollapseNodes: (nodeId: string) => void;
  hasCollapsedChildren: boolean;
  collapseCount: number;
  hasChildren: boolean;
  isSpotlight?: boolean;
  isMaskPoint?: boolean;
  isHidden: boolean;
  toggleHideNodes: (nodeId: string) => void;
  parentIsHidden: boolean;
  isSelected: boolean;
}

export const treeData = [
  { id: '1', label: 'Start', parent: null, isMain: true },
  { id: '2', label: 'Child 1', parent: '1', isMaskPoint: true },
  { id: '3', label: 'Child 2', parent: '1', isMaskPoint: true },
  { id: '4', label: 'Child 3', parent: '1', isMaskPoint: true },
  {
    id: '5',
    label: 'Natural Park',
    type: 'Images & Video',
    parent: '2',
    isSpotlight: true,
  },
  {
    id: '6',
    label: 'Pool',
    type: 'Images & Video',
    parent: '2',
    isSpotlight: true,
  },
];
