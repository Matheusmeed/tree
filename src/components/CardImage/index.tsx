import { useSvgData } from '../../hooks/useSvgData';
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

  const selectedPaths = svgData?.paths.filter((p) => p.color === color) || [];

  // Se existirem paths com a cor selecionada, calcule os limites
  let viewBox = `0 0 ${svgData?.width} ${svgData?.height}`;
  if (selectedPaths.length > 0) {
    // Extrair todos os pontos das coordenadas "d"
    const allPoints: { x: number; y: number }[] = [];

    selectedPaths.forEach((path) => {
      const matches = path.d.match(/[-+]?[0-9]*\.?[0-9]+/g); // extrai números
      if (matches) {
        for (let i = 0; i < matches.length; i += 2) {
          const x = parseFloat(matches[i]);
          const y = parseFloat(matches[i + 1]);
          if (!isNaN(x) && !isNaN(y)) {
            allPoints.push({ x, y });
          }
        }
      }
    });

    // Calcular min/max de X e Y
    const minX = Math.min(...allPoints.map((p) => p.x));
    const maxX = Math.max(...allPoints.map((p) => p.x));
    const minY = Math.min(...allPoints.map((p) => p.y));
    const maxY = Math.max(...allPoints.map((p) => p.y));

    // Definir viewBox com uma pequena margem
    const padding = 10;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;
    viewBox = `${minX - padding} ${minY - padding} ${width} ${height}`;
  }

  return (
    <BackgroundWrapper>
      {color ? (
        <SvgWrapper
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <svg
            viewBox={viewBox}
            preserveAspectRatio='xMidYMid meet'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              filter: isHidden ? 'grayscale(100%)' : 'none',
            }}
          >
            <image
              href={img}
              x='0'
              y='0'
              width={svgData?.width}
              height={svgData?.height}
              preserveAspectRatio='xMidYMid meet'
            />
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
      ) : (
        <>
          <BackgroundImage src={img} alt='Card Image' isHidden={isHidden} />
        </>
      )}
    </BackgroundWrapper>
  );
};

export default CardImage;
