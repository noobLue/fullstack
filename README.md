# fullstack

Note, if ```npm start``` doesn't work, try to do ```npm install``` first.

## Part0


[/part0/0.4.md](./part0/0.4.md)

[/part0/0.5.md](./part0/0.5.md)

[/part0/0.6.md](./part0/0.6.md)


## Part1

Exercises 1.1 - 1.5 are in [/part1/courseinfo/](./part1/courseinfo/)

```bat
cd ./part1/courseinfo/
npm start
```

Exercises 1.6 - 1.11 are in [/part1/unicafe/](./part1/unicafe/)
```bat
cd ./part1/unicafe/
npm start
```

Exercises 1.12 - 1.14 are in [/part1/anecdotes/](./part1/anecdotes/)
```bat
cd ./part1/anecdotes/
npm start
```

----

## Part2


Exercises 2.1 - 2.5 are in [/part2/courseinfo/](./part2/courseinfo/)
```bat
cd ./part2/courseinfo/
npm start
```


Exercises 2.6 - 2.17 are in [/part2/phonebook/](./part2/phonebook/)

Start json-server before node application

```bat
cd ./part2/phonebook/
json-server --watch --port 3001 db.json

cd ./part2/phonebook/
npm start
```

Exercises 2.18 - 2.20 are in [/part2/countries/](./part2/countries/)

First create a .env variable with content ```REACT_APP_WEATHER_KEY={API_KEY}```, replace {API_KEY} with openweathermap api key
```bat
cd ./part2/countries/
npm start
```