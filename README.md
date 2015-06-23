# Count Me In

Pledge to learn a hobby by tracking your progress through a community-based support system.

### Initial global setup
```
npm install -g karma-cli
npm install -g grunt-cli
brew install neo4j
```



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
