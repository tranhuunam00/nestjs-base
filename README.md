docker build -t nam2302/k10-app .
docker login -u "myusername" -p "mypassword" docker.io
docker push nam2302/k10-app:latest
