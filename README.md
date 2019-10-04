# Divercity Web App
Web Page for D


## Instructions for setting up production and staging push
#### Add heroku staging remote 
1. Install heroku toolbelt [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. Add stage remote: `heroku git:remote -a pincapp-staging`
3. Rename remote to staging `git remote rename heroku staging`

#### Add heroku live remote 
4. Add stage remote: `heroku git:remote -a pincapp`
5. Rename remote to live `git remote rename heroku live`

Push master to staging: `git push staging master`
Push master to live: `git push live master`