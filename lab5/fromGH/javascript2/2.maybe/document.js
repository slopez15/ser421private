const DOMParser = require('xmldom').DOMParser;

function getXmlDoc(xmlString) {
  var parser = new DOMParser();
  var xmlDocument =
    parser.parseFromString(xmlString, "application/xml");
  return(xmlDocument);
}

var test =
  "<customers rating='vip'>" +
    "<customer id='a1234'>" +
      "<firstName>Rafael</firstName>" +
      "<lastName>Nadal</lastName>" +
    "</customer>" +
    "<customer id='a1235'>" +
      "<firstName>Roger</firstName>" +
      "<lastName>Federer</lastName>" +
    "</customer>" +
  "</customers>";

var testDoc = getXmlDoc(test);

var a = testDoc.documentElement.nodeName; //customers
var b = testDoc.documentElement.getAttribute("rating"); //vip

var c = testDoc.getElementsByTagName("lastName")[1].firstChild.nodeValue; //Federer

var rafie = testDoc.getElementsByTagName("customer")[0]; //Element {}; attribute: id nodeName, value a1234, childNodes: [0] firstname
var d = rafie.getAttribute("id"); //a1234
var e = testDoc.getElementById("a1234"); //Element {}; customers tagName,

console.log(rafie);
