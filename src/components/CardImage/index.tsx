import { useSvgData } from '../../hooks/useSvgPolygons';
import { BackgroundImage, BackgroundWrapper, SvgWrapper } from './styles';

const CardImage = ({
  img,
  isHidden,
  color,
}: {
  img: string;
  isHidden: boolean;
  color: string;
}) => {
  const svgData = useSvgData('/assets/images/mask.svg');

  return (
    <BackgroundWrapper>
      <BackgroundImage src={img} alt='Card Image' isHidden={isHidden} />
      {!!color && (
        <SvgWrapper
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <svg
            viewBox={`0 0 ${svgData?.width} ${svgData?.height}`}
            preserveAspectRatio='none'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
            }}
          >
            {svgData?.paths.map((svgPoint) => {
              if (svgPoint.color === color) {
                return (
                  <path
                    key={svgPoint.id}
                    d={svgPoint.d}
                    fill={color}
                    style={{
                      transition: 'opacity 0.3s',
                      pointerEvents: 'auto',
                    }}
                    onClick={() => {
                      console.log('oi');
                    }}
                    opacity={0.4}
                  />
                );
              }
            })}
          </svg>
        </SvgWrapper>
      )}
    </BackgroundWrapper>
  );
};

export default CardImage;
