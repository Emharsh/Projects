//PartA
//Task 2(I)
db.rests.find({name: /Cafe/i}).count();

db.rests.find({name: /Cafe/i}).pretty();


//PartA
//Task 2(II)
var cafes = db.rests.find({"name": /Cafe/i});

cafes.forEach ( function(each_cafe) {
  var zips = db.zip.findOne({
    loc: {
      $geoNear: {
        $geometry: each_cafe.location
      }
    }
  });
  print("Restaurants:"); printjson(each_cafe.name);
  print("City:"); printjson(zips);
});

//PartA
//Task 3(First Method)
var all_rests=  db.rests.find({}, "name");

all_rests.forEach(function(each_rests) {
  var all_zips =  db.zip.findOne({
    loc: {
      $geoNear: {
        $geometry: each_rests.location
      }
    }
  });
  print("Restaurants:"); printjson(each_rests.name);
  db.rests.update({"_id": each_rests._id},{$set:{"City":all_zips.city, "State":all_zips.state }});
  printjson(all_zips);
});

//PartA
//Task 3(Second Method)
var allRest = db.rests.aggregate([{$project:{"name": "$name", "location": "$location"} } ] );

allRest.forEach(function(rest) {
  var cities = db.zip.findOne({
    loc: {
      $near: {
        $geometry: rest.location
      }
    }
  });
  print("Restaurants:"); printjson(rest.name);
  printjson(cities);
  db.updated.insert({"Restaurant": rest.name, "City": cities.city, "State": cities.state});
});

//PartA
//Task 4
db.updated.aggregate([
  {
    "$group": {
      _id: {
        State: "$State", City: "$City"
      },
      "Number of Restaurants": {
        $sum:1
      },
      Restaurant: {
        "$push": "$Restaurant"
      }
    }
  },
  {
    "$sort": {
      "_id.State": 1, "_id.City":1
    }
  },
]).pretty();
