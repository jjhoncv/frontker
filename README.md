# Frontker

Project front with docker and gulp

[link frontker!](https://jjhoncv.github.io/frontker)

## Features

- Version Docker 18
- Version de node 9.11.1

## Use mode
Steps to work

### 1. Build image docker
build the node image to use
```sh
make build.image
```

### 2. Install dependencies
Install the node dependencies for our project 
```sh
make npm.install
```

### 3. Build project
build our project
```sh
make gulp.build
```

### 4. Start watch project
watch start our project
```sh
make start
```

### 5. Stop watch project
watch stop our project
```sh
make stop
```


### 6. show logs watch project
watch logs our project
```sh
make logs
```


