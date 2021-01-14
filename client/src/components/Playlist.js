import React from 'react';
import Item from './Item';
import './Playlist.css';
class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            txt:''
        };
    }
    componentDidMount(){               
    }  

    searchapi(str_search){
        var component=this;
        const api="https://api.discogs.com/database/search?key=HPhPYYZYgeAosoXAVxwb&secret=mhykymYrtqIynVpAVWAPUkczxTSVeLDu&artist="+str_search+"&country=canada";        
        fetch(api)
        .then((res)=>res.json())
        .then(data => 
            {              
                component.setState({
                    list:data.results
                });
                for(let item of data.results){
                    console.log(item);
                }                
            }            
        );
    }

    submitHandler = e=>{
        e.preventDefault();        
        this.searchapi(this.state.txt);
    };

    changeHandler=e =>{
        this.setState({'txt':e.target.value});
    };

    render(){
        const names=this.state.list;            
        return (
        <div>
        <div className="container-fluid">             
        <form className="search" onSubmit={this.submitHandler}>
            <div className="row border-bottom pb-2">
                <div className="col-sm-3 offset-4 p-0">
                <input  type="search" className="form-control" 
        onChange={this.changeHandler}
        placeholder="Enter text to search" />
        </div>
        <div className="col-sm-1 p-0">
        <button className="btn btn-success btn-block">Search</button>
        </div>
                </div>
        </form>
        <div className="container-fluid">
        <div className="row">
        { names.map((person) => (            
            <Item person={person} Title={person.title} Year={person.year} Thumb={person.thumb} />
        ))}            
        </div>
        </div>
        </div>
        </div>);
    }
}

export default Playlist;
