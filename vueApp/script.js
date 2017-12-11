const app = new Vue({
    el: '#app',
    data: {
        // the users query
        query: '',

        // the stored response data from imbd api
        status: null,
        movies: [],
        len: 0,

        API_KEY: 'PlzBanMe2',
        // this is for a main movie
        mainMovie: undefined,

        // shows the bin of movies
        searching: false,

        // the ui messag; ex: searching... || No results found for 'fake movie'.
        uiMessage: 'Search for a movie'
    },
    methods: {

        // the mesthod handles the api data fetching
        search: function( query ) {

            async function filterForBadMovies( query ) {
                const { data } = await axios.get(`http://www.omdbapi.com/?type=movie&s=${this.query}&apikey=${this.API_KEY}`) 
                
                if (data.Response === 'True' && data.Search.length !== 0) {
                    const { Search } = await data
                    const badMovies = [];

                    for (let i in Search) {
                        i = Search[i]
                        const { data } = await this.moreInfo(i.imdbID, 'fetch')

                        const ratings = data.Ratings.map(j => {
                            const rating = j.Value
                            if (rating.split('/').length === 2) {
                                return parseInt(rating.split('/')[0])
                            } else if (rating.split('%').length === 2) {
                                return parseInt(rating.split('%')[0])
                            }
                        })

                        for (let e in ratings) {
                            if (ratings[e] <= 5) {
                                badMovies.push(i)
                            } else if (ratings[e] <= 40 && ![6, 7, 8, 9, 10].includes(ratings[e])) {
                                badMovies.push(i)
                            }
                        }
                    }

                    return await {
                        badMovies,
                        status: true,
                    }
                } else if (data.Response === 'False') {
                    return await undefined
                }
            } 


            filterForBadMovies.call(this, query )
                .then(res => {
                    if (res === undefined) {
                        this.status = false;
                        this.uiMessage = `No results found for '${app.query}'`;
                    } else {
                        const { badMovies, status } = res
                        this.movies = badMovies
                        this.len = badMovies.length
                        this.status = status
                    }
                })
                .catch(err => {
                    this.status = false;
                    this.uiMessage = `No results found for '${app.query}'`;

                    this.uiMessage = '';
                })
        },

        moreInfo: function(omdbid, type) {

            return axios.get.call(this, `https://www.omdbapi.com/?i=${ omdbid }&apikey=${app.API_KEY}`)
                .then(response => {
                    if (type === 'fetch') {
                        return response
                    }
                    app.mainMovie = response.data
                })
                .catch(err => console.log(err))
        },

        // opens the link to a google search for the movie clicked
        open_link: function( title ) {
            window.open('https://www.google.com/search?q=' + title.split(' ').join('+'), '_target');
        }
    },
    watch: {
        // Watchs to see weather someone is typing in the input feild
        query: function() {

            // if the user is typing something do a search with the given query provide
            if ( this.query.length > 0 && this.query.length !== 0 ) {

                // reveals the binding of the input field and the ui message
                this.searching = true;

                // changes the uiMessage show the user the results are being retrived
                this.uiMessage = 'searching...';

                // calls the method for searching for the movie
                return this.search(this.query.trim());
            }

            // emptying the props
            this.len = '';
            this.movies = [];
            this.uiMessage = 'search for a movie';
            this.searching = false;
        }

    }
});
