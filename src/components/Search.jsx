
import {React, Component} from 'react';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: null,
            str: 'default',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.componentDidMount();
    }

    changeText(event){
        this.setState({
            str: event.target.value
        });
    }

      async componentDidMount(){
        const url = `https://apis.is/company?name=${this.state.str}`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({company: data.results, loading: false})
        console.log(data);
        console.log(url);
      
    }

    render(){
        let companyList;
        if(this.state.str !== "default"){
            companyList = <div>{this.state.company.map(item => 
                <div><li>{item.name}</li></div>)}</div>;
        }
        else{
            companyList = <div></div>
        }
        return (
            <div>
            
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="name">Search company name </label>
                        <input type="text" id="name" onChange={this.changeText.bind(this)}/>
                        <button onSubmit={this.handleChange}>Submit</button> 
                    </form>
                </div>
                <div>
                    {companyList}
                </div>
            </div>
        );
    }
};
    

export default App;