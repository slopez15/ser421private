var parser = require('xml2json');
var fs = require('fs');
var format = require('xml-formatter');

var xml = fs.readFileSync('./news.xml', {encoding:'utf8', flag:'r'}, function(err, data){ //place s flag for synchronous?
  if (err){
    console.log("Failed to open persistent store (xml document).");
  } else {
    console.log("persistent store Loaded.");
  }
});
console.log("input:\n%s\n", xml)

// xml to json
var json = parser.toJson(xml, {object:true});
//json.sup = {"attr":"value","nest2":{"attr":"value","$t":"bar"}};
console.log("to json:\n%s\n", JSON.stringify(json));

// json to xml
var xml = parser.toXml(json);
console.log("back to xml:\n%s\n", format(xml))

//conversion issue. Reason: see test-xml2json.js
