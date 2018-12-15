var parser = require('xml2json');

//NOTE: not like anything outside that outter tags, must be all enclosed.
var xml = "<foo attr=\"value\"><foo2 attr=\"value\">bar</foo2></foo>";
console.log("input:\n%s\n", xml)

// xml to json
var json = parser.toJson(xml, {object:true});
json.sup = {"attr":"value","nest2":{"attr":"value","$t":"bar"}};
console.log("to json:\n%s\n", JSON.stringify(json));

// json to xml
var xml = parser.toXml(json);
console.log("back to xml:\n%s\n", xml)

// parser.getError();
/*NOTE:
sup = {"attr":"value","$t":"bar"}
sup = tags
attr = attr
$t = value
.
.
.
input:
<foo attr="value"><foo2 attr="value">bar</foo2></foo>

to json:
{"foo":{"attr":"value","foo2":{"attr":"value","$t":"bar"}},"sup":{"attr":"value","nest2":{"attr":"value","$t":"bar"}}}

back to xml:
<foo attr="value"><foo2 attr="value">bar</foo2></foo><sup attr="value"><nest2 attr="value">bar</nest2></sup>
.
.
.
JSON
{
"foo":{
  "attr":"value",
  "foo2":{
    "attr":"value",
    "$t":"bar"
  }
},
"sup":{
  "attr":"value",
  "nest2":{
    "attr":"value",
    "$t":"bar"
  }
}
}

XML
<foo attr="value">
  <foo2 attr="value">bar</foo2>
</foo>
<sup attr="value">
  <nest2 attr="value">bar</nest2>
</sup>
.
*/
