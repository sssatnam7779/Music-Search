import React from 'react';
class Tracklist extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            txt:''
        };
    }
    componentDidMount(){     
        var component=this;
        const api="http://localhost:3001/tracks";        
        fetch(api)
        .then((res)=>res.json())
        .then(data => 
            {              
                component.setState({
                    list:data
                });
                console.log(data);                
            }            
        );          
    }

    deleteTrack(id){
        const requestOptions = {
            method: 'DELETE'            
        };
        fetch('http://localhost:3001/tracks/'+id, requestOptions)
            .then(response => response.json())
            .then(data => {
                alert("deleted from database");
                window.location.href="/tracks";
            });
    }
    render(){
        const tracks=this.state.list;
        return (<div className="container-fluid">
            <h2>All Track List</h2>
        <div className="row">
        { tracks.map((track) => (
            <div className="col-sm-4">
                <div className="card">            
                    <h5>Track Id {track.id}</h5>
                    <h4>{track.title}</h4>
                    <a href={track.uri}>{track.uri}</a>
                    <button onClick={()=>this.deleteTrack(track.id)} className="btn btn-outline-danger m-3">Delete</button>
                </div>
            </div>
        ))}        
        </div>
        </div>);
    }

}

export default Tracklist;
