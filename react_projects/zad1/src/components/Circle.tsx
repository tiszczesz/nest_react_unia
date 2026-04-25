import type { Item } from "../data/colors"

type Props = {
    item: Item
}

function Circle({ item }: Props) {
    return (
        <div style={{
            backgroundColor: item.color,
            width: item.radius * 2,
            height: item.radius * 2,
            borderRadius: '50%'
        }}>
           
        </div>
    )
}

export default Circle