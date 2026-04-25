import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
function App() {
  

  return (
    <div className='container'>
      <h1>Hello, World!</h1>
      <button onClick={(e) => {
        console.log(e);
        //alert('Kliknięto przycisk!');
      }}
        className='btn btn-primary'>Kliknij</button>
      <hr />
   <p>Tu ma zmienić sie treść po kliknięciu przycisku!</p>
    </div>
  )
}

export default App
