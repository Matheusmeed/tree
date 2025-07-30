import { memo, useEffect, useRef } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import type { ITreeData } from '../TreeView/data';
import { BodyDiv, Card, OptionsButton, TitleDiv, MenuDiv } from './styles';

const CustomNode = ({ data }: { data: ITreeData }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMenuOpen = data.showNodeMenu === data.id;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        data.setShowNodeMenu(null);
      }
    }
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ visibility: 'hidden' }}
      />
      <Card isMain={!!data.isMain}>
        <TitleDiv>
          <p>{data.label}</p>
          <OptionsButton onClick={() => data.setShowNodeMenu(data.id)}>
            <img src='/assets/icons/options.svg' alt='' />
          </OptionsButton>
          {isMenuOpen && (
            <MenuDiv ref={menuRef}>
              <button>
                <img src='/assets/icons/add.svg' />
                <p>Add Floorplan {data.label}</p>
              </button>
              <button onClick={() => data.toggleHideNodes?.(data.id)}>
                <img src='/assets/icons/hide.svg' />
                <p>
                  {data.hasHiddenChildren ? 'Show Children' : 'Hide Children'}
                </p>
              </button>
              <button>
                <img src='/assets/icons/delete.svg' />
                <p>Delete</p>
              </button>
            </MenuDiv>
          )}
        </TitleDiv>
        <BodyDiv>
          <img src='/assets/images/view.png' alt='' />
        </BodyDiv>
      </Card>
      <Handle
        type='source'
        position={Position.Bottom}
        style={{ visibility: 'hidden' }}
      />
    </>
  );
};

export default memo(CustomNode);
