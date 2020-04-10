const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser');
const RSA = require('hybrid-crypto-js').RSA;
const Crypt = require('hybrid-crypto-js').Crypt;
const localip = require('my-local-ip')

class MixNode {

    constructor(NEXTNODE, MIXPORT = 8000){
        
        this.MIXPORT = MIXPORT;
        this.NEXTNODE = NEXTNODE;
        
        // For handling file transmission
        const app = express();
        app.set('view engine', 'ejs'); // set the view engine to ejs
        // static/public folder (images, css and other static files)
        app.use('/static', express.static('src/public'));
        
        // Encryption Tools
        const crypt = new Crypt();
        const rsa = new RSA();
        
        // Allows us to read the post requests content
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());

        // Allow access to the unencrypted start files
        app.use('/',express.static('src/MixNode/unencrypted'));

        let MIXKEY;
        this.manifest;

        // Generate keys for this server
        rsa.generateKeypair((keypair) => {
            this.MIXKEY = {
                public: keypair.publicKey,
                private: keypair.privateKey
            };
            setTimeout(this.requestManifest.bind(this),100);
        },1024);

        // List of all addresses and public keys for all servers above in the chain
        app.get("/manifest", (req, res) => {
            if(this.manifest===undefined){
                res.sendStatus(418);
                //console.log(manifest);
                return;
            }
            res.send(this.manifest);
        });

        app.post('/encrypted', (req, res) => {
            // Decrypt the layer off the message
            let message = JSON.parse(crypt.decrypt(this.MIXKEY.private, req.body.message).message);

            console.log("Mix request @" + this.MIXPORT);
            // new post request to next node
            axios.post(
                message.address,
                {
                    message: message.message
                }
            ).then((Nres)=>{
                res.setHeader('Access-Control-Allow-Origin','*')
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

                res.send(Nres.data);
            }).catch((error)=>{
                console.log(error);
            });
        });

        app.use((req,res)=>{
            console.log("caught one! "+req.originalUrl)
            res.send("<script>window.location.href='"+this.address()+"'</script>");
        })
        // Listen for requests on given port
        app.listen(MIXPORT);
        console.log("Mix-server running at " + this.address());
    }


    requestManifest(){
        console.log(this.NEXTNODE+" manifest requested ");
        if(!this.MIXKEY){
            setTimeout(this.requestManifest.bind(this),1000);
            console.log("No Key");
            return;
        }
        // Ask previous node for its manifest
        axios.get(this.NEXTNODE + "/manifest").then((res)=>{
            this.manifest = res.data;
            this.manifest.push([this.address(), this.MIXKEY.public]);
            console.log("manifest recieved")
        }).catch((error)=>{
            if(this.NEXTNODE === "http://100.120.213.141:8080"){
                console.log(error);
            }
            setTimeout(this.requestManifest.bind(this),1000);
            //console.log(error)
        });
    }

    address(){
        return "http://"+ localip() + ":" + this.MIXPORT;
    }

}

module.exports = MixNode