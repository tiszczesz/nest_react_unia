import { useState, type ChangeEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
function App() {
  //let info = '';
  const [info, setInfo] = useState('');
  const [colorRed, setColorRed] = useState<number>(0);


  function handleChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
    setColorRed(Number(e.target.value));
    //setColorRed(parseInt(e.target.value));
  }

  return (
    <div className='container'>
      <h1>Hello, World!</h1>
      <button onClick={(e) => {
        console.log(e);
        //alert('Kliknięto przycisk!');
        //zmiana info
        // info = new Date().toLocaleTimeString();
        setInfo(new Date().toLocaleTimeString());
        //setInfo jest funkcją asynchroniczną, 
        // więc info nie zmieni się od razu, 
        // tylko po ponownym renderowaniu komponentu
        console.log(info);
      }}
        className='btn btn-primary'>Kliknij</button>
      <hr />
      <p>Tu ma zmienić sie treść po kliknięciu przycisku!:
        {info}</p>
      <hr />
      <label htmlFor="red">Czerwony:</label>
      <input id="red" value={colorRed}
        onChange={(e) => handleChange(e)}
        type="range" min="0" max="255" />
      <span>{colorRed}</span>
      <div style={{
        border: '1px solid #ccc',
        backgroundColor: `rgb(${colorRed}, 0, 0)`,
        minHeight: '100px',
        minWidth: '100px',
        padding: '10px'
      }}></div>
    </div>
  )
}

export default App
