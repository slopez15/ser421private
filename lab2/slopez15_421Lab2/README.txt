Explanation of the NewsService as requested in Activity 2:
no UI, but API for object types in README.txt

NewsService:
          Object constructor for NewsService with shared prototype methods.
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

provide examples:
starting files and sample test case of each service (how to invoke)
Feel free to view package.json's scripts.
  `npm start`:    runs NewsService
  `npm run act3`: runs activity3
Example of NewsService usage can be found in ./activity2/mainService.js


=====================================================
Parts completed:

What is undone:
