export type ToolbarProps = {
  onAddText: () => void;
  onAddLine: () => void;
  onAddMosaic: () => void;
  onAddShape: (shape: 'rectangle' | 'ellipse') => void;
  onSave: () => void;
  onFontWeight: () => void;
}

export type FabricProps = {
  imageData: string;
  addTextRef: MutableRefObject<() => void>;
  addLineRef: MutableRefObject<() => void>;
  addMosaicRef: MutableRefObject<() => void>;
  addShapeRef: MutableRefObject<() => void>;
  saveRef: MutableRefObject<() => void>;
  fontWeightRef: MutableRefObject<() => void>;
};