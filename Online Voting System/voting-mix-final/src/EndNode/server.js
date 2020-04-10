const express = require('express')
const bodyParser = require('body-parser');
const RSA = require('hybrid-crypto-js').RSA;
const Crypt = require('hybrid-crypto-js').Crypt;
const fs = require('fs');
const localip = require('my-local-ip')

class EndNode {
    constructor(SERVERPORT = 8080){

        this.SERVERPORT = SERVERPORT;

        // For handling file transmission
        const app = express();
        
        // Encryption Tools
        const crypt = new Crypt();
        const rsa = new RSA();

        let SERVERKEY;

        // Generate keys for this server
        rsa.generateKeypair((keypair) => {
            SERVERKEY = {
                public: keypair.publicKey,
                private: keypair.privateKey
            };
        },1024);

        // Allows us to read the post requests content
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());

        // Need these to allow requests to be displayed on the browser from diffrent IP addresses
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.post('/', (req, res) => {
            // Descrypt final layer
            let decrypted = JSON.parse(crypt.decrypt(SERVERKEY.private, req.body.message).message);

            console.log("Server request");
            // Read page with same name
            let page = fs.readFileSync('EndNode/public/' + decrypted.message, 'utf8');
            // Encrypt with clients public key
            res.send(crypt.encrypt(decrypted.kX, page))
        })


        // Start a new manifest starting with our details
        app.get("/manifest", (req, res) => {
            if(SERVERKEY === undefined){
                res.sendStatus(418);
                return;
            }
            console.log(SERVERKEY.public);
            let x = [this.address(), SERVERKEY.public];
            res.send([x]);
        });

        // Listen for requests on given port
        app.listen(SERVERPORT);
        console.log("End-server running at " + this.address());
    }

    address(){
        return "http://127.0.0.1" + localip() + ":" + this.SERVERPORT;
    }
}

export default EndNode;