import  React,{Component} from 'react'
import Button from 'react-bootstrap/Button';

class AddToDo extends Component{
    state = {
        title:''
    }
    onsubmitEvent = (e) =>{
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title:''});

    }
    onchangeEvent =(e) =>{
        this.setState({[e.target.name]:e.target.value});
    }
    render(){
        return(
            <form onSubmit={this.onsubmitEvent} style={{display:'flex'}}>
                <input
                    type= "text"
                    sytle={{flex: '10', padding: '5px', width:'260px'}}
                    name="title"
                    placeholder="Add to do.."
                    value ={this.state.title}
                    onChange={this.onchangeEvent}
                />
                <Button as="input" type="submit" value="Submit" />

            </form>
        )

    }
}

export default AddToDo