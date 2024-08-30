import FabricCanvas from './compenents/FabricCanvas'
import './App.css'

function App() {
  const url = "https://iconbu.com/wp-content/uploads/2023/07/%E3%82%B5%E3%82%AB%E3%83%90%E3%83%B3%E3%83%90%E3%82%B9%E3%83%94%E3%82%B9.jpg"
  return (
    <>
      <div className="canvas">
        <FabricCanvas screenshotUrl={url} />
      </div>
    </>
  )
}

export default App
