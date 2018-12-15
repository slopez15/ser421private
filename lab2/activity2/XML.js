var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var format = require('xml-formatter');
var NewsStory = require('./NewsStory.js');

//deserialize persistent store (the xml file) to store articles at runtime for initiated newsService.
function deserialize (file){
  //Read XML File
  var xml = fs.readFileSync(file, {encoding:'utf8', flag:'r'}, function(err, data){
    if (err){
      console.log("Failed to open persistent store (xml document).");
    } else {
      console.log("persistent store Loaded.");
      //if async, move code in here for what to do once file read.
      //logic();
    }
  });

  //function logic(){}

  //Obtain document, then nodeList
  var docNews = new DOMParser().parseFromString(xml,'text/xml');
  var NodeListArticles = docNews.documentElement.getElementsByTagName("ARTICLE");

  //Store nodes from nodeList into arr to get node info.
  var NodeArticles = [];
  for (var i = 0; i < NodeListArticles.length; i++){
    NodeArticles[i] = NodeListArticles.item(i);
  }
  /*
  We have article nodes.
  Now extract each ARTICLEs' info (tags within)
    (TITLE, AUTHOR, DATE, PUBLIC, CONTENT)
    and place into NewsStory objects.
  Assumptions:
    one tag of each, in each article
  */
  var stories = [];
  var story;
  var title;
  var author;
  var date;
  var publicFlag;
  var storyContent;
  var article;
  for (var i=0; i < NodeArticles.length; i++ ){
    article = NodeArticles[i].childNodes;
    for (var j=0; j < article.length; j++ ){
      switch(article[j].nodeName) {
        case "TITLE":
          title = article[j].firstChild.nodeValue;
          break;
        case "AUTHOR":
          author = article[j].firstChild.nodeValue;
          break;
        case "DATE":
          date = article[j].firstChild.nodeValue;
          break;
        case "PUBLIC":
          publicFlag = article[j].firstChild.nodeValue;
          break;
        case "CONTENT":
          storyContent = article[j].firstChild.nodeValue;
          break;
        default:
          //do nothing
      }
    }
    story = new NewsStory (title, author, date, publicFlag, storyContent);
    stories.push(story);
  }
  return stories;
}

//TODO: method
//serialize(object)
//NewsStory [object] -> xmldom article node -> persistStore


/*
NOTE: below is for ref when dev-ing serializing method.
//convert below into (xmldom article node)
NewsStory {
  title: 'title',
  author: 'author',
  date: 'date',
  publicFlag: 'publicFlag',
  storyContent: 'storyContent'
}
*/
/*xmldom node: Based on xmldom structure of existing xml file--abridged.
Document
  Element (NEWS)
--- note ---
When use getElementsByTagName it isn't put into a sequentially mapped array
  like when called for single tags within top layer (news).
  I'm sure behaves differently if multiple tags top layer.
So you cannot capture NEWS tag via .item().
Also, it is not in nodelist. It's in LiveNodeList.
*Just ignore fact that much of xmldom pkg not tested .
-- The Article node -- (what we care about)
Element
  Text (for spacing format) '\n        '
  Element (attribs)
    Text
      nodeValue/data: 'Mark Mulder ends 2015 comeback bid'
*/

module.exports = {deserialize};
















































/* NOTE: eye for: doc, nodeList, node, document, element, attr, text, characterData, namedNodeMap */
//element's tagName attrb,& Node's nodeName,localName attrb
/* NODE documentation
nodeName|nodeType|
parentNode|childNodes|
firstChild|lastChild|
previousSibling|nextSibling|
attributes|ownerDocument|localName

insertBefore(newChild, refChild)
replaceChild(newChild, oldChild)
removeChild(oldChild)
appendChild(newChild)

hasChildNodes()
hasAttributes()

cloneNode(deep)
normalize()
isSupported(feature, version)

*/
/* Document : Node
 readonly attribute:
 	doctype|implementation|documentElement
 method:
 	createElement(tagName)
 	createDocumentFragment()
 	createTextNode(data)
 	createComment(data)
 	createCDATASection(data)
 	createProcessingInstruction(target, data)
 	createAttribute(name)
 	createEntityReference(name)
 	getElementsByTagName(tagname)
 	importNode(importedNode, deep)
 	createElementNS(namespaceURI, qualifiedName)
 	createAttributeNS(namespaceURI, qualifiedName)
 	getElementsByTagNameNS(namespaceURI, localName)
 	getElementById(elementId)
*/
/*
XML document formtat
NEWS
  ARTICLE
    TITLE
    AUTHOR
    DATE
    PUBLIC //T or F
    CONTENT
*/
