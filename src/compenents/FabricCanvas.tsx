import { useEffect, useRef } from 'react';
import { Canvas, FabricImage, Textbox, Rect, Pattern } from 'fabric';
import type { FabricProps } from '../types/fabricCanvas';
import mosaicPatternImg from '../assets/mosaicPattern.png';

export const FabricCanvas = ({ screenshotUrl, addTextRef, addMosaicRef }: FabricProps) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<Canvas | null>(null);

  // キャンバスの初期化
  useEffect(() => {
    if (!canvasEl.current) return;

    // キャンバスの設定
    const options = {
      width: 1000,
      height: 600,
      selection: false, // 選択の無効化
    }
    const canvas = new Canvas(canvasEl.current, options);
    canvasRef.current = canvas;

    FabricImage.fromURL(screenshotUrl).then((img) => {
      canvas.add(img); // 画像をキャンバスに追加
      canvas.renderAll(); // キャンバスを再描画
    }).catch((error) => {
      console.error('Error loading image:', error);
    });

    return () => {
      canvas.dispose(); // クリーンアップ
    };
  }, [screenshotUrl]);

  // TextBox
  useEffect(() => {
    if (!canvasRef.current) return;

    addTextRef.current = () => {
      const textbox = new Textbox('Enter text here', {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 20,
        fill: '#000000',
      });

      canvasRef.current?.add(textbox);
      canvasRef.current?.setActiveObject(textbox);
      canvasRef.current?.renderAll();
    }
  }, [addTextRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    addMosaicRef.current = () => {
      FabricImage.fromURL(mosaicPatternImg).then((img) => {
        console.log(mosaicPatternImg)
        console.log("img",img)
        const pattern = new Pattern({
          source: img._element,
          repeat: 'repeat',
        });

        const mosaicPattern = new Rect({
          left: 100,
          top: 100,
          width: 200,
          height: 40,
          fill: pattern
        });
        canvasRef.current?.add(mosaicPattern);
        canvasRef.current?.renderAll();
      }).catch((error) => {
        console.error('Error loading mosaic pattern image:', error);
      });
    }
  }, [addMosaicRef]);
  return <canvas ref={canvasEl}/>;
}

export default FabricCanvas;
