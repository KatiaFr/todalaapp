const app = require ('./app');
require ('./database');

const cors = require('cors');
app.use( cors({ origin: true, credentials: true  }) );

const port = 3001;
//async function mainConection () {    await 
    app.listen (port, () => {
    console.log("servidor listening on port: 3001, o", port);
    });

    /*
});
}
mainConection ();

*/