import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo_adicionar: "",
      estado_todo: "",
      todo_date: new Date(),
      update_state_message: "",
    }
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }  
    componentWillMount() {
      this.getLocalTodos()
    }
    componentDidMount() {
    }
    componentWillReceiveProps() {
    }
    shouldComponentUpdate() {
      return(true)
    }
    componentWillUpdate() {
    }
    componentDidUpdate() {
    }
    componentWillUnmount() {
    }

    handleInputChange(event) {
      console.log(event.target.value);
      this.setState({
        //os [] permitem adicionar um nome dinâmico à função
        [event.target.name]: event.target.value
      })
    }

    handleSubmitForm(e) {
      e.preventDefault();
      if(this.state.todo_adicionar !== "") {
        this.state.todos.push({
          text: this.state.todo_adicionar,
          date: this.state.todo_date,
          done: this.state.estado_todo === "porFazer" ? false : true,
        });
        //o set state volta a injectar dentro do state os novos dados
        this.setState({
          todos: this.state.todos,
          todo_adicionar: "",
          todo_date: "",
        })
        this.todo_adicionar.focus();
      }else{
        alert("o campo tem de estar preenchido!")
      }
      this.setLocalTodos(this.state.todos)
    }

    getLocalTodos() {
      let todos = localStorage.getItem("todos");
      if (todos === null) {
        todos = [];
      }else{
        todos = JSON.parse(todos)
      }
      this.setState({todos});
    }
  
    setLocalTodos (todos) {
      this.setState({update_state_message: "A gravar dados localmente..."})
      localStorage.setItem("todos", JSON.stringify(todos))
      setTimeout(() => {
        this.setState({update_state_message: ""})
      },2000)
    }

    handleRemove(todoIndex, e) {
      this.state.todos.splice(todoIndex, 1);
      this.setState({todos: this.state.todos})
      localStorage.setItem("todos", this.state.todos)
      this.setLocalTodos(this.state.todos)
    }

    handleEdit(todoIndex, e) {
      this.setState({
        todo_editing: this.state.todo_editing === todoIndex ? null : todoIndex    
      })
      setTimeout(() => console.log(this.state.todo_editing, this.state.todo_editing >= 0,!isNaN(this.state.todo_editing)), 10)
    }

    handleChangeTodoName(todoIndex, e) {
      console.log("handleChangeTodoName", todoIndex, e)
      this.state.todos[todoIndex].text = e.target.value
      this.setState({
        todos: this.state.todos
      })
      this.setLocalTodos(this.state.todos)
    }

    handleToggleDone(todoIndex, e) {
      this.state.todos[todoIndex].done = !this.state.todos[todoIndex].done 
      this.setState({
        todos: this.state.todos
      })
      this.setLocalTodos(this.state.todos)
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to my To-Do List</h1>
        </header>
        <p className="App-intro">
          Add a to-do here
        </p>

        <form>
        
        <input placeholder="what do you need to do?" ref={(el) => {this.todo_adicionar = el}} type="text" name="todo_adicionar" onChange={this.handleInputChange} value={this.state.todo_adicionar}/>
          <br/>
          <input type="date" id="todo_date" name="todo_date" value={this.state.todo_date} onChange={this.handleInputChange}/>
          <select name="estado_todo" onChange={this.handleInputChange} value={this.state.estado_todo}> 
              <option value="feito"> Done </option>
              <option value="porFazer"> To Be Done </option>
            </select>
          <button onClick={this.handleSubmitForm}>Add a To-Do</button>
        </form>
        <p className="update_message">{this.state.update_state_message}</p>

        <ul className="lista_done">
        <h2>Completed!</h2>
          {this.state.todos.map((item, index) => {
            if (item.done === true) {
              return <li key={"todo" + index} className={item.done ? "done" : "tbd"}> 
                {
                (this.state.todo_editing === index) ?
                <input onChange={this.handleChangeTodoName.bind(this, index)} value={item.text}/>
                :  <span className="todo_text">{item.text}</span>
                }
                <span className="todo_date">{item.date}</span>
                <span className="todo_estado">{item.done}</span>

                <div className="button_wrapper">
                  <button 
                    onClick={this.handleToggleDone.bind(this, index)}>
                    Toggle
                  </button>

                  <button 
                    onClick={this.handleRemove.bind(this, index)}  
                    disabled={(!isNaN(this.state.todo_editing) && this.state.todo_editing !== null) ? "disabled" : "" }>
                    Remover
                  </button>

                  <button 
                    onClick={this.handleEdit.bind(this, index)}>
                    {(this.state.todo_editing === index) ? "stop edit" : "Edit"}
                  </button>
                </div>

              </li>
              }
            })}
        </ul>

         <ul className="lista_tbd">
          <h2>To be Done...</h2>
          {this.state.todos.map((item, index) => {
            if (item.done === false) {
              return <li key={"todo" + index} className={item.done ? "done" : "tbd"}> 
                {
                (this.state.todo_editing === index) ?
                <input onChange={this.handleChangeTodoName.bind(this, index)} value={item.text}/>
                :  <span>{item.text}</span>
                }
                <span>{item.date}</span>
                <span>{item.done}</span>

                <div className="button_wrapper">
                  <button 
                    onClick={this.handleToggleDone.bind(this, index)}>
                    Toggle
                  </button>

                  <button 
                    onClick={this.handleRemove.bind(this, index)}  
                    disabled={(!isNaN(this.state.todo_editing) && this.state.todo_editing !== null) ? "disabled" : "" }>
                    Remove
                  </button>

                  <button 
                    onClick={this.handleEdit.bind(this, index)}>
                    {(this.state.todo_editing === index) ? "stop edit" : "Edit"}
                  </button>
                </div>
              </li>
              }
            })}
        </ul>

      </div>
    );
  }
}

export default App;
