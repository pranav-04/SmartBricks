const express = require('express')
const router = express.Router();
let Property = require('../models/property')
let User = require('../models/user');

router.get('/sell',ensureAuthenticated,(req,res) => {
    res.render('sell_property',{
        title : 'Sell Property'
    })
})

router.get('/:id',(req,res) =>{
    Property.findById(req.params.id,(err,property) =>{
        if(err){
            console.log(err)
        }else{
            res.render('property',{
                property:property
            })
        }
    })
})

router.get('/edit/:id',ensureAuthenticated,(req,res) =>{
    Property.findById(req.params.id,(err,property) =>{
        console.log(property.ownerid,req.user._id)
        if(property.ownerid != req.user._id){
            req.flash('danger','Not Authorized')
            return res.redirect('/');
        }
        if(err){
            console.log(err)
        }else{
            res.render('property_edit',{
                title: 'Edit',
                property:property
            })
        }
    })
})


router.post('/edit/:id',(req,res) =>{
    let property = {}
    property.Name = req.body.name
    property.Description = req.body.description
    property.Owner = req.body.ownername
    if(req.body.isBuilder === 'Yes'){
        property.isBuilder = true
    }else{
        property.isBuilder = false
    }
    property.Location = req.body.location
    property.Sqfoot = req.body.sqfeet
    property.BHK = req.body.BHK
    property.ownerid = req.user._id
    let query = {_id:req.params.id}
    Property.update(query,property,(err) => {
    if(err){
        console.log(err)
    }else{
        req.flash('success','Property Updated!')
        res.redirect('/');
    }
    })
})

router.post('/sell', (req,res) => {

    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('description','Description is required').notEmpty();
    req.checkBody('ownername','Owner Name is required').notEmpty();
    req.checkBody('location','Location is required').notEmpty();
    req.checkBody('sqfeet','Sqfoot is required').notEmpty();
    req.checkBody('BHK','No of BHK is required').notEmpty();

    let errors = req.validationErrors();
    if(errors){
        res.render('sell_property',{
            title:'Sell Property',
            errors:errors
        })
    } else{
        let property = new Property()
        property.Name = req.body.name
        property.Description = req.body.description
        property.Owner = req.body.ownername
        if(req.body.isBuilder === 'Yes'){
            property.isBuilder = true
        }else{
            property.isBuilder = false
        }
        property.Location = req.body.location
        property.Sqfoot = req.body.sqfeet
        property.BHK = req.body.BHK
        property.ownerid = req.user._id
        property.save((err) => {
            if(err){
                console.log(err)
                return
            }else{
                req.flash('success','Property added!')
                res.redirect('/');
            }
        })
    }
})

router.delete('/:id',(req,res) => {
    let query = {_id:req.params.id}
    Property.remove(query,(err) =>{
        if(err){
            console.log(err)
        }else{
            res.send('Success')
        }
    })
})

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
}
module.exports = router