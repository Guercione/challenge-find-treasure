# Treasure Challenge - Backend - Java

## BACKEND - Java

### Test: TODO

TODO

## How to run

TODO

### GET - /score

Return Top 10 Best Players

### POST - /new-game

Start new game

#### Request

```
body: {
	"userName": "Guilherme"
}
```

#### Response

```
response: {
	{
    "matchHash": 733552022,
    "userName": "Guilherme",
    "turns": 0,
    "treasures": 0,
    "done": false,
    "userBoard": [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]
}
```

### POST - /board/:id

Play the game

#### Request

```
body: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 3 }]
```

or

```
body: [{ x: 1, y: 0 }]
```

#### Response

```
response: {
	{
    "matchHash": 733552022,
    "userName": "Guilherme",
    "turns": 1,
    "treasures": 0,
    "done": false,
    "userBoard": [[0,0,0,2,0], [2,3,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]
}
```

#### Warning: import "Postman_Collection.json" to the Postman
