import React,{ useState } from "react"

const Header = (props) => {
    const {addItem} = props
    const [text,setText] = useState('')
    const onAddItem = (event)=>{
        if(event.keyCode === 13){
            if(!text){
                return
            }
            // setText(text.trim)
            if(!text){
                return
            }
            setText(text.trim())
            if(!text){
                return
            }
            addItem({
                title:text,
                isCompleted: false
            })
            setText('')
        }
    }
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={onAddItem}
            />
        </header>
    )
}

export default Header