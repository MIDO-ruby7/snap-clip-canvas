import type { ToolbarProps } from "../types/fabricCanvas";

const Toolbar: React.FC<ToolbarProps> = ({ onAddText, onAddMosaic, onAddShape, onSave }) => {
  return (
    <div>
      <div>
        <button onClick={onAddText} style={{ margin: '0 10px' }}>Add Text</button>
        <button onClick={onAddMosaic} style={{ margin: '0 10px' }}>Add Mosaic</button>
        <button onClick={() => onAddShape('rectangle')}>Add Rectangle</button>
        <button onClick={() => onAddShape('circle')}>Add Circle</button>
      </div>
      <button onClick={onSave} style={{ margin: '0 10px' }}>Save</button>
    </div>
  )
}

export default Toolbar;
