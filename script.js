var app = new Vue({
                el: '#app',
                data: {
                    query: '',
                    resp_data: {
                        data: [],
                        dlen: '',
                        status: ""
                    },
                    view: false,
                    uiMessage: ''
                },
                methods: {
                    search: _.debounce(function() {
                        var app = this;
                        
                        axios.get('https://www.omdbapi.com/?type=movie&s=' + app.query )
                            .then(function( response ) {
                                console.log( response );
                                if ( response.data.Response === 'True' ) {
                                    
                                    app.uiMessage = '';
                                    app.resp_data.data = response.data.Search;
                                    app.resp_data.status = response.data.Response;
                                    app.resp_data.dlen = '# of results: ' + response.data.totalResults;
                                    
                                }
                                else {
                                    app.uiMessage = '';
                                    app.resp_data.data = '';
                                    app.resp_data.status = response.data.Response;
                                    app.resp_data.data = 'No results found for: ' + app.query;
                                }
                            });
                            
                    }, 500),
                    
                    open_link: function( title ) {
                        window.open('https://www.google.com/search?q=' + title.split(' ').join('+'), '_target');
                    }
                    
                },
                watch: {
                    
                    query: function() {
                        if ( this.query.length > 0 && this.query.length !== 0 ) {
                            
                            this.view = true;
                            this.uiMessage = 'searching...';
                            this.search();
                        }
                        else {
                            
                            this.view = false;
                            this.uiMessage = '';
                            this.resp_data.dlen = '';
                            this.resp_data.data = '';
                            this.resp_data.status = '';
                        }
                    }
                    
                }
            });