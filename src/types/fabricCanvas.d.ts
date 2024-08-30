export type FabricProps = {
  screenshotUrl: string;
}

export type ToolbarProps = {
  onAddText: () => void;
  onAddMosaic: () => void;
  onAddShape: (shape: 'rectangle' | 'circle') => void;
}