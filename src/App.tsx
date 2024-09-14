import FabricCanvas from "./compenents/FabricCanvas";
import "./App.css";
import Toolbar from "./compenents/Toolbar";
import { useState, useEffect, useRef } from "react";
import defaultImage from "./assets/no_image.png";
import { CompactPicker } from 'react-color';
import type { Tool } from "./types/fabricCanvas"
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import EastIcon from '@mui/icons-material/East';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import Crop32Icon from '@mui/icons-material/Crop32';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import PinIcon from '@mui/icons-material/Pin';
import DownloadIcon from '@mui/icons-material/Download';

function App() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [number, setNumber] = useState<number>(1);
  // const [color, setColor] = useState<string>('#000000');
  const addTextRef = useRef<(() => void) | null>(null);
  const addLineRef = useRef<(() => void) | null>(null);
  const addArrowRef = useRef<(() => void) | null>(null);
  const addMosaicRef = useRef<(() => void) | null>(null);
  const addShapeRef = useRef<((shape: "rectangle" | "ellipse") => void) | null>(
    null,
  );
  const addImageRef = useRef<(() => void) | null>(null);
  const saveRef = useRef<(() => void) | null>(null);
  const fontWeightRef = useRef<(() => void) | null>(null);
  const addNumberRef = useRef<((num: number) => void) | null>(null);
  const setColorRef = useRef<((color: string) => void) | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // セキュリティのためオリジンを確認する
      if (event.origin === "https://snap-clip-canvas.vercel.app") {
        if (typeof event.data.imageData === "string") {
          setImageData(event.data.imageData);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      // クリーンアップ
      window.removeEventListener("message", handleMessage);
      setNumber(1);
    };
  }, []);

  const handleAddNumber = () => {
    if (addNumberRef.current) {
      addNumberRef.current(number);
      setNumber(number + 1);
    }
  };
  // const handleColorChange = (color: any) => {
  //   const selectedColor = color.hex;
  //   setColor(selectedColor);
  //   if (setColorRef.current) {
  //     setColorRef.current(selectedColor);
  //   }
  // };

  const tools: Tool[] = [
    {
      content: "テキストボックス",
      onClick: () => addTextRef.current?.(),
      icon: <TextFieldsIcon />,
    },
    {
      content: "太字にする",
      onClick: () => fontWeightRef.current?.(),
      icon: <FormatBoldIcon />,
    },
    {
      content: "線",
      onClick: () => addLineRef.current?.(),
      icon: <HorizontalRuleIcon />,
    },
    {
      content: "矢印",
      onClick: () => addArrowRef.current?.(),
      icon: <EastIcon />,
    },
    {
      content: "モザイク",
      onClick: () => addMosaicRef.current?.(),
      icon: <BlurOnIcon />,
    },
    {
      content: "四角",
      onClick: () => addShapeRef.current?.("rectangle"),
      icon: <Crop32Icon />,
    },
    {
      content: "丸",
      onClick: () => addShapeRef.current?.("ellipse"),
      icon: <PanoramaFishEyeIcon />,
    },
    {
      content: "フレーム",
      onClick: () => addImageRef.current?.(),
      icon: <FilterFramesIcon />,
    },
    {
      content: "数字",
      onClick: handleAddNumber,
      icon: <PinIcon />,
    },
  ];

  return (
    <>
      <div className="app-container">
        <div className="sidebar">
          <div className="color_picker">
            <CompactPicker />
          </div>
          <div className="toolbar">
          <Toolbar tools={tools} />
          </div>
          <div className="save-button ml-4">
            <button
              className="tooltip btn btn-wide bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
              onClick={() => saveRef.current?.()}
              data-tip="PNG形式で保存"
            >
              Download<DownloadIcon />
            </button>
          </div>
        </div>
        <div className="canvas">
          <FabricCanvas
            imageData={imageData || defaultImage}
            addTextRef={addTextRef}
            addLineRef={addLineRef}
            addArrowRef={addArrowRef}
            fontWeightRef={fontWeightRef}
            addMosaicRef={addMosaicRef}
            addShapeRef={addShapeRef}
            addImageRef={addImageRef}
            saveRef={saveRef}
            addNumberRef={addNumberRef}
            setColorRef={setColorRef}
          />
        </div>
      </div>
    </>
  );
}

export default App