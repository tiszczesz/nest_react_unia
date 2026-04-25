import './App.css';
import First from './components/First';
type Item = {
  color: string;
  content: string;
}
const items:Item[] = [
  { color: 'red', content: 'Hello, First Component!' },
  { color: 'blue', content: 'This is the second instance.' },
  { color: 'green', content: 'And this is the third.' },
  { color: 'black', content: 'This is the fourth instance.' }
]
function App() {


  return (
    <>
      <First content="Hello, First Component!"
        myColor='red' />
      <First content="This is the second instance."
        isUnderlied={true}
        myColor='blue'
      />
      <First content="And this is the third."
        isUnderlied={false}
        myColor='green' />
      <First content="This is the fourth instance." />
    </>
  )
}

export default App
