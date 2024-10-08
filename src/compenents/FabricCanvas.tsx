import { useEffect, useRef } from "react";
import deleteIcon from '../assets/cancel.png'
import copyIcon from '../assets/copy.png'
import {
  Canvas,
  FabricImage,
  Textbox,
  Rect,
  Pattern,
  Ellipse,
  Line,
  loadSVGFromURL,
  Path,
  Control,
  FabricObject,
} from "fabric";
import type { FabricProps } from "../types/fabricCanvas";
import mosaicPatternImg from "../assets/mosaicPattern.png";
import arrow from "../assets/east.svg";
import koukasen from "../assets/bg_koukasen_nobg1.png";

export const FabricCanvas = ({
  imageData,
  addTextRef,
  addLineRef,
  addMosaicRef,
  addShapeRef,
  addArrowRef,
  addImageRef,
  saveRef,
  fontWeightRef,
  addNumberRef,
  setColorRef,
}: FabricProps) => {
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
    };
    const canvas = new Canvas(canvasEl.current, options);
    canvasRef.current = canvas;

    const loadImage = async () => {
      try {
        const img = await FabricImage.fromURL(imageData);
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
          });
        }

        canvas.add(img); // 画像をキャンバスに追加
        canvas.renderAll(); // キャンバスを再描画
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();

    return () => {
      canvas.dispose(); // クリーンアップ
    };
  }, [imageData]);

  // カスタムコントロール
  const applyCustomControlsToObject = (object: FabricObject) => {
    if (!object) return;

    // Delete control
    object.controls.deleteControl = new Control({
      x: 0.5,
      y: -0.5,
      offsetY: -15,
      offsetX: 20,
      cursorStyle: 'pointer',
      render: (ctx, left, top) => renderIcon(ctx, left, top, deleteIcon),
      mouseUpHandler: handleDeleteActiveObject,
    });

    // Copy control
    object.controls.copyControl = new Control({
      x: 0.5,
      y: -0.5,
      offsetY: 20,
      offsetX: 20,
      cursorStyle: 'pointer',
      render: (ctx, left, top) => renderIcon(ctx, left, top, copyIcon),
      mouseUpHandler: handleCopyAndPasteActiveObject,
    });

    function renderIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      iconSrc: string
    ) {
      const size = 20;
      const img = new Image();
      img.src = iconSrc;

      img.onload = () => {
        ctx.save();
        ctx.translate(left, top);
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    }

    object.setCoords();
  }

  // Bold
  fontWeightRef.current = () => {
    const activeObject = canvasRef.current?.getActiveObject();

    if (activeObject && activeObject instanceof Textbox) {
      const currentWeight = activeObject.fontWeight;
      activeObject.set({
        fontWeight: currentWeight === "bold" ? "normal" : "bold",
      });
      canvasRef.current?.renderAll();
    }
  };

  // TextBox
  addTextRef.current = () => {
    const textbox = new Textbox("Enter text here", {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
      fill: "#000000",
      fontWeight: "normal",
    });

    canvasRef.current?.add(textbox);
    applyCustomControlsToObject(textbox);
    canvasRef.current?.setActiveObject(textbox);
    textbox.enterEditing(); // テキストボックスを編集モードにする
    textbox.selectAll(); // すべてのテキストを選択する
    canvasRef.current?.renderAll();
  };

  // 線
  addLineRef.current = () => {
    const line = new Line([40, 120, 200, 120], {
      stroke: "red",
      strokeWidth: 2,
    });

    canvasRef.current?.add(line);
    applyCustomControlsToObject(line);
    canvasRef.current?.renderAll();
  };

  // 矢印
  addArrowRef.current = async () => {
    loadSVGFromURL(arrow, (objects) => {
      const pathData = objects.getAttribute("d");
      if (pathData) {
        const svgPath = new Path(pathData, {
          left: 100,
          top: 100,
          angle: 0,
          fill: "#ff5555",
          scaleX: 0.05,
          scaleY: 0.05,
        });

        canvasRef.current?.add(svgPath);
        applyCustomControlsToObject(svgPath);
        canvasRef.current?.renderAll();
      }
    });
  };

  // モザイク
  addMosaicRef.current = async () => {
    try {
      const img = await FabricImage.fromURL(mosaicPatternImg);
      const pattern = new Pattern({
        source: img._element,
        repeat: "repeat",
      });

      const mosaicPattern = new Rect({
        left: 100,
        top: 100,
        width: 200,
        height: 40,
        fill: pattern,
      });
      canvasRef.current?.add(mosaicPattern);
      applyCustomControlsToObject(mosaicPattern);
      canvasRef.current?.renderAll();
    } catch (error) {
      console.error("Error loading mosaic pattern image:", error);
    }
  };

  // 図形
  addShapeRef.current = (shape: "rectangle" | "ellipse") => {
    let shapeObj;
    if (shape === "rectangle") {
      shapeObj = new Rect({
        left: 100,
        top: 100,
        width: 200,
        height: 40,
        fill: "transparent",
        stroke: "red",
        strokeWidth: 2,
      });
    } else if (shape === "ellipse") {
      shapeObj = new Ellipse({
        left: 150,
        top: 150,
        rx: 100,
        ry: 30,
        fill: "transparent",
        stroke: "red",
        strokeWidth: 2,
      });
    }

    if (shapeObj) {
      canvasRef.current?.add(shapeObj);
      applyCustomControlsToObject(shapeObj);
      canvasRef.current?.renderAll();
    }
  };

  // 画像
  addImageRef.current = async () => {
    const image = await FabricImage.fromURL(koukasen);
    image.set({
      scaleY: 0.5,
      scaleX: 0.5,
      top: 50,
      left: 400,
      cropX: 10,
      cropY: 10,
    });
    canvasRef.current?.add(image);
    applyCustomControlsToObject(image);
    canvasRef.current?.renderAll();
  };

  // 数字
  addNumberRef.current = (num: number) => {
    const textbox = new Textbox(num.toString(), {
      left: 100,
      top: 100,
      width: 30,
      fontSize: 28,
      fill: "red",
      fontWeight: "bold",
      fontFamily: "Noto Sans",
    });

    canvasRef.current?.add(textbox);
    applyCustomControlsToObject(textbox);
    canvasRef.current?.setActiveObject(textbox);
    canvasRef.current?.renderAll();
  };

  // オブジェクトの削除
  function handleDeleteActiveObject (): void {
    const activeObject = canvasRef.current?.getActiveObject();

    if (activeObject) {
      if (activeObject instanceof Textbox && activeObject.isEditing) {
        // Don't delete the Textbox if it's in edit mode
        return;
      }
      canvasRef.current?.remove(activeObject);
      canvasRef.current?.renderAll();
    }
  };

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (canvasRef.current && (e.key === "Escape" || e.key === "Backspace")) {
        handleDeleteActiveObject();
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 保存
  saveRef.current = () => {
    if (!canvasRef.current) return;

    const dataURL = canvasRef.current.toDataURL({
      format: "png",
      quality: 1.0,
      multiplier: 3.0,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-image.png";
    link.click();
  };

  // 色
  const applyColorToActiveObject = (color: string) => {
    const activeObject = canvasRef.current?.getActiveObject();

    if (activeObject) {
      if (activeObject.type === "textbox" || activeObject.type === "path") {
        activeObject.set("fill", color); // TextやTextboxの場合はfillを設定
      } else {
        activeObject.set("stroke", color); // それ以外のオブジェクトにはstrokeを設定
      }

      canvasRef.current?.renderAll();
    }
  };
  setColorRef.current = applyColorToActiveObject;

  // Copy and Paste
  let clipboard: FabricObject | null = null;

  async function copy() {
    const activeObject = canvasRef.current?.getActiveObject();
    if (!activeObject) return;

    try {
      clipboard = await activeObject.clone();
    } catch (error) {
      console.error("Error cloning object: ", error);
    }
  }

  async function paste() {
    if (!clipboard || !canvasRef.current) return;

    try {
      const clonedObj = await clipboard.clone();
      canvasRef.current.discardActiveObject();

      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true, // 操作可能にする
      });

      canvasRef.current.add(clonedObj);
      applyCustomControlsToObject(clonedObj);
      canvasRef.current.renderAll();
    } catch (error) {
      console.error("Error pasting object: ", error);
    }
  }

  async function handleCopyAndPasteActiveObject() {
    await copy();
    await paste();
  }

  return <canvas ref={canvasEl} />;
};

export default FabricCanvas;
