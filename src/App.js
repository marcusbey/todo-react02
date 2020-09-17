import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        todoList:[],
        //on event activeItem will be updated
        activeItem:{
          id: null, 
          title: '',
          completed:false,
          },
        editing: false,
      }
      this.fetchTasks = this.fetchTasks.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.getCookie = this.getCookie.bind(this);
  }; 

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


  // lifecycle methode
  // whenever this is called we will triger an other function called fetchMask
  componentWillMount(){
    this.fetchTasks();
  } 
 
  // Use the fecth api to make api call to the other app url patch
  //1- get the data
  //2- Convert the data to json
  //3- Return data as todoList
  fetchTasks(){
    console.log('Fetchning...');
    fetch('http://127.0.0.1:8000/api/task-list/')
    .then(response => response.json())
    .then(data => 
      this.setState({
        todoList:data,
      })
      ) 
  }

  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    console.log('Name:', name);
    console.log('Value:', value);
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }
 
  handleSubmit(e){
    e.preventDefault();
    console.log('ITEM:', this.state.activeItem);

    const csrftoken = this.getCookie('csrftoken');

    const url = "http://127.0.0.1:8000/api/task-create/";
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks();
      this.setState({
          activeItem:{
          id: null, 
          title: '',
          completed:false,
          }
      })
    }).catch(function(error){
        console.log('ERROR:', error)
      })
  }

    render() {
      const tasks = this.state.todoList;
      return (
          <div className="container">

            <div id="task-container">
                <div  id="form-wrapper">
                    <form onSubmit={this.handleSubmit} id="form">
                      <div className="flex-wrapper">
                          <div style={{flex: 6}}>
                              <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder="Add task.." />
                              {/*onChange="" */}
                          </div>
                          <div style={{flex: 1}}>
                              <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                    </form>
                  </div>
                  <div id="list-wrapper">
                    {tasks.map(function(task, index){
                      return(
                        <div key={index} className="task-wrapper flex-wrapper">
                          <div style={{flex:7}}>
                            <span>{task.title}</span>
                          </div>

                          <div style={{flex:1}}>
                            <button className="btn btn-sm btn-outline-info">Edit</button>
                          </div>

                          <div style={{flex:1}}>
                            <button className="btn btn-sm btn-outline-dark delete">Delete</button>
                          </div>

                        </div>
                      ) 
                    })}

                  </div>
                </div>
         </div>
    );
  }
}
export default App;
