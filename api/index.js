//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genre} = require('./src/db.js');
const {getGenreApi} = require("./src/controller/genre")

// Syncing all the models at once.
conn.sync({ force: false })
.then( async() => {
   server.listen(3001, () => { console.log('%s listening at 3001') }); // eslint-disable-line no-console
   const genreApi= await getGenreApi();
   genreApi.map(e=>{
      Genre.findOrCreate({
         where: {name:e.name}
      })
   })  
});
