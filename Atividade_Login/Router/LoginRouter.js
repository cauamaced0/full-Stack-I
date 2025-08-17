const express = require('express');
const LoginController = require('../Controller/LoginController');
const router = express.Router();

class LoginRoute
{
    #router;
    

    get router()
    {
        return this.#router
    }
    set router(router)
    {
        this.#router = router;
    }
    
    constructor()
    {
        this.#router= express.Router();

        let ctlr = new LoginController();
        this.#router.get('/login',ctlr.LoginController);
    }
}
module.exports = LoginRoute