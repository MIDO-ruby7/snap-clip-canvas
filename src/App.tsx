import FabricCanvas from './compenents/FabricCanvas'
import './App.css'
import Toolbar from './compenents/Toolbar'
import { useState, useEffect, useRef } from 'react';
import defaultImage from './assets/no_image.png';

function App() {
  const [imageData, setImageData] = useState<string | null>(null);
  const addTextRef = useRef<(() => void) | null>(null);
  const addLineRef = useRef<(() => void) | null>(null);
  const addArrowRef = useRef<(() => void) | null>(null);
  const addMosaicRef = useRef<(() => void) | null>(null);
  const addShapeRef = useRef<((shape: 'rectangle' | 'ellipse') => void) | null>(null);
  const addImageRef = useRef<(() => void) | null>(null);
  const saveRef = useRef<(() => void) | null>(null);
  const fontWeightRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleMessage =  (event: MessageEvent) => {
      // セキュリティのためオリジンを確認する
      if (event.origin === "https://snap-clip-canvas.vercel.app") {
        if (typeof event.data.imageData === 'string') {
          setImageData(event.data.imageData);
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // クリーンアップ
      window.removeEventListener('message', handleMessage);
    }
  }, []);

  const handleAddText = () => {
    addTextRef.current?.();
  }
  const handleAddLine = () => {
    addLineRef.current?.();
  }
  const handleAddArrow = () => {
    addArrowRef.current?.();
  }
  const handleAddMosaic = () => {
    addMosaicRef.current?.();
  }
  const handleAddShape = (shape: 'rectangle' | 'ellipse') => {
    addShapeRef.current?.(shape);
  }
  const handleAddImage = () => {
    addImageRef.current?.();
  }
  const handleSave = () => {
    saveRef.current?.();
  }
  const handleFontWeight = () => {
    fontWeightRef.current?.();
  }

  return (
    <>
      <Toolbar
          onAddText={handleAddText}
          onFontWeight={handleFontWeight}
          onAddLine={handleAddLine}
          onAddArrow={handleAddArrow}
          onAddMosaic={handleAddMosaic}
          onAddShape={handleAddShape}
          onAddImage={handleAddImage}
          onSave={handleSave}
        />
      <div className="canvas">
        <FabricCanvas
          imageData={imageData || defaultImage}
          addTextRef={addTextRef}
          addLineRef={addLineRef}
          addArrowRef={addArrowRef}
          fontWeightRef={fontWeightRef}
          addMosaicRef={addMosaicRef}
          addShapeRef = {addShapeRef}
          addImageRef={addImageRef}
          saveRef={saveRef}
        />
      </div>
    </>
  )
}

export default App
