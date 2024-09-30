import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box } from '@mui/material';
import FileUpload from './components/file-upload';
import Visualization from './components/visualization';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null);

  return (
    <>
      <Box width={"780px"}>
      <FileUpload onFileUpload={(data) => setData(data)}/>
      <Visualization data={data}/>
      </Box>
    </>
  )
}

export default App
