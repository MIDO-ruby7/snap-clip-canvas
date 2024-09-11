export type ToolbarProps = {
  onAddText: () => void;
  onAddMosaic: () => void;
  onAddShape: (shape: 'rectangle' | 'ellipse') => void;
  onSave: () => void;
}

export type FabricProps = {
  imageData: string;
  addTextRef: MutableRefObject<() => void>;
  addMosaicRef: MutableRefObject<() => void>;
  addShapeRef: MutableRefObject<() => void>;
  saveRef: MutableRefObject<() => void>;
};