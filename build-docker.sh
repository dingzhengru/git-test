docker rm -vf qwsd7869/cms-fend-client
docker image rm -f qwsd7869/cms-fend-client
docker build --no-cache -t qwsd7869/cms-fend-client .
docker run -d -it -p 8888:80 --name cms-fend-client qwsd7869/cms-fend-client
