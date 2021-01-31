## Start server without nodemon
$node index.js

To see the result, go to:
- localhost:5000
- localhost:5000/about.html

## Start server with nodenmon
$npm run dev

## To push code to Heroku
After having made a commit, do the following:
- heroku login
- heroku keys:add
- heroku create
- heroku rename nodestock-aless
- git push heroku master