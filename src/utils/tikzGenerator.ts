import { fabric } from 'fabric';

export function generateTikZCode(canvas: fabric.Canvas): string {
  const objects = canvas.getObjects();
  
  if (objects.length === 0) {
    return `\\begin{tikzpicture}
% Your diagram will appear here
\\end{tikzpicture}`;
  }

  let tikzCode = '\\begin{tikzpicture}\n';
  
  objects.forEach((obj, index) => {
    const tikzObject = convertToTikZ(obj);
    if (tikzObject) {
      tikzCode += `  ${tikzObject}\n`;
    }
  });
  
  tikzCode += '\\end{tikzpicture}';
  
  return tikzCode;
}

function convertToTikZ(obj: fabric.Object): string | null {
  const left = obj.left || 0;
  const top = obj.top || 0;
  const width = (obj as any).width || 0;
  const height = (obj as any).height || 0;
  
  // Convert coordinates from canvas to TikZ coordinates
  const x = left;
  const y = -(top + height); // Flip Y-axis for TikZ
  
  const strokeColor = (obj as any).stroke || 'black';
  const fillColor = (obj as any).fill || 'white';
  const strokeWidth = (obj as any).strokeWidth || 1;
  
  switch (obj.type) {
    case 'rect':
      return `\\draw[${getStrokeStyle(strokeColor, strokeWidth)}, fill=${getTikZColor(fillColor)}] (${x},${y}) rectangle (${x + width},${y + height});`;
    
    case 'circle':
      const radius = Math.min(width, height) / 2;
      const centerX = x + width / 2;
      const centerY = y + height / 2;
      return `\\draw[${getStrokeStyle(strokeColor, strokeWidth)}, fill=${getTikZColor(fillColor)}] (${centerX},${centerY}) circle (${radius});`;
    
    case 'line':
      const points = (obj as any).points || [];
      if (points.length >= 2) {
        const start = points[0];
        const end = points[points.length - 1];
        return `\\draw[${getStrokeStyle(strokeColor, strokeWidth)}] (${start.x},${-start.y}) -- (${end.x},${-end.y});`;
      }
      return null;
    
    case 'path':
      // Handle freehand drawing
      const path = (obj as any).path || [];
      if (path.length > 0) {
        let pathString = `\\draw[${getStrokeStyle(strokeColor, strokeWidth)}] `;
        path.forEach((point: any, i: number) => {
          if (i === 0) {
            pathString += `(${point.x},${-point.y})`;
          } else {
            pathString += ` -- (${point.x},${-point.y})`;
          }
        });
        pathString += ';';
        return pathString;
      }
      return null;
    
    case 'text':
      const text = (obj as any).text || '';
      const fontSize = (obj as any).fontSize || 12;
      const fontFamily = (obj as any).fontFamily || 'Arial';
      return `\\node[anchor=west] at (${x},${y}) {\\fontsize{${fontSize}}{${fontSize * 1.2}}\\selectfont ${text}};`;
    
    default:
      return null;
  }
}

function getStrokeStyle(color: string, width: number): string {
  const tikzColor = getTikZColor(color);
  return `color=${tikzColor}, line width=${width}pt`;
}

function getTikZColor(color: string): string {
  // Convert hex colors to TikZ color names
  const colorMap: Record<string, string> = {
    '#000000': 'black',
    '#ffffff': 'white',
    '#ff0000': 'red',
    '#00ff00': 'green',
    '#0000ff': 'blue',
    '#ffff00': 'yellow',
    '#ff00ff': 'magenta',
    '#00ffff': 'cyan',
    '#808080': 'gray',
    '#c0c0c0': 'lightgray'
  };
  
  return colorMap[color.toLowerCase()] || color;
} 