import FabricCanvas from "./compenents/FabricCanvas";
import "./App.css";
import Toolbar from "./compenents/Toolbar";
import { useState, useEffect, useRef } from "react";
import defaultImage from "./assets/no_image.png";
import { CompactPicker } from "react-color";
import type { Tool } from "./types/fabricCanvas";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import EastIcon from "@mui/icons-material/East";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import Crop32Icon from "@mui/icons-material/Crop32";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import PinIcon from "@mui/icons-material/Pin";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function App() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [number, setNumber] = useState<number>(1);
  const [color, setColor] = useState<string>("#000000");
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(true);
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
  const deleteRef = useRef<(() => void) | null>(null);

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
  const handleColorChange = (color: any) => {
    const selectedColor = color.hex;
    setColor(selectedColor);
    if (setColorRef.current) {
      setColorRef.current(selectedColor);
    }
  };

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
    {
      content: "削除",
      onClick: () => deleteRef.current?.(),
      icon: <DeleteForeverIcon />,
    },
  ];

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <>
      <div className="flex h-full w-full relative">
        <div className="collapse absolute inset-y-0 right-0 z-10 w-80 m-3">
          <input type="checkbox" onClick={toggleMenu} defaultChecked={true} />
          <div className="collapse-title text-pink-200 cursor-pointer">
            {isMenuVisible ? <HighlightOffIcon /> : <AddCircleOutlineIcon />}{isMenuVisible ? 'Hide' : 'Show'} Menu
          </div>
            <div className="collapse-content">
              <div className="flex flex-col w-80 bg-stone-100 p-3">
                <div className="mt-10">
                  <CompactPicker color={color} onChangeComplete={handleColorChange} />
                </div>
                <div className="toolbar my-5">
                  <Toolbar tools={tools} />
                </div>
                <div className="save-button ml-4">
                  <button
                    className="tooltip btn btn-wide bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                    onClick={() => saveRef.current?.()}
                    data-tip="PNG形式で保存"
                  >
                    Download
                    <DownloadIcon />
                  </button>
                </div>
              </div>
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="overflow-x-auto">
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
              deleteRef={deleteRef}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
