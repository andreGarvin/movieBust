import React, { Component } from 'react';
import axios from 'axios';

// Components
import MoreInfoCard from './moreInfoCard';
import MovieCard from './movieCard';

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: '',
            movies: [],
            status: null,
            searching: false,
            mainMovie: undefined,
            uiMessage: 'search for a movie'
        }
    }

    searchForQuery(e) {
        const query = e.target.value.replace(/^\s+|\s+$/g, '');

        if ( query.length !== 0 ) {
            this.setState({ query, searching: true })

            const app = this;
            axios.get(`https://www.omdbapi.com/?type=movie&s=${ this.state.query }&apikey=BanMePlz`)
            .then(function( response ) {
                  response = response.data

                  if ( response.Response === 'True' && response.Search.length !== 0 ) {
                      // assigning all the movie to movies array
                      app.setState({
                          movies: response.Search,
                          status: true,
                          len: response.Search.length
                      })
                  } else {

                      app.setState({
                          status: false,
                          uiMessage: `No results found for '${ app.state.query }'`
                      })
                  }

                  app.setState({
                      uiMessage: ''
                  })
            })
            .catch(err => console.log(err))
        } else {

            this.setState({
                len: 0,
                query: '',
                movies: [],
                status: false,
                searching: false,
                mainMovie: undefined,
                uiMessage: 'search for movies'
            })
        }
    }

    moreInfo(omdbid) {
        const state = this;

        axios.get(`https://www.omdbapi.com/?i=${ omdbid }&apikey=BanMePlz`)
        .then(response => {
            state.setState({
                mainMovie: response.data
            })
        })
        .catch(err => console.log(err))
    }

    backOutInfoCard() {
        this.setState({
            mainMovie: undefined
        })
    }

    render() {
        const movies = this.state.movies.map(movie => <MovieCard key={ movie.imdbID } imdbID={ movie.imdbID } moreInfo={ this.moreInfo.bind(this) } movie={ movie } />)
        return (
            <div>
                <div className='navbar navbar-default'>
                    <h1>MovieBust</h1>
                </div>
                <div className='container-fuild'>
                    <div className='search-container col-xs-12 col-sm-12 col-md-12'>
                        <div className='col-xs-7 col-md-6 col-md-9 col-xs-offset-3 col-sm-offset-3'>
                            <input onChange={ this.searchForQuery.bind(this) } className='form-control' placeholder='search' />
                        </div>
                    </div>
                    <h1>{ this.state.searching ? `searching for  ${ this.state.query }` : '' }</h1>
                    <h3>{ this.state.len ? `${ this.state.len } results` : '' }</h3>

                    <h3 id='uiMessage' className='text-center'>{ this.state.uiMessage }</h3>

                    <div className='col-xs-12 col-sm-12 col-md-12'>
                        <div className='row'>
                          { this.state.mainMovie === undefined ? movies : <MoreInfoCard goBack={ this.backOutInfoCard.bind(this) } movie={ this.state.mainMovie } /> }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
