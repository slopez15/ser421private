console.log(document.cookie.split(';')); //{0, '', 1, ''}
console.log(document.body); //<body>
console.log(document.anchors[0]); //undefined <a>
console.log(document.domain); //site domain
console.log(document.URL); //site url
console.log(document.title); //site title
console.log("All the props in document not from it's proto chain");
for (var key in document) { //location, jquery, blocked frame w/origin '' from accessing cross-origin frame.
    if (document.hasOwnProperty(key)) {
        console.log(key+" = "+ document[key]);
    }
}
