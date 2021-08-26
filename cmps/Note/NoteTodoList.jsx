
export class NoteTodoList extends React.Component {

    state = {
        todo: null,
        //Check
        isEdit: false,
        title: ''
    };

    componentDidMount() {
        this.setState({ todo: this.props.todo, title: this.props.todo.txt })
    }

    //Functions for Edit mode
    onEditMode = () => {
        this.setState({ isEdit: true })
    }
    handleChange = ({ target }) => {
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ title: value })
    }
    onSaveTodo = (todo, title) => {
        this.props.onEditTodo(todo, title)
        this.setState({ isEdit: false })
    }


    render() {
        const { todo, isEdit, title } = this.state
        if (!todo) return (<div>Loading...</div>);

        return (
            <div className='todos'>
                {!isEdit &&
                    <React.Fragment>
                        {/* <p onClick={() => { this.props.onToggleTodo(todo) }} className={`${todo.isDone ? 'done' : ''}`}>{todo.txt}</p> */}
                        <p onClick={() => { this.onEditMode() }} className={`${todo.isDone ? 'done' : ''}`}>{todo.txt}
                            <button onClick={() => { this.props.onToggleTodo(todo) }} className="action-btn"><i className={`${todo.isDone ? 'todo-check' : 'todo-not-check'} far fa-check-square`}></i> </button></p>
                    </React.Fragment>
                }
                {isEdit &&
                    <form className='todo-edit'>
                        <label>Edit Todo: </label>
                        <input autoFocus type='text' name="title" value={title} onChange={this.handleChange} />
                        <button type="button" onClick={() => { this.onSaveTodo(todo, title) }}>Save</button>
                    </form>
                }
            </div>
        );
    }
}

// return <p key={todo.txt} onClick={() => { this.props.onToggleTodo(todo) }} className={`${todo.isDone ? 'done' : ''}`}>{todo.txt}</p>;
