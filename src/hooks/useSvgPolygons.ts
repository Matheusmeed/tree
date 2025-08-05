import { useEffect, useState } from 'react';

export interface SvgPath {
  id: string;
  d: string;
  color: string;
}

export interface SvgData {
  width: number;
  height: number;
  paths: SvgPath[];
}

export function useSvgData(url: string) {
  const [svgData, setSvgData] = useState<SvgData | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        const svgText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');

        if (!svgElement) {
          console.error('SVG element not found');
          return;
        }

        const widthAttr = svgElement.getAttribute('width') ?? '0';
        const heightAttr = svgElement.getAttribute('height') ?? '0';

        const width = parseFloat(widthAttr.replace(/[^\d.]/g, ''));
        const height = parseFloat(heightAttr.replace(/[^\d.]/g, ''));

        const pathElements = Array.from(doc.querySelectorAll('path'));

        const parsedPaths = pathElements
          .map((path, index) => ({
            id: path.id || `path-${index}`,
            d: path.getAttribute('d') || '',
            color: path.getAttribute('fill') || '',
          }))
          .filter((path) => {
            const color = path.color.toLowerCase();
            return color !== '#000000' && color !== 'black';
          });

        setSvgData({ width, height, paths: parsedPaths });
      } catch (error) {
        console.error('Erro ao carregar o SVG:', error);
      }
    };

    fetchSvg();
  }, [url]);

  return svgData;
}
