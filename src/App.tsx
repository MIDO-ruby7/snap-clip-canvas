import FabricCanvas from './compenents/FabricCanvas'
import './App.css'
import Toolbar from './compenents/Toolbar'
import { useRef } from 'react';

function App() {
  const url = "https://iconbu.com/wp-content/uploads/2023/07/%E3%82%B5%E3%82%AB%E3%83%90%E3%83%B3%E3%83%90%E3%82%B9%E3%83%94%E3%82%B9.jpg"
  const addTextRef = useRef<() => void>(() => {});
  const addMosaicRef = useRef<() => void>(() => {});
  const addShapeRef = useRef<(shape: 'rectangle' | 'circle') => void>(() => {});

  const handleAddText = () => {
    addTextRef.current();
  }
  const handleAddMosaic = () => {
    addMosaicRef.current();
  }
  const handleAddShape = (shape: 'rectangle' | 'circle') => {
    addShapeRef.current(shape);
  }

  return (
    <>
      <div className="canvas">
        <Toolbar
          onAddText={handleAddText}
          onAddMosaic={handleAddMosaic}
          onAddShape={handleAddShape}
        />
        <FabricCanvas
          screenshotUrl={url}
          addTextRef={addTextRef}
          addMosaicRef={addMosaicRef}
          addShapeRef = {addShapeRef}
        />
      </div>
    </>
  )
}

export default App
