var NewsService = require('./NewsService.js');
const NewsStory = require('./NewsStory');

//start service
var service = new NewsService(__dirname + '\\news.xml');

/*
TODO: DO NOT use NewsStory object constructor.
Create NewsStory via serivces functions.
*/
service.writeStory("title", "author", "01-11-2017", "publicFlag", "storyContent");
// service.updateHeadline(story, "title2");
console.log(service.storyCount);
console.log(service.stories);

console.log("\n\n\n\n");

service.deleteStory(1);
console.log(service.storyCount);
console.log(service.stories);

console.log("\n\n\n\n");

service.updateHeadline(2, "updatedHeadline!");
console.log(service.storyCount);
console.log(service.stories);

console.log("\n\n\n\n");

service.changeContent(2, {title: "title", author: "author", date: "date", publicFlag: "publicFlag", storyContent: "storyContent"});
console.log(service.storyCount);
console.log(service.stories);

console.log("\n\n\n\n");

var filterOptions = {SubstringOfTitle:"itle", DateRange:"date", Author:"Author"};
var filteredStories = service.filter ( filterOptions );
console.log( "filteredStories:" );
console.log( filteredStories );






//
