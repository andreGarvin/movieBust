import React, { Component } from 'react';

export default class moreInfoCard extends Component {
      render() {
          const movie = this.props.movie
          return (
              <div className="bin col-xs-12 col-ms-12 col-md-12 col-xs-offset-3">
                  <button onClick={ this.props.goBack.bind(this) } className='btn btn-default pull-right'>GO back</button>
                  {
                      movie.Poster !== "N/A" ?
                      <img src={ movie.Poster } className='img-responsive img-thumbnail pull-right' />
                      : <p style={{ color: 'gray', fontFmaily: 'italic' }}>No poster</p>
                  }
                  <div className="col-xs-6 col-sm-6 col-md-6 pull-left">
                      <h2>{ movie.Title }</h2>
                      <h3>Rated: { movie.Rated }</h3>
                      <h3>Rating: { movie.imdbRating }</h3>
                      { movie.Ratings.filter(i => i.Source === 'Rotten Tomatoes').map(rate => <p>{ rate.Source }: { rate.Value }</p>) }
                      <h3>Time: { movie.Runtime }</h3>
                      <h2>A { movie.Production } Production</h2>
                      <h3>Genres: { movie.Genre }</h3>
                      <p className='lead'>Released: { movie.Released }</p>
                      <p className='lead'>Director: { movie.Director }</p>
                      <h3>{ movie.Plot }</h3>
                      <h3>Cast: { movie.Actors }</h3>
                      {
                          movie.Website !== "N/A" ?
                          <a className='lead' href={ movie.Website }>{ movie.Title }</a>
                          : <p>There is no movie website for this movie</p>
                      }
                  </div>
              </div>
          )
      }
}
