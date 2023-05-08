import './footer.css';
const Footer = (props) => {
    const { setStatusFilter, todoList, currentFilter,clearCompleted } = props
    var body
    if(todoList.length > 0){
        body=(
            <>
                <footer className="footer">
            <span className="todo-count">
                <strong>{todoList.filter(item => item.isCompleted !== true).length}</strong>
                <span> </span>
                <span> {todoList.length > 1 ? "items" : "item"}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                <li>
                    <a href="#/" className={currentFilter === 'all' ? "selected" : ""}
                        onClick={() => setStatusFilter("all")}>All</a>
                </li>
                <span></span>
                <li>
                    <a href="#/" className={currentFilter === 'active' ? "selected" : ""}
                        onClick={() => setStatusFilter("active")}>Active</a>
                </li>
                <span></span>
                <li>
                    <a href="#/" className={`${currentFilter === 'completed' ? "selected" : ""}`}
                        onClick={() => setStatusFilter("completed")}
                    >Completed
                    </a>
                </li>
            </ul>
            {
                todoList.filter((item) => item.isCompleted).length > 0 ?
                    <button className="clear-completed" onClick={clearCompleted}>Clear completed</button> : <button className="clear-completed"></button>
            }
        </footer>
            </>
        )
    }else{
        body=<></>
    }
    return (
        body
        
    )
}

export default Footer