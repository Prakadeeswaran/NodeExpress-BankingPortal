const express = require('express');

const router = express.Router()

const {accounts, writeJSON} = require('../data');


router.get("/transfer", (req, res) => {
    res.render('transfer');
});

router.post("/transfer", (req, res) => {
    let fromAccBalance = accounts[req.body.from].balance
    let toAccBalance = accounts[req.body.to].balance
    let newFromAccountBalance = fromAccBalance - parseInt(req.body.amount);
    let newToAccountBalance = toAccBalance + parseInt(req.body.amount);

    accounts[req.body.from].balance = newFromAccountBalance;
    accounts[req.body.to].balance = newToAccountBalance;
    writeJSON()

    res.render('transfer', {message: "Transfer Completed"})
});

router.get("/payment", (req, res) => {
    res.render('payment', {account: accounts.credit});
});

router.post("/payment", (req, res) => {
    accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
    accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);
    writeJSON()
    res.render('payment', {message: "Payment Successful", account:accounts.credit});
});


module.exports = router