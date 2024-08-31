import { useEffect, useRef } from 'react';
import { Canvas, FabricImage, Textbox } from 'fabric';
import type { FabricProps } from '../types/fabricCanvas';

export const FabricCanvas = ({ screenshotUrl, addTextRef }: FabricProps) => {
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

  useEffect(() => {
    console.log("canvasRef.current")
    if (!canvasRef.current) return;

    addTextRef.current = () => {
      const textbox = new Textbox('Enter text here', {
        left: 50,
        top: 50,
        width: 200,
        fontSize: 20,
        fill: '#000000',
      });

      canvasRef.current?.add(textbox);
      canvasRef.current?.setActiveObject(textbox);
      canvasRef.current?.renderAll();
    }
  }, [addTextRef]);

  return <canvas ref={canvasEl} />;
};

export default FabricCanvas;
