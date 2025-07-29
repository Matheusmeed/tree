import { memo, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import type { ITreeData } from '../TreeView/data';
import { BodyDiv, Card, OptionsButton, TitleDiv, MenuDiv } from './styles';

const CustomNode = ({ data }: { data: ITreeData }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

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
          <OptionsButton
            onClick={() => {
              setShowMenu(true);
            }}
          >
            <img src='/assets/icons/options.svg' alt='' />
          </OptionsButton>
          {showMenu && (
            <MenuDiv ref={menuRef}>
              <button>
                <img src='/public/assets/icons/add.svg' />
                <p>Add Floorplan Tower 1</p>
              </button>
              <button>
                <img src='/public/assets/icons/hide.svg' />
                <p>Hide</p>
              </button>
              <button>
                <img src='/public/assets/icons/delete.svg' />
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
