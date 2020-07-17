docker rm -vf cms-fend-client
docker build --no-cache -t qwsd7869/cms-fend-client .
docker run -d -it -p 80:80 --name cms-fend-client qwsd7869/cms-fend-client
