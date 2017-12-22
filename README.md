```
         ooooo ooooo      ooo                      .oooooo.
         `888' `888b.     `8'                     d8P'  `Y8b
 .oooo.o  888   8 `88b.    8   .ooooo.  oooo d8b 888           oooo    ooo
d88(  "8  888   8   `88b.  8  d88' `88b `888""8P 888            `88.  .8'
`"Y88b.   888   8     `88b.8  888ooo888  888     888     ooooo   `88..8'
o.  )88b  888   8       `888  888    .o  888     `88.    .88'     `888'
8""888P' o888o o8o        `8  `Y8bod8P' d888b     `Y8bood8P'       .8'
                                                               .o..P'
                                                               `Y8P'
```


# ☢️ WORK IN PROGRESS

<img src="./assets/logo.png" width="100px" height="100px" alt="logo" />

# sINerGy

A microservices framework for building Web and Desktop applications.

## Macro architecture
<img src="./assets/macro-arch-diagram.png" alt="Diagram" />


# Development

### Get started
Download Docker app
<https://docs.docker.com/engine/installation/>

```sh
make
```
> It might take a while first time to pull all the images

### Containers info

```sh
make info
```

### Build

```sh
make build <service>
```


## Desktop

### Polytron
@see Polytron microservice

## CLI
TBA

## External access

### Polytron
UI Polymer Web/Desktop application
- https://polytron.sinergy.localhost -> http://localhost:9081

### Reactron
UI ReactJS Web/Desktop application
- https://reactron.sinergy.localhost -> http://localhost:9080

### API
API gateway - NodeJS
- https://api.sinergy.localhost -> http://localhost:3000

## Internal access

### DB
CouchDB server
- https://localhost:1000/_utils/fauxton/

### BUS
RabitMQ - Message queue broker
- https://localhost:2000/

### Micro services
- service-grpc - gRPC NodeJS demo service
- service-http - microjs http NodeJS demo service

### Docs
TBA

### QA & Testing
TBA

### Monitoring & Logging
TBA

---
> For more see Makefile for more info until `make help` is complete

### &copy; an AppChemistry & [|{ustomM@de][4] project.

<img src="./assets/alchemy-laboratory-granger.gif" alt="logo" />

[2]:https://electron.atom.io/
[3]:https://www.polymer-project.org/
[4]:https://github.com/kmade/
