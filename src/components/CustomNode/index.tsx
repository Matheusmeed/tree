import { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import type { ITreeData } from '../TreeView/data';
import { BodyDiv, Card, OptionsButton, TitleDiv } from './styles,';

const CustomNode = ({ data }: { data: ITreeData }) => {
  console.log(data);
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
          <OptionsButton>
            <img src='/assets/icons/options.svg' alt='' />
          </OptionsButton>
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
