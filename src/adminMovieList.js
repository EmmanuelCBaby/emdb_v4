import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import swal from 'sweetalert';
import bootstrap from 'bootstrap';
import Moviedetail from './MovieDetail';

class AdminMovielist extends Component {

    constructor(props){
        super(props);
        this.state = {
            details:[],
            list_screen:true,
            detail_screen:false
        }
        this.moreDetails=this.moreDetails.bind(this);
        this.back=this.back.bind(this);
        this.remove=this.remove.bind(this);
    }

    back(){
        this.setState({
            list_screen:true,
            detail_screen:false
        })
    }

    //function to get more movie details
    moreDetails(event){
        axios({
            method:'post',
            url:'http://localhost:3001/moviedetails',
            data:{
                movieid:event.target.id
            },
            withCredentials:true
        })
        .then((obj)=>{
            this.setState({
                details:obj.data,
                detail_screen:true,
                list_screen:false
            })
        })
        .catch((error)=>{
            swal({
                title: "Oops",
                text: "Something went wrong.",
                icon: "warning",
              });
        })
    }

    remove(event){
        axios({
            method:'post',
            url:'http://localhost:3001/remove-movie',
            data:{
                id:event.target.id
            },
            withCredentials:true
        })
        .then((obj)=>{
            if(obj.data === 'success'){
                swal({
                    title: "Success",
                    text: "Removed from Movie list",
                    icon: "success",
                  });
                this.props.movietohome();
            }
        })
        .catch((obj)=>{
            swal({
                title: "Oops",
                text: "Could not remove from Movie list",
                icon: "warning",
              });
        })
    }

    render() {
                var movie_detail_list=(
                    <div className="Slideshow">
                    <header className="App-header">
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                    </header>
                    <div>
                        {
                            this.props.result.map((element,index)=>{
                                var fakeid = index;
                                return(
                                    <div class="card" key={index}> 
                                    <div class="card-header" id={fakeid}>
                                    <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" className="searchresult-title" data-toggle="collapse" data-target={`#collapse${fakeid}`} aria-expanded="false" aria-controls={`collapse${fakeid}`}>
                                    <div>
                                        <p className="searchresult-div-title">{element.title}</p>
                                        <img className="searchresult-image" src={`https://image.tmdb.org/t/p/w92/${element.poster_path}`} alt="poster" />
                                        <button className="admin-userlist-button" id={element._id} onClick={this.remove}>Remove</button>
                                    </div>
                                    </button>
                                    </h5>
                                    </div>
                                    <div id={`collapse${fakeid}`} class="collapse" aria-labelledby={fakeid} data-parent="#accordion">
                                        <div class="card-body">
                                        <p className="searchresult">Rating: </p><label className="searchcontent">{element.vote_average}</label>
                                        <p className="searchresult">Language: </p><label className="searchcontent">{element.original_language}</label>
                                        <p className="searchresult">Overview: </p><label className="searchcontent">{element.overview}</label>
                                        <p className="searchresult">Release Date: </p><label className="searchcontent">{element.release_date}</label>
                                        <br />
                                        <button id={element.id} className="searchresult-read-more" onClick={this.moreDetails}>Read More</button>
                                        </div>
                                    </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                  </div> 
                )

                return(
                    <div>
                        {this.state.list_screen ? movie_detail_list : null}
                        {this.state.detail_screen ? <Moviedetail moviedetails = {this.state.details} backward = {this.back}/> : null}
                    </div>
                );
    }
}

export default AdminMovielist;