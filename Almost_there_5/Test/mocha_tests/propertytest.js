const assert = require('assert');
const Property = require('../models/property');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


describe('Property tests', () => {

    it('saved to database', function(done){
        var property = new Property({
            Name:"xyz",
            Description:"xyz",
            isBuilder:"xyz",
            Location:"xyz",
            Sqfoot:25,
            BHK:3,
            ownerid:"xyz",
            zipcode:"xyz",
            Gym:false,
            Lawn_Free_Space:false,
            Security:false,
            CCTV:false,
            School_within_5:false,
            Hospital_within_5:false,
            Railway_within_5:false,
            Airport_within_5:false,
            water:false,
            electricity:true,
            Lift: true,
            Club_House: true,
            Price:true,
            Owner:"xyz",
            images:"xyz",
            verified:true,
            req_verified:true
        });

        property.save().then(function(){
            assert(property.isNew === false);
            console.log("property successfully saved to the database")
            done();
        });


    });

    it('finds property with the name of xyz', (done) => {
        Property.findOne({
			Name:"xyz",
            Description:"xyz",
            })
        .then((property) => {
            assert(property.Name === 'xyz'); 
            done();
        });
    })

    it('deletes property with the name of xyz', (done) => {
        Property.findOne({
            Name:"xyz",
            Description:"xyz",
            })
        .then((property) => {
            assert(property.Name === 'xyz'); 
            property.remove();
            //assert(property.isNew === true);
            done();
        });
    })

    it('update existing property', (done) => {
        var property = new Property({
            Name:"xyz",
            Description:"xyz",
            isBuilder:"xyz",
            Location:"xyz",
            Sqfoot:25,
            BHK:3,
            ownerid:"xyz",
            zipcode:"xyz",
            Gym:false,
            Lawn_Free_Space:false,
            Security:false,
            CCTV:false,
            School_within_5:false,
            Hospital_within_5:false,
            Railway_within_5:false,
            Airport_within_5:false,
            water:false,
            electricity:true,
            Lift: true,
            Club_House: true,
            Price:true,
            Owner:"xyz",
            images:"xyz",
            verified:true,
            req_verified:true
        });

        property.save().then(function(){
            assert(property.isNew === false);
            console.log("property saved")
        });
        Property.findOne({
            Name:"xyz",
            Description:"xyz",
            })
        .then((property) => {
            property.Name="abc";
            property.save();
        });

         Property.findOne({
            Name:"abc",
            Description:"xyz",
            })
        .then((property) => {
            assert(property.Name == 'abc');
            done();
        });
    })
})