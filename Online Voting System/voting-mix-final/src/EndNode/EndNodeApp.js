const express = require('express')
const bodyParser = require('body-parser');
const RSA = require('hybrid-crypto-js').RSA;
const Crypt = require('hybrid-crypto-js').Crypt;
const localip = require('my-local-ip');
const ejs = require("ejs");
const fs = require("fs");
const join = require('path').join;
const urljoin = require('url-join');
const axios = require('axios')


class EndNodeApp {

    constructor(SERVERPORT = 8080, app2){
        this.app2 =  app2;

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

        app.post('/', async (req, res) => {
            // Descrypt final layer
            let decrypted = JSON.parse(crypt.decrypt(SERVERKEY.private, req.body.message).message);

            console.log("Server request");
                    let page;
                    if(decrypted.protocol==="GET"){
                        console.log(app2+decrypted.message);
                        console.log(decrypted.cookies);
                        let res2 = await axios.get(app2+decrypted.message,/*{headers:decrypted.cookies}*/);
                        page = res2.data;
                    } else {
                        console.log({
                            method: decrypted.protocol,
                            url: urljoin(app2,decrypted.message),
                            data: decrypted.body,
                            headers: {cookies:decrypted.cookies}
                        });
                        try{
                            let res2 = await axios({
                                method: decrypted.protocol,
                                url: urljoin(app2,decrypted.message),
                                data: decrypted.body,
                                headers: {cookies:decrypted.cookies}
                            });
                            page = res2.data;
                        } catch (err){
                            page = err.data;
                        }
                    }
                    console.log(page);
                    res.send(crypt.encrypt(decrypted.kX, page));
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

        
        function local_session_setup (req, res, next) { 
            if (!req.session.user_loggedin) {
            req.session.user_loggedin = false;
            }
            if (!req.session.admin_loggedin) {
            req.session.admin_loggedin = false;
            }
            const settings = require('../server/config/settings.js');
            res.locals.globals = {
                        debug : settings.debug, 
                        type: settings.type, 
                        nav_menu: settings.nav_menu, 
                        admin_menu: settings.admin_menu, 
                        is_loggedin_general: Boolean(req.session.user_loggedin), 
                        is_loggedin_admin: Boolean(req.session.admin_loggedin),
                        admin_subdomain: false,
                        responces: settings.responces,
                    };
            return next(); // Passing the request to the next handler in the stack.
        }
    }

    address(){
        return "http://" + localip() + ":" + this.SERVERPORT;
    }

}

module.exports = EndNodeApp