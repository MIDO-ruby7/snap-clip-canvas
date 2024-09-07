import FabricCanvas from './compenents/FabricCanvas'
import './App.css'
import Toolbar from './compenents/Toolbar'
import { useState, useEffect, useRef } from 'react';

function App() {
  const [imageData, setImageData] = useState<string | null>(null);
  const addTextRef = useRef<() => void>(() => {});
  const addMosaicRef = useRef<() => void>(() => {});
  const addShapeRef = useRef<(shape: 'rectangle' | 'circle') => void>(() => {});

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
  const defaultImage =  "https://iconbu.com/wp-content/uploads/2023/07/%E3%82%B5%E3%82%AB%E3%83%90%E3%83%B3%E3%83%90%E3%82%B9%E3%83%94%E3%82%B9.jpg"

  return (
    <>
      <Toolbar
          onAddText={handleAddText}
          onAddMosaic={handleAddMosaic}
          onAddShape={handleAddShape}
        />
      <div className="canvas">
        <FabricCanvas
          imageData={imageData || defaultImage}
          addTextRef={addTextRef}
          addMosaicRef={addMosaicRef}
          addShapeRef = {addShapeRef}
        />
      </div>
    </>
  )
}

export default App
