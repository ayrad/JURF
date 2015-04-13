# What's JURF?
[Riot Games API](https://developer.riotgames.com/) Challenge entry app. JURF shows you the URF 2015 game mode latest games & stats in an understandable/user-friendly way.

This is my first MEAN stack (MongoDB, Express.js, AngularJS & Node.js) app and I hope not the last one, since I like these technologies and I really enjoy doing things using them :)

Don't hesitate on commenting & suggesting me fixes. I am newbie on this, so feel free to guide me.

# How to install/run the app
* Download & install Node.js: [https://nodejs.org/](https://nodejs.org/)
* Download & install MongoDB: [https://www.mongodb.org/](https://www.mongodb.org/)
* Download JURF app files: [https://github.com/ayrad/JURF/archive/master.zip](https://github.com/ayrad/JURF/archive/master.zip)
* Run MongoDB server by executing the `mongod` command
* Import the sample data JSON files to your Database
    * `cd {dir_where_you_extracted_JURF_files}/sample_data`
    * `mongoimport -d urf -c games games.json`
    * `mongoimport -d urf -c champions champions.json`
    * `mongoimport -d urf -c spells spells.json`
* Install JURF app dependencies: `npm install`
* Make sure you already configured server `{host}` + `{port}` inside `config.js`
* Run the app: `npm start` or `node app.js`
* Go to http://`{host}`:`{port}`/ and enjoy ;)

## Screenshots
### Home (The kings of URF)
![URF Kings](http://37.187.100.95:13377/screenshots/kings-home.jpg)

### Latest URF Games list
![Latest Games List](http://37.187.100.95:13377/screenshots/latestgames-list.jpg)

### Latests URF Games details
![Latest Games Details](http://37.187.100.95:13377/screenshots/latestgames-detail.jpg)

## Statistics
![Stats](http://37.187.100.95:13377/screenshots/stats.jpg)

## Live Demo
Live Demo can be found on my little server [http://37.187.100.95:13377/](http://37.187.100.95:13377/)