/* NOTE:
XML document formtatÑ
NEWS
  ARTICLE
    TITLE
    AUTHOR
    DATE
    PUBLIC //T or F
    CONTENT
*/
function NewsStory (title, author, date, publicFlag, storyContent){
  this.title = title;
  this.author = author;
  this.date = date;
  this.publicFlag = publicFlag;
  this.storyContent = storyContent;
}

module.exports = NewsStory;
