const express = require('express')
const router = express.Router();
let Property = require('../models/property')
let User = require('../models/user');

router.get('/sell',ensureAuthenticated,(req,res) => {
    res.render('sell_property2',{
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
            res.render('property_edit2',{
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
    property.isBuilder = req.body.isBuilder
    property.Location = req.body.location
    property.Sqfoot = req.body.sqfoot
    property.BHK = req.body.BHK
    property.ownerid = req.user._id
    property.zipcode = req.body.zipcode
    property.Owner = req.user.name
    if(req.body.Gym === 'on'){
        property.Gym = true
    }else{
        property.Gym = false
    }
    if(req.body.Lawn_Free_Space === 'on'){
        property.Lawn_Free_Space = true
    }else{
        property.Lawn_Free_Space = false
    }
    if(req.body.Security === 'on'){
        property.Security = true
    }else{
        property.Security = false
    }
    if(req.body.CCTV === 'on'){
        property.CCTV = true
    }else{
        property.CCTV = false
    }
    if(req.body.School_within_5 === 'on'){
        property.School_within_5 = true
    }else{
        property.School_within_5 = false
    }
    if(req.body.Hospital_within_5 === 'on'){
        property.Hospital_within_5 = true
    }else{
        property.Hospital_within_5 = false
    }
    if(req.body.Railway_within_5 === 'on'){
        property.Railway_within_5 = true
    }else{
        property.Railway_within_5 = false
    }
    if(req.body.Airport_within_5 === 'on'){
        property.Airport_within_5 = true
    }else{
        property.Airport_within_5 = false
    }
    if(req.body.water === 'on'){
        property.water = true
    }else{
        property.water = false
    }
    if(req.body.electricity === 'on'){
        property.electricity = true
    }else{
        property.electricity = false
    }
    if(req.body.Lift === 'on'){
        property.Lift = true
    }else{
        property.Lift = false
    }
    if(req.body.Club_House === 'on'){
        property.Club_House = true
    }else{
        property.Club_House = false
    }
    property.Price = req.body.price
    let query = {_id:req.params.id}
    Property.update(query,property,(err) => {
    if(err){
        console.log(err)
    }else{
        req.flash('success','Property Updated!')
        res.redirect('/users/my_property');
    }
    })
})

router.post('/sell', (req,res) => {

    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('description','Description is required').notEmpty();
    req.checkBody('isBuilder','Builder is required').notEmpty();
    req.checkBody('location','Location is required').notEmpty();
    req.checkBody('sqfoot','Sqfoot is required').notEmpty();
    req.checkBody('BHK','No of BHK is required').notEmpty();
    req.checkBody('zipcode','Zipcode is required').notEmpty();
    req.checkBody('price','Price is required').notEmpty();
    let errors = req.validationErrors();
    if(errors){
        let a = "| "
        for(let index = 0; index < errors.length; index++) {
            a = a + errors[index].msg + ' | '
        }
        res.locals.user = req.user || null
        res.render('sell_property2',{
            title:'Sell Property',
            errors:a
        })
    } else{
        let property = new Property()
        property.Owner = req.user.name
        property.Name = req.body.name
        property.Description = req.body.description
        property.isBuilder = req.body.isBuilder
        property.Location = req.body.location
        property.Sqfoot = req.body.sqfoot
        property.BHK = req.body.BHK
        property.ownerid = req.user._id
        property.zipcode = req.body.zipcode
        property.Price = req.body.price
        if(req.body.Gym === 'on'){
            property.Gym = true
        }else{
            property.Gym = false
        }
        if(req.body.Lawn_Free_Space === 'on'){
            property.Lawn_Free_Space = true
        }else{
            property.Lawn_Free_Space = false
        }
        if(req.body.Security === 'on'){
            property.Security = true
        }else{
            property.Security = false
        }
        if(req.body.CCTV === 'on'){
            property.CCTV = true
        }else{
            property.CCTV = false
        }
        if(req.body.School_within_5 === 'on'){
            property.School_within_5 = true
        }else{
            property.School_within_5 = false
        }
        if(req.body.Hospital_within_5 === 'on'){
            property.Hospital_within_5 = true
        }else{
            property.Hospital_within_5 = false
        }
        if(req.body.Railway_within_5 === 'on'){
            property.Railway_within_5 = true
        }else{
            property.Railway_within_5 = false
        }
        if(req.body.Airport_within_5 === 'on'){
            property.Airport_within_5 = true
        }else{
            property.Airport_within_5 = false
        }
        if(req.body.water === 'on'){
            property.water = true
        }else{
            property.water = false
        }
        if(req.body.electricity === 'on'){
            property.electricity = true
        }else{
            property.electricity = false
        }
        if(req.body.Lift === 'on'){
            property.Lift = true
        }else{
            property.Lift = false
        }
        if(req.body.Club_House === 'on'){
            property.Club_House = true
        }else{
            property.Club_House = false
        }

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