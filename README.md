# Getting Started

#### Clone the repo
```sh
git clone https://github.com/danmolina/tasklist-api.git
cd tasklist-api
```

#### Create data directory in the root directory if not existing
```sh
mkdir .data
```

#### Install dependencies:
```sh
npm install
```

#### Run
```sh
npm start
```


# Using Docker
#### Pull Repository
```sh
docker pull danmichaelmolina/tasklist-api:1.0.0
```
#### Run
```sh
docker run -p 9000:9000 danmichaelmolina/tasklist-api:1.0.0
```