## INSTALLATION


### BUILDING APP IMAGE

```
cd lib/web
docker build -t binhdna/node-web-app .
```

### BUILDING DB IMAGE

```
cd lib/db
docker build -t binhdna/mysql .
```


### RUN COMPOSE


```
docker-compose up
```