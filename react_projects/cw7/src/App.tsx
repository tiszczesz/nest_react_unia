import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
function App() {
  //let info = '';
  const [info, setInfo] = useState('');
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
    </div>
  )
}

export default App
