import React from 'react';

class Table extends React.Component{
    state={
      allMovies:[],
      currpage:1,
      
   
    };
    componentDidMount(){
      fetch("/movies").then(function(res){
          return res.json()
      }).then((json)=>{
          this.setState({allMovies:json});

          this.props.sentdata(json.length);
     });
  }

    render()
    {

       let moviesToDisplay = [];
       if(this.props.CurrGenre != "All Genre"){
        moviesToDisplay = this.state.allMovies.filter((el) =>{
          return el.genre.name == this.props.CurrGenre;
        });
       }
       else{
        moviesToDisplay = this.state.allMovies
       }

       if(this.props.searchString) {
        let strToCompare = this.props.searchString.toLowerCase();
       moviesToDisplay = moviesToDisplay.filter((el) =>{
          return el.title.toLowerCase().includes(strToCompare);
        });
       } 


       
        let numberofpage=Math.ceil(moviesToDisplay.length/5);
        let arr = [];
        for(let i = 1; i <= numberofpage; i++)
        {
          arr.push(i);
        }
         
        // let starting = (currpage -1) * 5
        let starting = (this.state.currpage - 1) * 5
        let endpage = (this.state.currpage * 5) - 1

         moviesToDisplay = moviesToDisplay.slice(starting,
          Math.min(endpage,moviesToDisplay.length-1)+1
        );
       
        return(
            <div>
            <table class="table">
          <thead>
     <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">Stock</th>
      <th scope="col">Rating</th>
      <th scope="col">Like</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {
      moviesToDisplay.map((el)=>{
        return(
          <tr key={el.id}>
      
          <td>{el.title}</td>
          <td>{el.genre.name}</td>
          <td>{el.numberInStock}</td>
          <td>{el.DailyRentalRate}</td>
          <td onClick={()=>
          {
            let allMovies = this.state.allMovies;
           let index =  allMovies.findIndex((e)=> e.id == el.id);
          allMovies[index].liked ?  (allMovies[index].liked  = false ) : (allMovies[index].liked  = true);
           
            this.setState({allMovies:allMovies});

          }}>{(el.liked)?"Liked":"Like"}</td>
          <td><button type="button" class="btn btn-danger" onClick={()=>{
             let allMovies = this.state.allMovies;

            allMovies= allMovies.filter((eli)=>{
              return eli.id != el.id;
             })
             this.props.sentdata(allMovies.length);
             this.setState({allMovies:allMovies});
          }}>
            Delete</button></td>
    
        </tr>

        );
      })
    }
   
      
    
    
  </tbody>
</table>
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" onClick={()=>
    {
      let currpage = this.state.currpage
      currpage--;
      if(currpage < 1) currpage = 1
      this.setState({currpage : currpage})
    }}>
      <a class="page-link" href="#">Previous</a></li>
    {
         arr.map((el) =>
         {
          return(
            <li class="page-item"  onClick={() =>
            {
              this.setState({currpage:el});
            }}>
              <a class="page-link" href="#">{el}</a></li>

          );
         })
    }
   
    <li class="page-item"
    onClick={()=>
    
      {
        let currpage = this.state.currpage
        currpage++;
        if(currpage > numberofpage) currpage = numberofpage
        this.setState({currpage : currpage});
      
    }}
    >
      <a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
            </div>
        );
    }
}
export default Table;