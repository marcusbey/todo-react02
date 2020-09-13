import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
constructor(props){
  super(props);
    this.state = {
      todoList:[],
      activeItem:{
        id: null, 
        title: '',
        completed:false,
        },
      editing: false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
};
// lifecycle methode
componentWillMount(){
  this.fetchTasks()
}

fetchTasks(){
  console.log('Fetchning...')
}

fetchTasks(){

}

  render() {
    return (
        <div className="container">

          <div id="task-container">
              <div  id="form-wrapper">
                  <form  id="form">
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input onChange='' className="form-control" id="title" value='' type="text" name="title" placeholder="Add task.." />
                         </div>

                         <div style={{flex: 1}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                        </div>
                    </div>
                  </form>

                </div>

              </div>

          </div>

  );
}
}
export default App;
 