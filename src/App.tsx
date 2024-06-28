import { useRef } from 'react';
import './App.css';
import { MaskEditor } from './components/MaskEditor/MaskEditor';
import { toMask } from './utils/MaskUtils';

function App() {
  const canvas = useRef<HTMLCanvasElement>();

  return (
    <>
      <MaskEditor src="/cat2.jpeg" canvasRef={canvas} />
      <button onClick={() => console.log(toMask(canvas.current))}>Get Mask</button>
    </>
  );
}

export default App;
