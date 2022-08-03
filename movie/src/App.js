import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Category from './components/Category';
import Search from './components/Search';
 import Table from './components/Table';
import { render } from '@testing-library/react';
import Custmor from './components/Custmor';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from './components/Blog';




class App extends React.Component {
  state = {
    noOfmovies : 0,
    searchString: "",
    CurrGenre : "All Genre"
  } 

   recievemoviedata = (number)=>{
          this.setState({noOfmovies:number});
   } 
   recieveSearchParam  = (param) =>{
    this.setState({searchString:param});
   }
   recieveCurrGenre = (Genre) =>{
    this.setState({CurrGenre:Genre});
   }

  render()
  {
  return (
    <>
     {/* <BrowserRouter>
      <Routes>
         <Route path="/" element={<App />}/>
           <Route path="/custmor" element={<Custmor />} />
          <Route path="blogs" element={<Blog />} />
          
           
      </Routes>
    </BrowserRouter> */}
    <Navbar/>
    <div className="row">
      <div className="col-2 p-4 ">
      <Category  recieveCurrGenre={this.recieveCurrGenre}/>
      </div>
      <div className="col-10 p-4 ">
        <div className="row">
        <div className="col-3  ">
          <Search noOfmovies= {this.state.noOfmovies} 
          recieveSearchParam={this.recieveSearchParam}/>
          </div>

        </div>
          <div className="row">
          <div className="col-8">
            <Table sentdata = {this.recievemoviedata}
            searchString={this.state.searchString}
            CurrGenre={this.state.CurrGenre}
            />
          </div>
        </div>  
      </div>



    </div>
    
    </>
   
  );
  }
}

export default App;
