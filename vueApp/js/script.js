const app = new Vue({
    el: '#app',
    data: {
        // the users query
        query: '',

        // the stored response data from imbd api
        status: null,
        movies: [],
        len: 0,

        // this is for a main movie
        mainMovie: undefined,

        // shows the bin of movies
        searching: false,

        // the ui messag; ex: searching... || No results found for 'fake movie'.
        uiMessage: 'Search for a movie'
    },
    methods: {

        // the mesthod handles the api data fetching
        search: function() {
            const app = this;

            // makes the http GET request to the imdb api
            axios.get(`https://www.omdbapi.com/?type=movie&s=${ app.query }&apikey=BanMePlz`)
            .then(function( response ) {
                  response = response.data

                  if ( response.Response === 'True' && response.Search.length !== 0 ) {
                      // assigning all the movie to movies array
                      app.movies = response.Search;
                      app.status = true;
                      app.len = response.Search.length;
                  } else {

                      app.status = false;
                      app.uiMessage = `No results found for '${ app.query }'`;
                  }

                  // setting the uiMessage to a empty string
                  app.uiMessage = '';
            })
            .catch(err => console.log(err))
        },

        moreInfo: function(omdbid) {
            const app = this;

            axios.get(`https://www.omdbapi.com/?i=${ omdbid }&apikey=BanMePlz`)
            .then(response => {
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
                return this.search();
            }

            // emptying the props
            this.len = '';
            this.movies = [];
            this.uiMessage = 'search for a movie';
            this.searching = false;
        }

    }
});
