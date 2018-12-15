/*
Activity 2 (30 points): File I/O
implement newsService
  packages: “fs” and “xmldom”
.
NewsService
----------------------------------------------------
NewsService = CMS object
  R1. write a new news story to the persistent store
  R2. update the headline of an existing news story
  R3. change the content of an existing news story
  R4. delete an existing news story
  R5. return a collection of NewsStory objects based on a filter, where the filter checks for one or more of:
    a. Substring of the title
    b. Date Range
    c. Author
----------------------------------------------------
NewsService
  C1. solve concurrency
  store:news.xml
NewsStory
  author/username)
  title
  public flag
  story content
  date
--- Other -------------------------------------------------
==In ReadMe==
no UI,
API for object types
  in README.txt
.
Tip: NodeJS synchronous file I/O (makes C1 easier).
EC: asynchronous
/**/
/*
.
.
.
.
*/
var fs = require('fs');
var parser = require('xmldom');
var XML = require('./XML.js');
var NewsStory = require('./NewsStory.js');

/*
NewsService: Object constructor for NewsService with shared prototype methods.
Methods:
  writeStory (title, author, date, publicFlag, storyContent)
          - write a new news story to the persistent store
  updateHeadline (NewsStoryID, title)
          - update the headline of an existing news story
  changeContent (NewsStoryID, options)
          - change the content of an existing news story
  deleteStory (NewsStoryID)
          - delete an existing news story
  filter (filterOptions)
          - return a collection of NewsStory objects based on a filter,
            where the filter checks for one or more of: SubstringOfTitle, DateRange, Author
            filterOptions {
              SubstringOfTitle:String,
              DateRange:String,
              Author:String
            }
*/
function NewsService (file){ //param - persistStore (xml file)
  this.stories = XML.deserialize(file); //to store stories at runtime. Note: Persistent store = xml document.
  //asign IDs to imported stories.
  for (var i = 0; i < this.stories.length; i++){
    this.stories[i].id = i;
  }
  this.storyCount = this.stories.length; //after deserialized, count to see amount IDs used.
}
//ASSUMPTION: EVERY FIELD IS PROVIDED and correct.
NewsService.prototype.writeStory = function (title, author, date, publicFlag, storyContent) {
  //write new news story to the persistent store
  console.log("writeStory...");
  var story = new NewsStory (title, author, date, publicFlag, storyContent);
  story.id = this.storyCount;
  this.storyCount += 1;
  this.stories.push(story);
};
NewsService.prototype.updateHeadline = function (NewsStoryID, title) {
  console.log("updateHeadline...");
  var storyIndex = this.stories.findIndex((story) => story.id==NewsStoryID );
  if (storyIndex == -1){
    console.log("NewsStoryID entered does not exist.");
  }
  else {
    this.stories[storyIndex].title = title;
  }
  // console.log(storyIndex);
};
NewsService.prototype.changeContent = function (NewsStoryID, options) {
  console.log("changeContent...");
  var storyIndex = this.stories.findIndex((story) => story.id==NewsStoryID );
  if (storyIndex == -1){
    console.log("NewsStoryID entered does not exist.");
  }
  else {
    if (options.title){
      this.stories[storyIndex].title = options.title;
    }
    if (options.author) {
      this.stories[storyIndex].author = options.author;
    }
    if (options.date) {
      this.stories[storyIndex].date = options.date;
    }
    if (options.publicFlag) {
      this.stories[storyIndex].publicFlag = options.publicFlag;
    }
    if (options.storyContent) {
      this.stories[storyIndex].storyContent = options.storyContent;
    }
  }
};
NewsService.prototype.deleteStory = function (NewsStoryID) {
  console.log("deleteStory...");
  this.stories = this.stories.filter(story => story.id != NewsStoryID); //keep those whose id isn't NewsStoryID.

};
/*
Filters by
checks for one or more of:
  a. Substring of the title
  b. Date Range
  c. Author
filterOptions {
  SubstringOfTitle:String,
  DateRange:String,
  Author:String
}
There was no mention if this was a read or write function,
so I made this a read function.
Will return an array of NewsStory objects.
*/
NewsService.prototype.filter = function (filterOptions) { //this is object style of filter {SubstringOfTitle:String,DateRange:Date?,Author:String}
  console.log("filter...");
  var stories = this.stories;

  console.log(filterOptions.SubstringOfTitle);
  console.log(filterOptions.DateRange);
  console.log(filterOptions.Author);

  // NOTE: IF a filter option is missing, we will not filter by that option, but will check the other options.
  //filter by SubstringOfTitle
  if (filterOptions.SubstringOfTitle){
    stories = stories.filter( (story) => {
      var substrIndex = story.title.indexOf(filterOptions.SubstringOfTitle);
      return (substrIndex != -1);
    });
  }
  //filter by DateRange
  /*
  TODO:TODO:TODO:
  there is a format when printing into XML (01-11-2017),
  and when getting date from HTML is another (tbd);
  another may be JS runtime (tbd).

  Need to implement in NewsStory object as Date,
  then create NewsStory methods to convert when,
    deserializing of xml to runtime JS (01-11-2017),
    from html user input (tbd),
    from code/JS runtime (assume xml format)
  */
  //format: 01-11-2017
  if (filterOptions.DateRange) {
    stories = stories.filter( (story) => story.date==filterOptions.DateRange );
  }
  //filter by Author
  if (filterOptions.Author) {
    stories = stories.filter( (story) => story.author.toLowerCase()==filterOptions.Author.toLowerCase());
  }
  return stories;
  // SubstringOfTitle, DateRange, Author
};


module.exports = NewsService;
// module.exports = NewsService;
/***** MAIN *****/
//var service = new NewsService;
