const EndNodeApp = require('../EndNode/EndNodeApp.js');
const MixNode = require('../MixNode/MixNode.js');

const config = require('./config');
const data = require('./data')(config);

const app = require('./config/app')({config});
const controllers = require('./controllers')({data, config});
require('./routers')(app, controllers, {config});

config.port=3000

const MIXNODES = 4;
let nodes=[];

(async ()=>{
  const server = app.listen(config.port, config.ip, () => {
    console.log(`App running on localhost:${server.address().port}`);
  });

  // Start an End Node
  nodes.push(new EndNodeApp(8000, "http://127.0.0.1:" + config.port));

  // Start Mix Node
  for(let i=1;i<MIXNODES; i++){
      nodes.push(new MixNode(nodes[i-1].address(), 8000+i));
  }

  nodes.push(new MixNode(nodes[MIXNODES-1].address(), 80));
})();


