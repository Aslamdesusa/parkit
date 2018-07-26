import Hapi from 'hapi';
import routes from './routes'
import Inert from 'inert';
import Vision from 'vision';

const server = new Hapi.Server();

const port = process.env.PORT || 8080;

server.connection( {
    port: port,
    routes: { cors: true }
});

server.register([
    Inert,
    Vision,
    {
        register:require('hapi-swagger')
    }],
    function(err){
    if(err){
        server.log(['error'], 'hapi-swagger load error: ' + err)
    }
    else{
    }
        server.log(['start'], "hapi-swagger interface loaded!")
});


server.route({

    method: 'GET',
    path: '/hello',
    handler: ( request, reply ) => {
        reply( 'Hello World!' );
    }

});


module.exports = server;


server.views({
    engines: {
        html: require('handlebars')
    },
    path: 'template',
    layout: 'layout'
})

server.route({
path: '/{path*}',
method: "GET",

handler: {
    directory: {
        path: 'template',
        listing: true,

    }
}

});


server.route(routes)

server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

});

