docker build -t nam2302/k10-app .
docker login -u "myusername" -p "mypassword" docker.io
docker push nam2302/k10-app:latest
docker-compose exec k10-app sh

<!-- gitlab -->

docker build -t registry.gitlab.com/tranhuunam23022000/k10-be .
docker push registry.gitlab.com/tranhuunam23022000/k10-be
<!-- đã có cicd gitlab -->

<!-- run -->
docker rmi $(docker images -q --filter "dangling=true")
docker-compose up --pull --remove-orphans