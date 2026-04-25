import './App.css';
import First from './components/First';
type Item = {
  color: string;
  content: string;
}
const items: Item[] = [
  { color: 'red', content: 'Hello, First Component!' },
  { color: 'blue', content: 'This is the second instance.' },
  { color: 'green', content: 'And this is the third.' },
  { color: 'black', content: 'This is the fourth instance.' },
  { color: '#805736', content: 'This is the other instance.' }
]
function App() {


  return (
    <>
      {items.map((item, index) => (
        <First myColor={item.color} content={item.content}
          isUnderlied={index % 3 === 0} key={index} />
      ))}
    </>
  )
}

export default App
