
import './todoitem.css'
import { Component, useState } from 'react'
import checkCompleteImg from '../assets/check.png'
import checkImg from '../assets/check-mark.png'
// const TodoItem = ({item,onClick})=>{
//     function onItemClicked(item){
//         return (event)=>{
//             console.log('Item clicked',item)

//         }
//     }

//     return (
//         <div className="TodoItem">
//             <img onClick={onClick} className='itemImg' src={item.isCompleted?checkCompleteImg:checkImg} alt="" width={32}/>
//             <p className='itemTitle'>{item.title}</p>
//             {/* <input className="toggle" type="checkbox" data-reactid={item.id} /> */}
//             {/* <label data-reactid={item.id}>{item.title}</label> */}
//             {/* <button className="destroy" data-reactid={item.id}></button> */}
//         </div>  
//     );

// }
const TodoItem = (props) => {
    const { item, index, onItemClicked, removeItem, getEditTodo, todoEditing, editItem } = props
    // console.log(item.title)
    const isEditing = todoEditing === index.toString()
    const [text, setText] = useState('')
    const onEditItem = (item) => {
        editItem({
            ...item,
            title: text
        }, index)
        getEditTodo('')
    }
    return (
        // <div className="TodoItem">
        //     <img className='itemImg' src={item.isCompleted ? checkCompleteImg : checkImg} alt="" width={32} 
        //     onClick={onItemClicked}
        //     />
        //     <p className='itemTitle'>{item.title}</p>
        // </div>
        <li className={`TodoItem ${isEditing ? 'editing' : ''} ${item.isCompleted ? "completed" : ""}`}>

            {
                !isEditing ?
                    <div className='view'>
                        <img
                            className='itemImg'
                            src={item.isCompleted ? checkCompleteImg : checkImg} alt=""
                            onClick={onItemClicked}
                        />
                        <p className='itemTitle' onDoubleClick={() => getEditTodo(index)}>{item.title}</p>
                        <button className="destroy" onClick={() => removeItem(item)} />
                    </div> : <input
                        className="edit"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={onEditItem}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && text) {
                                onEditItem()
                            }
                        }}
                    />
            }
        </li>
    );
}
export default TodoItem