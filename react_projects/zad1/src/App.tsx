import './App.css'
import Circle from './components/Circle'
import { items, type Item } from './data/colors'

function App() {
  console.log("rendering App component")
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {items.map((item: Item, index: number) => (
        <Circle key={index} item={item} />
      ))}
    </div>
  )
}

export default App
