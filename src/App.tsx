import FabricCanvas from './compenents/FabricCanvas'
import './App.css'
import Toolbar from './compenents/Toolbar'

function App() {
  const url = "https://iconbu.com/wp-content/uploads/2023/07/%E3%82%B5%E3%82%AB%E3%83%90%E3%83%B3%E3%83%90%E3%82%B9%E3%83%94%E3%82%B9.jpg"
  const handleAddText = () => {
    console.log("handleAddText")
  }
  const handleAddMosaic = () => {
    console.log("handleAddMosaic")
  }
  const handleAddShape = () => {
    console.log("handleAddShape")
  }

  return (
    <>
      <div className="canvas">
        <Toolbar
          onAddText={handleAddText}
          onAddMosaic={handleAddMosaic}
          onAddShape={handleAddShape}
        />
        <FabricCanvas screenshotUrl={url} />
      </div>
    </>
  )
}

export default App
