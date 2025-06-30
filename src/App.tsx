import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import Toolbar from './components/Toolbar';
import CodePanel from './components/CodePanel.tsx';
import { generateTikZCode } from './utils/tikzGenerator.ts';
import { ToolType, ShapeProperties } from './types.ts';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [activeTool, setActiveTool] = useState<ToolType>('select');
  const [tikzCode, setTikzCode] = useState<string>('');
  const [properties, setProperties] = useState<ShapeProperties>({
    strokeColor: '#000000',
    fillColor: '#ffffff',
    strokeWidth: 2,
    fontSize: 16,
    fontFamily: 'Arial'
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff'
      });
      
      fabricCanvasRef.current = canvas;

      // Set up event listeners
      canvas.on('object:added', updateTikZCode);
      canvas.on('object:modified', updateTikZCode);
      canvas.on('object:removed', updateTikZCode);

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  const updateTikZCode = () => {
    if (fabricCanvasRef.current) {
      const code = generateTikZCode(fabricCanvasRef.current);
      setTikzCode(code);
    }
  };

  const handleToolChange = (tool: ToolType) => {
    setActiveTool(tool);
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.isDrawingMode = false;
      fabricCanvasRef.current.selection = true;
      
      if (tool === 'draw') {
        fabricCanvasRef.current.isDrawingMode = true;
        fabricCanvasRef.current.freeDrawingBrush.width = properties.strokeWidth;
        fabricCanvasRef.current.freeDrawingBrush.color = properties.strokeColor;
      }
    }
  };

  const handleClearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.backgroundColor = '#ffffff';
      fabricCanvasRef.current.renderAll();
      updateTikZCode();
    }
  };

  const handlePropertiesChange = (newProperties: Partial<ShapeProperties>) => {
    setProperties(prev => ({ ...prev, ...newProperties }));
    
    if (fabricCanvasRef.current && activeTool === 'draw') {
      fabricCanvasRef.current.freeDrawingBrush.width = newProperties.strokeWidth || properties.strokeWidth;
      fabricCanvasRef.current.freeDrawingBrush.color = newProperties.strokeColor || properties.strokeColor;
    }
  };

  return (
    <div className="app">
      <Toolbar
        activeTool={activeTool}
        onToolChange={handleToolChange}
        properties={properties}
        onPropertiesChange={handlePropertiesChange}
        onClearCanvas={handleClearCanvas}
      />
      
      <div className="canvas-container">
        <div className="canvas-header">
          <h1>TikZ Diagram Editor</h1>
          <div className="canvas-actions">
            <button className="action-button" onClick={handleClearCanvas}>
              Clear Canvas
            </button>
            <button className="action-button primary" onClick={updateTikZCode}>
              Generate Code
            </button>
          </div>
        </div>
        
        <div className="canvas-wrapper">
          <canvas ref={canvasRef} id="canvas" />
        </div>
      </div>
      
      <CodePanel tikzCode={tikzCode} />
    </div>
  );
};

export default App; 