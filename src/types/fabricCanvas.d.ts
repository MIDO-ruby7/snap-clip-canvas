export type Tool = {
  content: string;
  onClick: (() => void) | undefined;
  icon: JSX.Element;
};

export type ToolbarProps = {
  tools: Tool[];
};

export type FabricProps = {
  imageData: string;
  addTextRef: MutableRefObject<(() => void) | null>;
  addLineRef: MutableRefObject<(() => void) | null>;
  addArrowRef: MutableRefObject<(() => void) | null>;
  addMosaicRef: MutableRefObject<(() => void) | null>;
  addShapeRef: MutableRefObject<
    ((shape: "rectangle" | "ellipse") => void) | null
  >;
  saveRef: MutableRefObject<(() => void) | null>;
  fontWeightRef: MutableRefObject<(() => void) | null>;
  addImageRef: MutableRefObject<() => void>;
  addNumberRef: MutableRefObject<(numTostring: number) => void>;
  setColorRef: MutableRefObject<(color: string) => void>;
};
