import type { ToolbarProps } from "../types/fabricCanvas";
import { ButtonGroup, Button, Icon, Grid, Popup } from 'semantic-ui-react'

const Toolbar: React.FC<ToolbarProps> = ({ onAddText, onAddMosaic, onAddShape, onSave, onFontWeight }) => {
  return (
    <Grid columns='equal'>
      <Grid.Column>
        <ButtonGroup icon>
          <Popup content='テキストボックス' trigger={<Button onClick={onAddText}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z"/></svg></Button>} />
          <Popup content='太字にする' trigger={<Button onClick={onFontWeight}><Icon name='bold' /></Button>} />
          <Popup content='モザイク' trigger={<Button onClick={onAddMosaic}><Icon name='chess board' /></Button>} />
          <Popup content='四角' trigger={<Button onClick={() => onAddShape('rectangle')}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M80-160v-640h800v640H80Zm80-80h640v-480H160v480Zm0 0v-480 480Z"/></svg></Button>} />
          <Popup content='丸' trigger={<Button onClick={() => onAddShape('ellipse')}><Icon name='circle outline' /></Button>} />
        </ButtonGroup>
        <Popup content='PNG形式で保存' trigger={<Button color='teal' style={{ marginLeft: '3em' }} onClick={onSave}>Save</Button>} />
      </Grid.Column>
    </Grid>
  )
}

export default Toolbar;
