import { memo, useEffect, useRef } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import type { ITreeData } from '../TreeView/data';
import {
  BodyDiv,
  Card,
  OptionsButton,
  TitleDiv,
  MenuDiv,
  ChildrenNumber,
  TypeDiv,
} from './styles';

const CustomNode = ({ data }: { data: ITreeData }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMenuOpen = data.showNodeMenu === data.id;

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLElement)
      ) {
        data.setShowNodeMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        style={{ visibility: 'hidden' }}
      />
      <Card isMain={!!data.isMain} isSpotlight={!!data.isSpotlight}>
        <TitleDiv isSpotlight={!!data.isSpotlight} isHidden={!!data.isHidden}>
          <p>{data.isSpotlight ? data.type : data.label}</p>
          <OptionsButton onClick={() => data.setShowNodeMenu(data.id)}>
            <img src='/assets/icons/options.svg' alt='' />
          </OptionsButton>
          {isMenuOpen && (
            <MenuDiv ref={menuRef}>
              <button>
                <img src='/assets/icons/add.svg' />
                <p>Add Floorplan {data.label}</p>
              </button>
              {data.hasChildren && (
                <button
                  onClick={() => {
                    data.toggleCollapseNodes?.(data.id);
                    data.setShowNodeMenu(null);
                  }}
                >
                  <img
                    src={`/assets/icons/${
                      data.hasCollapsedChildren ? 'expand_all' : 'collapse_all'
                    }.svg`}
                  />
                  <p>
                    {data.hasCollapsedChildren
                      ? 'Expand children'
                      : 'Collapse children'}
                  </p>
                </button>
              )}

              <button>
                <img src='/assets/icons/edit.svg' />
                <p>Edit</p>
              </button>
              {!data.parentIsHidden && (
                <button
                  onClick={() => {
                    data.toggleHideNodes?.(data.id);
                    data.setShowNodeMenu(null);
                  }}
                >
                  <img
                    src={`/assets/icons/${data.isHidden ? 'show' : 'hide'}.svg`}
                  />
                  <p>{data.isHidden ? 'Show' : 'Hide'}</p>
                </button>
              )}

              <button>
                <img src='/assets/icons/delete.svg' />
                <p>Delete</p>
              </button>
            </MenuDiv>
          )}
        </TitleDiv>
        <BodyDiv isHidden={!!data.isHidden}>
          {data.isSpotlight && <p>{data.label}</p>}
          {data.isMaskPoint && (
            <TypeDiv isHidden={!!data.isHidden}>
              <p>Mask point</p>
            </TypeDiv>
          )}
          {!data.isSpotlight && <img src='/assets/images/view.png' alt='' />}
          {data.hasCollapsedChildren && (
            <ChildrenNumber onClick={() => data.toggleCollapseNodes?.(data.id)}>
              <p>{data.collapseCount}</p>
            </ChildrenNumber>
          )}
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
