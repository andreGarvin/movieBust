import React, { Component } from 'react';

export default class movieCard extends Component {

    showMoreInfoCard() {
        this.props.moreInfo.call(this, this.props.imdbID )
    }
    render() {
        const movie = this.props.movie
        return (
            <div className='bin col-xs-5 col-md-3 col-md-offset-2 col-xs-offset-2'>
                <h2>{ movie.Title }</h2>
                <p className='lead'>Year: { movie.Year }</p>
                <p className='lead'>type: { movie.Type }</p>
                {
                    movie.Poster !== "N/A" ?
                    <img src={ movie.Poster } className='img-responsive img-thumbnail' />
                    : <p style={{ color: 'gray', fontFmaily: 'italic' }}>No poster</p>
                }
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <a href={ `https://www.google.com/search?q=${ movie.Title }` } className='btn btn-success btn-block'>{ movie.Title } on google</a>
                    <button onClick={ this.showMoreInfoCard.bind(this) } className='btn btn-primary btn-block'>more info</button>
                </div>
            </div>
        )
    }
}
