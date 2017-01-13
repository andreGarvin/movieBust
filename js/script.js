// inititating the vue appilcation
var app = new Vue({
    // giving it the app to render
    el: '#app',
    data: {
        // the input
        query: '',
        // the stored response data from imbd api
        resp_data: {
            data: [],
            dlen: '',
            status: ''
        },
        // 
        view: false,
        // the ui messag; ex: searching... || No results found for 'fake movie'.
        uiMessage: ''
    },
    methods: {
        // the mesthod handles the api data fetching
        search: _.debounce(function() {
            // used to help access the app properties in axios
            var app = this;
            
            // makes the http request to the imdb api
            axios.get('https://www.omdbapi.com/?type=movie&s=' + app.query )
                // if the api gives back a 200
                .then(function( response ) {
                    
                    /*
                        if the response the api gives us is 'True',
                        meaning that there is results found for the 
                        query.
                    */
                    if ( response.data.Response === 'True' ) {
                        
                        // assigning all the data to the results object
                        app.resp_data.data = response.data.Search;
                        app.resp_data.status = response.data.Response;
                        app.resp_data.dlen = '# of results: ' + response.data.totalResults;
                    }
                    else {
                        
                        // assinging the data to the 
                        app.resp_data.status = response.data.Response;
                        app.resp_data.data = 'No results found for: ' + app.query;
                    }
                    
                    // changing the uiMessage back to a empty string
                    app.uiMessage = '';
                });
                
        }, 500),
        
        // opend the link ong goglle for the movie searched
        open_link: function( title ) {
           window.open('https://www.google.com/search?q=' + title.split(' ').join('+'), '_target');
        }
        
    },
    watch: {
        /*
            Watchs to see weather someone 
            is typing in the input feild
        */
        query: function() {
            
            /*
                if the user is typing something do a search with the
                given data/query provide
            */
            if ( this.query.length > 0 && this.query.length !== 0 ) {
                
                // reveals the binding of the input field and the ui message
                this.view = true;
                
                // changes the uiMessage show the user the results are
                // being retrived
                this.uiMessage = 'searching...';
                
                // calls the method for searching for the movie
                this.search();
            }
            else {
                
                /* 
                    changing the uiMessage and message 
                    back to a empty property
                */
                this.view = false;
                this.uiMessage = '';
            }
        }
        
    }
});