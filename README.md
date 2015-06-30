# Count Me In

Pledge to learn a hobby by tracking your progress through a community-based support system.

### Initial global setup
```
npm install -g karma-cli
npm install -g grunt-cli
brew install neo4j
brew install leiningen
```

### After pulling run:
npm install
bower install
grunt dev
grunt serve

### Neo4j database

Start the database with:

```
neo4j start
```
You may need to [install Java](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run neo4j.
You can interact with the database through its web interface by navigating to `localhost:7474`. If it asks for a username and password use `neo4j` for both (you may need to change your password twice to get it back to `neo4j`). When you're done, stop the database with:

```
neo4j stop
```

### Grunt tasks

To build and test JS files, and start watching for changes to continue doing so, use:

```
grunt dev
```

To start up the server with `nodemon`, which restarts every time you make a change to a file, use:

```
grunt serve
```

To compile the auth clojure files, use:

```
grunt cljs
```

### Config files

#### AmazonS3

To allow post image/video uploads to store on on AmazonS3, add the S3 credentials as a config file to `server/db/adapter/amazonS3Config.js`. The config file should use this structure:

```
module.exports = {
  AWS_ACCESS_KEY: '',
  AWS_SECRET_KEY: '',
  S3_BUCKET: ''
};
```

The AWS credentials are available on this [Google Doc](https://docs.google.com/document/d/1TzxPP-hfm_p5H_gI3S8qP4N8m2JUzrTRPdNRZmJhWXQ/edit).

#### Auth

For session tokens, create `server/auth/jwtConfig.js`. The file structure: 

module.exports = {
  key: '',
  expiresInMinutes: 1440,
  issuer: ''
};

The credentials are available at [this doc](https://docs.google.com/document/d/1Sd_zXhSkAJzQVhhoJR1OPg4nOuhhkvE5NguweNTEcsU/edit).

### Dummy data

Run get requests to the following URLs:

```
/api/test/clear
/api/test/fill
```


