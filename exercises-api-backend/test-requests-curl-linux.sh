## POST a movie
curl -X POST -H "Content-Type: application/json" \
    -d '{"title": "Sorry to Bother You", "year": 2019, "language": "English"}' \
    http://localhost:3000/movies

### GET all movies
curl http://localhost:3000/movies

### GET movie based on ID
curl http://localhost:3000/movies/60cfb5a294fe3b61d4ccc946

### PUT movie

curl -X PUT -H "Content-Type: application/json" \
    -d '{"title": "Sorry to Bother You", "year": 2018, "language": "English"}' \
    http://localhost:3000/movies/60cfb5a294fe3b61d4ccc946

### DELETE movie

curl --request DELETE http://localhost:3000/movies/60cfb5a294fe3b61d4ccc946
