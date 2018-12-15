var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var format = require('xml-formatter');

//Read XML File
var xml = fs.readFileSync('./news.xml', {encoding:'utf8', flag:'r'}, function(err, data){
  if (err){
    console.log("Failed to open persistent store (xml document).");
  } else {
    console.log("persistent store Loaded.");
  }
});
// console.log("input:\n%s\n", xml)

//Obtain document, then nodeList
var docNews = new DOMParser().parseFromString(xml,'text/xml');
var NodeListArticles = docNews.documentElement.getElementsByTagName("ARTICLE");

//Store nodes from nodeList into arr to get node info.
var NodeArticles = [];
for (var i = 0; i < NodeListArticles.length; i++){
  NodeArticles[i] = NodeListArticles.item(i);
}

/*
We have article node.
Now extract each ARTICLE's info (tags within)
  (TITLE, AUTHOR, DATE, PUBLIC, CONTENT)
  and place into NewsStory objects.
Assumptions:
  one tag of each, in each article
*/
// console.log(NodeArticles[0].childNodes[0]);
var stories = [];
var story;
var title;
var author;
var date;
var publicFlag;
var content;
var article;
for (var i=0; i < NodeArticles.length; i++ ){
  article = NodeArticles[i].childNodes;
  // console.log(article + "\n\n\n\n\n");
  // console.log("\n\n\n\n\n\n");
  for (var j=0; j < article.length; j++ ){
    // console.log(article[j] + "\n^node");
    switch(article[j].nodeName) {
      case "TITLE":
        // console.log("TITLE");
        title = article[j];
        break;
      case "AUTHOR":
        // console.log("AUTHOR");
        author = article[j];
        break;
      case "DATE":
        // console.log("DATE");
        date = article[j];
        break;
      case "PUBLIC":
        // console.log("PUBLIC");
        publicFlag = article[j];
        break;
      case "CONTENT":
        // console.log("CONTENT");
        content = article[j];
        break;
      default:
        //do nothing
        // console.log("not what we looking for.");
    }
  }
  story = new Object ();
  story.title = title;
  story.author = author;
  story.date = date;
  story.publicFlag = publicFlag;
  story.content = content;
//firstChild.nodeValue
  // console.log(story.title);
  // console.log(story.author);
  // console.log(story.date);
  // console.log(story.publicFlag);
  // console.log(story.content);

  stories.push(story);
}
// console.log(stories.length);
console.log(stories[0].title.firstChild.nodeValue);





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
