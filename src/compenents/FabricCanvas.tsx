import { useEffect, useRef } from 'react';
import { Canvas, FabricImage } from 'fabric';
import type { FabricProps } from '../types/fabricCanvas';

export const FabricCanvas = ({ screenshotUrl }: FabricProps) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasEl.current) return;

    // キャンバスの設定
    const options = {
      width: 1200,
      height: 650,
      selection: false, // 選択の無効化
    }
    const canvas = new Canvas(canvasEl.current, options);

    FabricImage.fromURL(screenshotUrl).then((img) => {
      canvas.add(img); // 画像をキャンバスに追加
      img.scaleToWidth(canvas.height!); // 画像をキャンバスの縦幅に合わせる
      canvas.renderAll(); // キャンバスを再描画
    }).catch((error) => {
      console.error('Error loading image:', error);
    });

    return () => {
      canvas.dispose(); // クリーンアップ
    };
  }, [screenshotUrl]);

  return <canvas ref={canvasEl} />;
};

export default FabricCanvas;
