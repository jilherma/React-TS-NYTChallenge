import React, { Component } from 'react'; 
import NytResults from './NytResults';

type SearchResults = {
    searchTerm: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: any
};

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'm2hSvS2083mfk1sglcmopG7AGIQbWXvn';

class Search extends Component<{}, SearchResults> {
    constructor(props: any) {
        super(props)
        this.state = {
            searchTerm: '',
            startDate: '',
            endDate: '',
            pageNumber: 0,
            results: [],

        };
    }

    fetchResults = () => {
        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`; 

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    results: data.response.docs
                })
            })
    }

    handleSubmit = (event: any) => {
        this.setState({
            pageNumber: 0,

        })
        this.fetchResults();
        event.preventDefault()
      };
     
    changePageNumber = (event: any, direction: string) => {
        event.preventDefault()
        if (direction === 'down') {
          if (Number(this.state.pageNumber > 0)) {
              this.setState({
                  pageNumber: this.state.pageNumber -1,  
              })
            this.fetchResults();
          }
        }
        if (direction === 'up') {
          this.setState ({
              pageNumber: this.state.pageNumber +1,
          })
          this.fetchResults();
        }
      }
     
      render() {
          return (
            <div className="main">
              <div className="mainDiv">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                  <span>Enter a single search term (required) : </span>
                  <input type="text" name="search" onChange={(e) => this.setState({searchTerm: e.target.value})} required />
                  <br />
                  <span>Enter a start date: </span>
                  <input type="date" name="startDate" pattern="[0-9]{8}" onChange={(e) => this.setState({startDate: e.target.value})} />
                  <br />
                  <span>Enter an end date: </span>
                  <input type="date" name="endDate" pattern="[0-9]{8}" onChange={(e) => this.setState({endDate: e.target.value})} />
                  <br />
                  <button className="submit">Submit search</button>
                </form> 
                {/* below in the ternary the condition we're checking is if results length is greater than zero AKA do we have any results. If we do have results display our NytResults component, if we don't then we can just display an empty div (null) */}
                {
                  this.state.results.length > 0 ? <NytResults results={ this.state.results } changePage={ this.changePageNumber } /> : null 
                }
              </div>
            </div>
           );
      }
};
     

export default Search; 