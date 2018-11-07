/*
showInfo's Node object is from browser's Node.
DOMParser is npm module -- not sure how to import into browser.
  tries to use showInfo (cant in node.js env.)
*/
/*
Some ideas for having imported modules in web....
bundle files to run in web.
html file refer bundle.js
bundle.js is [file.js, file.js] into one (may use 3rd party packages.)

*/
//added since using DOMParser
const DOMParser = require('xmldom').DOMParser;

function showInfo(node, indent) {
  if (node.nodeType == Node.TEXT_NODE) { //Node.TEXT_NODE is a browser env object.
    console.log("%s Body content is '%s'.",
                spaces(indent), node.nodeValue);
  } else if (node.nodeType == Node.ELEMENT_NODE) {
    console.log("%s Found element '%s'.",
                spaces(indent), node.nodeName);
    var children = node.childNodes;
    for(var i=0; i<children.length; i++) {
      showInfo(children[i], indent+1);
    }
  }
}

function spaces(n) {
  var indentString = "  ";
  var result = "";
  for(var i=0; i<n; i++) {
    result = result.concat(indentString);
  }
  return(result);
}
//output: Found element 'P'. & undefined


// we saw this in document.js
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
var testDoc = new DOMParser().parseFromString(test, "application/xml");

testDoc.documentElement.normalize();
showInfo(testDoc.documentElement, 0);
