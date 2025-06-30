export type ToolType = 'select' | 'draw' | 'rectangle' | 'circle' | 'line' | 'arrow' | 'text';

export interface ShapeProperties {
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  fontSize: number;
  fontFamily: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface TikZObject {
  type: string;
  properties: Record<string, any>;
  points?: Point[];
} 