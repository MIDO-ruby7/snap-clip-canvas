import FabricCanvas from './compenents/FabricCanvas'
import './App.css'
import Toolbar from './compenents/Toolbar'
import { useState, useEffect, useRef } from 'react';
import defaultImage from './assets/no_image.png';

function App() {
  const [imageData, setImageData] = useState<string | null>(null);
  const addTextRef = useRef<() => void>(() => {});
  const addMosaicRef = useRef<() => void>(() => {});
  const addShapeRef = useRef<(shape: 'rectangle' | 'circle') => void>(() => {});
  const saveRef = useRef<() => void>(() => {});

  useEffect(() => {
    const handleMessage =  (event: MessageEvent) => {
      // セキュリティのためオリジンを確認する
      if (event.origin === "https://snap-clip-canvas.vercel.app" &&
        event.data.imageData) {
        setImageData(event.data.imageData);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // クリーンアップ
      window.removeEventListener('message', handleMessage);
    }
  }, []);

  const handleAddText = () => {
    addTextRef.current();
  }
  const handleAddMosaic = () => {
    addMosaicRef.current();
  }
  const handleAddShape = (shape: 'rectangle' | 'circle') => {
    addShapeRef.current(shape);
  }
  const handleSave = () => {
    saveRef.current();
  }

  return (
    <>
      <Toolbar
          onAddText={handleAddText}
          onAddMosaic={handleAddMosaic}
          onAddShape={handleAddShape}
          onSave={handleSave}
        />
      <div className="canvas">
        <FabricCanvas
          imageData={imageData || defaultImage}
          addTextRef={addTextRef}
          addMosaicRef={addMosaicRef}
          addShapeRef = {addShapeRef}
          saveRef={saveRef}
        />
      </div>
    </>
  )
}

export default App
