## POST a movie
curl --header "Content-Type: application/json" --request POST --data "{\"title\":\"Sorry to Bother You\", \"year\":2019, \"language\":\"English\"}" http://localhost:3000/movies

### GET all movies
curl http://localhost:3000/movies

### GET movie based on ID
curl http://localhost:3000/movies/60cfb5a294fe3b61d4ccc946

### PUT movie

curl --header "Content-Type: application/json" --request PUT --data "{\"title\":\"Sorry to Bother You\", \"year\":2018, \"language\":\"Korean\"}" http://localhost:3000/movies/60cfb5a294fe3b61d4ccc946

### DELETE movie

curl --request DELETE http://localhost:3000/movies/60cfb5a294fe3b61d4ccc946
