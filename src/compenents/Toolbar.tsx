import type { ToolbarProps } from "../types/fabricCanvas";
import { ButtonGroup, Button, Icon, Grid, Popup } from 'semantic-ui-react'
import textIcon from '../assets/text-icon.svg'
import rectangleIcon from '../assets/rectangle.svg'

const Toolbar: React.FC<ToolbarProps> = ({ onAddText, onAddMosaic, onAddShape, onSave, onFontWeight }) => {
  const tools = [
    { content: 'テキストボックス', onClick: onAddText, icon: <img src={textIcon}  alt="Text Icon" /> },
    { content: '太字にする', onClick: onFontWeight, icon: <Icon name='bold' /> },
    { content: 'モザイク', onClick: onAddMosaic, icon: <Icon name='chess board' /> },
    { content: '四角', onClick: () => onAddShape('rectangle'), icon: <img src={rectangleIcon}  alt="Rectangle Icon" /> },
    { content: '丸', onClick: () => onAddShape('ellipse'), icon: <Icon name='circle outline' /> },
  ];

  return (
    <Grid columns='equal'>
      <Grid.Column>
      <ButtonGroup icon>
        {tools.map((tool, index) => (
          <Popup key={index} content={tool.content} trigger={<Button onClick={tool.onClick}>{tool.icon}</Button>} />
        ))}
      </ButtonGroup>
        <Popup content='PNG形式で保存' trigger={<Button color='teal' style={{ marginLeft: '3em' }} onClick={onSave}>Save</Button>} />
      </Grid.Column>
    </Grid>
  )
}

export default Toolbar;
