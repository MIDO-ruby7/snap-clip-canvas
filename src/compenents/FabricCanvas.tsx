import { useEffect, useRef } from 'react';
import { Canvas, FabricImage, Textbox, Rect, Pattern, Circle } from 'fabric';
import type { FabricProps } from '../types/fabricCanvas';
import mosaicPatternImg from '../assets/mosaicPattern.png';

export const FabricCanvas = ({ imageData, addTextRef, addMosaicRef, addShapeRef }: FabricProps) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<Canvas | null>(null);

  const maxCanvasWidth = 1000;
  const maxCanvasHeight = 600;

  // キャンバスの初期化
  useEffect(() => {
    if (!canvasEl.current) return;

    // キャンバスの設定
    const options = {
      width: maxCanvasWidth,
      height: maxCanvasHeight,
      selection: false, // 選択の無効化
      preserveObjectStacking: true, // オブジェクト選択時に自動的に最前面に移動しないようにする
    }
    const canvas = new Canvas(canvasEl.current, options);
    canvasRef.current = canvas;

    const loadImage = async () => {
      try {
        const img = await FabricImage.fromURL(imageData)
        const imgWidth = img.width || 0;
        const imgHeight = img.height || 0;
        img.selectable = false; // 選択を無効化

        let newCanvasWidth = imgWidth;
        let newCanvasHeight = imgHeight;

        // 画像がキャンバスの最大サイズを超える場合、縮小する
        if (imgWidth > maxCanvasWidth || imgHeight > maxCanvasHeight) {
          const widthRatio = maxCanvasWidth / imgWidth;
          const heightRatio = maxCanvasHeight / imgHeight;
          const scaleRatio = Math.min(widthRatio, heightRatio);

          newCanvasWidth = imgWidth * scaleRatio;
          newCanvasHeight = imgHeight * scaleRatio;

          img.scale(scaleRatio); // 画像をスケール
        }

        if (canvasRef.current) {
          canvasRef.current.setDimensions({
            width: newCanvasWidth,
            height: newCanvasHeight,
          })
        }

        canvas.add(img); // 画像をキャンバスに追加
        canvas.renderAll(); // キャンバスを再描画
      } catch(error) {
        console.error('Error loading image:', error);
      };
    };

    loadImage();

    return () => {
      canvas.dispose(); // クリーンアップ
    };
  }, [imageData]);


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

  // モザイク
  useEffect(() => {
    if (!canvasRef.current) return;

    addMosaicRef.current = async () => {
      try {
        const img = await FabricImage.fromURL(mosaicPatternImg)
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
      } catch(error) {
        console.error('Error loading mosaic pattern image:', error);
      };
    }
  }, [addMosaicRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    addShapeRef.current = (shape: 'rectangle' | 'circle') => {
      let shapeObj;
      if (shape === 'rectangle') {
        shapeObj = new Rect({
          left: 100,
          top: 100,
          width: 200,
          height: 40,
          fill: 'transparent',
          stroke: 'red',
          strokeWidth: 2,
        });
      } else if (shape === 'circle') {
        shapeObj = new Circle({
          left: 150,
          top: 150,
          radius: 50,
          fill: 'green'
        });
      }

      if (shapeObj) {
        canvasRef.current?.add(shapeObj);
        canvasRef.current?.renderAll();
      }
    }
  }, [addShapeRef]);

  return <canvas ref={canvasEl}/>;
}

export default FabricCanvas;
