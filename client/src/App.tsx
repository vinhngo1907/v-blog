import { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TodoItem from './components/TodoItem';
// import arrowImg from './assets/down-arrow.png'
import Footer from './components/footer/Footer';
class App extends Component {
    constructor() {
        super()
        // this.todoList = [
        //     { id: "1", title: 'Di cho', isCompleted: true }, 
        //     { id: "2", title: 'Di Do xang', isCompleted: true },
        //     { id: "3", title: 'Di Da bong', isCompleted: false }
        // ]
        this.state = {
            todoList: [],
            // newItem: "",
            currentFilter: "all",
            isCheckedAll: false,
            todoEditing:''
        }
        // this.onKeyUp = this.onKeyUp.bind(this)
        // this.onChange = this.onChange.bind(this)
        // this.setStatusFilter = this.setStatusFilter.bind(this)
    }



    onItemClicked(item) {
        // console.log("Item clicked",item)
        const { todoList } = this.state
        const index = todoList.indexOf(item)
        this.setState({
            todoList: [
                ...todoList.slice(0, index),
                {
                    ...item,
                    isCompleted: !item.isCompleted
                },
                ...todoList.slice(index + 1)
            ]

        })
        // return (event) => {
        //     const { todoList } = this.state
        //     const index = todoList.indexOf(item)
        //     this.setState({
        //         todoList: [
        //             ...todoList.slice(0, index),
        //             {
        //                 ...item,
        //                 isCompleted: !item.isCompleted
        //             },
        //             ...todoList.slice(index + 1)
        //         ]

        //     })
        // }
    }


    // onKeyUp(event) {
    //     if (event.keyCode === 13) {
    //         let text = event.target.value
    //         if (!text) {
    //             return
    //         }
    //         text = text.trim()
    //         if (!text) {
    //             return
    //         }
    //         this.setState({
    //             newItem: "",
    //             todoList: [
    //                 { title: text, isCompleted: false },
    //                 ...this.state.todoList
    //             ]
    //         })
    //     }
    // }
    // onChange(event) {
    //     this.setState({
    //         newItem: event.target.value
    //     })
    // }
    // setStatusFilter(status) {
    //     console.log(status)
    //     this.setState({
    //         currentFilter: status
    //     })
    // }

    render() {
        var { todoList, isCheckedAll, currentFilter, filterList,todoEditing } = this.state
        const allItemClicked = (event) => {

            const updatedListTodos = todoList.map(item => ({ ...item, isCompleted: !isCheckedAll }))
            this.setState({
                isCheckedAll: !isCheckedAll,
                todoList: updatedListTodos
            })
        }
        const addItems = (todo = {}) => {
            this.setState({
                todoList: [
                    todo,
                    ...this.state.todoList
                ]
            })
        }

        const removeItem = (item) => {
            // const { todoList } = this.state
            const index = todoList.indexOf(item)
            let newList = todoList.filter((item) => todoList.indexOf(item) !== index)
            this.setState({
                todoList: [
                    ...newList
                ]
            })
        }
        const editItem = (item,index) => {
            this.setState({
                todoList: [
                    ...todoList.slice(0,index),
                    {
                        ...item,
                        title:item.title
                    },
                    ...todoList.slice(index+1)
                ]
            })
        }
        const setStatusFilter = (status) => {
            this.setState({
                currentFilter: status
            })
        }

        const clearCompleted = ()=>{
            this.setState({
                todoList:[
                    ...todoList.filter((item)=>!item.isCompleted)
                ]
            })
        }

        const getEditTodo = (index = '')=>{
            this.setState({
                todoEditing:todoEditing = index.toString()
            })
        }

        if (currentFilter === 'completed') {
            filterList = todoList.filter((item) => item.isCompleted === true)
        } else if (currentFilter === 'active') {
            filterList = todoList.filter((item) => item.isCompleted !== true)
        }

        return (

            <div className="App">
                {/* <h1>todos</h1>
                <header className="header">
                    <label><img src={arrowImg} alt="" width={32} height={32} /> </label>
                    <input type="text" placeholder="What needs to be done?" className="new-todo"
                        onKeyUp={this.onKeyUp}
                        value={newItem}
                        onChange={this.onChange}
                    />
                </header> */}
                <Header addItem={addItems} />
                <section className="main">
                    <input id="toggle-all" className="toggle-all" type="checkbox" />
                    <label htmlFor="toggle-all" onClick={allItemClicked}></label>
                    <ul className="todo-list">
                        {
                            (currentFilter !== "all" ? filterList : todoList).map((item, index) =>
                                <TodoItem item={item}
                                    // onClick={this.onItemClicked(item)} 
                                    onItemClicked={() => this.onItemClicked(item)}
                                    key={index}
                                    index={index}
                                    removeItem={removeItem}
                                    getEditTodo={getEditTodo}
                                    todoEditing={todoEditing}
                                    editItem={editItem}
                                />
                            )
                        }
                    </ul>
                </section>
                <Footer
                    todoList={todoList}
                    currentFilter={currentFilter}
                    // setStatusFilter={(status) => this.setState({ currentFilter: status })} 
                    setStatusFilter={setStatusFilter}
                    clearCompleted={clearCompleted}
                />
            </div>
        );
    }
}

export default App;
