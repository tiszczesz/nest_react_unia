import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import FormOnChange from './components/FormOnChange'

function App() {
  console.log('render App')
  return (
    <div className='container'>
      <FormOnChange />
    </div>
  )
}

export default App
