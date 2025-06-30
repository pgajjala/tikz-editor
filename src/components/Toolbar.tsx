import React from 'react';
import { ToolType, ShapeProperties } from '../types';

interface ToolbarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  properties: ShapeProperties;
  onPropertiesChange: (properties: Partial<ShapeProperties>) => void;
  onClearCanvas: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  onToolChange,
  properties,
  onPropertiesChange,
  onClearCanvas
}) => {
  const tools = [
    { id: 'select', label: 'Select', icon: '👆' },
    { id: 'draw', label: 'Draw', icon: '✏️' },
    { id: 'rectangle', label: 'Rectangle', icon: '⬜' },
    { id: 'circle', label: 'Circle', icon: '⭕' },
    { id: 'line', label: 'Line', icon: '➖' },
    { id: 'arrow', label: 'Arrow', icon: '➡️' },
    { id: 'text', label: 'Text', icon: 'T' }
  ];

  return (
    <div className="toolbar">
      <h2>Tools</h2>
      <div className="tool-group">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`tool-button ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => onToolChange(tool.id as ToolType)}
          >
            <span>{tool.icon}</span>
            {tool.label}
          </button>
        ))}
      </div>

      <div className="properties-panel">
        <h2>Properties</h2>
        
        <div className="property-group">
          <label>Stroke Color</label>
          <div className="color-picker">
            <input
              type="color"
              value={properties.strokeColor}
              onChange={(e) => onPropertiesChange({ strokeColor: e.target.value })}
            />
            <input
              type="text"
              value={properties.strokeColor}
              onChange={(e) => onPropertiesChange({ strokeColor: e.target.value })}
            />
          </div>
        </div>

        <div className="property-group">
          <label>Fill Color</label>
          <div className="color-picker">
            <input
              type="color"
              value={properties.fillColor}
              onChange={(e) => onPropertiesChange({ fillColor: e.target.value })}
            />
            <input
              type="text"
              value={properties.fillColor}
              onChange={(e) => onPropertiesChange({ fillColor: e.target.value })}
            />
          </div>
        </div>

        <div className="property-group">
          <label>Stroke Width</label>
          <input
            type="range"
            min="1"
            max="20"
            value={properties.strokeWidth}
            onChange={(e) => onPropertiesChange({ strokeWidth: parseInt(e.target.value) })}
          />
          <span>{properties.strokeWidth}px</span>
        </div>

        <div className="property-group">
          <label>Font Size</label>
          <input
            type="range"
            min="8"
            max="72"
            value={properties.fontSize}
            onChange={(e) => onPropertiesChange({ fontSize: parseInt(e.target.value) })}
          />
          <span>{properties.fontSize}px</span>
        </div>

        <div className="property-group">
          <label>Font Family</label>
          <select
            value={properties.fontFamily}
            onChange={(e) => onPropertiesChange({ fontFamily: e.target.value })}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>

        <button className="tool-button" onClick={onClearCanvas}>
          🗑️ Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default Toolbar; 