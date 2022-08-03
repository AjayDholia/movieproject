import React from 'react';

class Category extends React.Component{
    state = {
        allGenre:["Action","Comedy","Romance","Thriller","Horror"],
        // currGenre:"All Genre"
    };

    componentDidMount(){
        fetch("/genre").then(function(res){
            return res.json()
        }).then((json)=>{
            this.setState({allGenre:json})
        })
    }
    render(){
        return(
            <ul class="list-group">
                <li class="list-group-item" Key="allGenre" onClick={()=>{
                       this.props.recieveCurrGenre("All Genre");
                }}>
                    AllGenre</li>
                {
                    this.state.allGenre.map((el)=>{
                        return<li class="list-group-item" Key={el.id} onClick={()=>{
                            this.props.recieveCurrGenre(el.name);
                     }}
                     >
                        {el.name}
                     </li>;
                    })
                }
            
          </ul>
    
        );

    }
  
}
export default Category;