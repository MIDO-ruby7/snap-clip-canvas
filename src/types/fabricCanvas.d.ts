export type ToolbarProps = {
  onAddText: () => void;
  onAddLine: () => void;
  onAddArrow: () => void;
  onAddMosaic: () => void;
  onAddShape: (shape: 'rectangle' | 'ellipse') => void;
  onAddImage: () => void;
  onSave: () => void;
  onFontWeight: () => void;
}

export type FabricProps = {
  imageData: string;
  addTextRef: MutableRefObject<(() => void) | null>;
  addLineRef: MutableRefObject<(() => void) | null>;
  addArrowRef: MutableRefObject<(() => void) | null>;
  addMosaicRef: MutableRefObject<(() => void) | null>;
  addShapeRef: MutableRefObject<((shape: 'rectangle' | 'ellipse') => void) | null>;
  saveRef: MutableRefObject<(() => void) | null>;
  fontWeightRef: MutableRefObject<(() => void) | null>;
  addImageRef: MutableRefObject<() => void>;
};