import React from 'react';


class Item extends React.Component {
    findGen(genre){
        let genres=['Default','Acoustic','Classic','Country','Metal','Pop/Dance','Rock'];
        for(let x of genres){            
            console.log(x.match(genre));
            if(x.match(genre)!=null){            	
            	return genres.indexOf(x.match(genre).input)+1;
            }
        }
        return 1;
    }
    sayHello(p){
        //alert("Hello "+p.title);
        let master_id=p.master_id;        
        let genere=this.findGen(p.genre[0]);                
        let title=p.title;
        let uri=p.uri;
        console.log(p);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title,playlist_id: genere, uri:uri,master_id:master_id })
        };
        fetch('http://localhost:3001/tracks', requestOptions)
            .then(response => response.json())
            .then(data => {
                alert("Saved to database");
				window.location.href="/tracks";
            });
    }

    render(){
        return <div className="col-sm-3">
            <div className="card">
            <img src={this.props.person.thumb} alt="Thumbnail" className="float-left" />
            <div className="card-body">
            <h5>{this.props.person.title}</h5>
            <h6>Year: {this.props.person.year}</h6>            
            <h6>Genre : {this.props.person.genre}</h6>
            <button onClick={()=>this.sayHello(this.props.person)} className="btn btn-primary">Save to your PC</button>
            </div>
            </div>
        </div>;
    }
}

export default Item;