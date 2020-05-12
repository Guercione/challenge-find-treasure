# Treasure Challenge - Backend - Java Spring Boot

## BACKEND - Java Spring

### Spring Boot Maven Docs

- https://maven.apache.org/guides/index.html
- https://docs.spring.io/spring-boot/docs/2.2.7.RELEASE/maven-plugin/

### How to run

- mvn install
- java -jar target/treasure-0.0.1-SNAPSHOT.jar
- Fun

#### GET - /score

Return Top 10 Best Players

##### Response

```
response: [{
    "matchHash": 733552022,
    "userName": "Guilherme",
    "turns": 1,
    "treasures": 3,
    "done": true,
    "userBoard": [[0,9,0,0,0], [0,0,0,0,0], [0,0,0,9,0], [0,0,0,0,0], [0,9,0,0,0]]
}]
```

#### POST - /new-game

Start new game

##### Request

```
body: {
	"userName": "Guilherme"
}
```

##### Response

```
response: {
    "matchHash": 733552022,
    "userName": "Guilherme",
    "turns": 0,
    "treasures": 0,
    "done": false,
    "userBoard": [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]
}
```

#### POST - /board/:id

Play the game

##### Request

```
body: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 3 }]
```

or

```
body: [{ x: 1, y: 0 }]
```

##### Response

```
response: {
    "matchHash": 733552022,
    "userName": "Guilherme",
    "turns": 1,
    "treasures": 0,
    "done": false,
    "userBoard": [[0,0,0,2,0], [2,3,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]
}
```

##### Warning: import "Postman_Collection.json" to the Postman
