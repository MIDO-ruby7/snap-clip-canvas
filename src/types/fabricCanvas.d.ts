export type ToolbarProps = {
  onAddText: () => void;
  onAddMosaic: () => void;
  onAddShape: (shape: 'rectangle' | 'circle') => void;
}

export type FabricProps = {
  imageData: string;
  addTextRef: MutableRefObject<() => void>;
  addMosaicRef: MutableRefObject<() => void>;
  addShapeRef: MutableRefObject<() => void>;
};