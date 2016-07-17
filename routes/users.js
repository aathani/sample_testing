var express = require('express');
var router = express.Router();
var ImpLC = require('../models/impLC');

router.get('/impLC', findAllImpLCs);
router.get('/impLC/:id', findImpLCById);
router.post('/impLC', addImpLC);
router.put('/impLC/:id', updateImpLC);
router.delete('/impLC/:id', deleteImpLC);



// *** get ALL impLCs *** //
function findAllImpLCs(req, res) {
  ImpLC.find(function(err, impLCs) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(impLCs);
    }
  });
}

// *** get SINGLE impLCs *** //
function findImpLCById(req, res) {
  ImpLC.findById(req.params.id, function(err, impLC) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(impLC);
    }
  });
}

// *** post ALL impLCs *** //
function addImpLC(req, res) {
  var newImpLC = new ImpLC({
    lcNum: req.body.lcNum,
    customer: req.body.customer,
    benefBank: req.body.benefBank,
    amount: req.body.amount
  });
  console.log(newImpLC.custom); //Temp Line
  newImpLC.save(function(err) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newImpLC});
    }
  });
}

// *** put SINGLE impLC *** //
function updateImpLC(req, res) {
  ImpLC.findById(req.params.id, function(err, impLC) {
    impLC.lcNum = req.body.lcNum;
    impLC.customer = req.body.customer;
    impLC.benefBank = req.body.benefBank;
    impLC.amount = req.body.amount;
    impLC.save(function(err) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': impLC});
      }
    });
  });
}

// *** delete SINGLE impLC *** //
function deleteImpLC(req, res) {
  ImpLC.findById(req.params.id, function(err, impLC) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      impLC.remove(function(err){
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'REMOVED': impLC});
        }
      });
    }
  });
}

module.exports = router;
