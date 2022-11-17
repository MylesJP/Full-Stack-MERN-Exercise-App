# POST
$body = @'
{
    "title": "Sorry to Bother You",
    "year": 2019,
    "language": "English"
}

'@

Invoke-RestMethod -Uri "http://localhost:3000/movies" -Method Post -Body $body -ContentType "application/json"

# GET all movies
Invoke-RestMethod -Uri "http://localhost:3000/movies" -Method Get

# GET movie using ID
Invoke-RestMethod -Uri "http://localhost:3000/movies/61040c0193747a04a1998e29" -Method Get

# PUT movie
$body = @'
{   
    "title": "Sorry to Bother You",
    "year": 2018,
    "language": "English"
}
'@

Invoke-RestMethod -Uri "http://localhost:3000/movies/61040c0193747a04a1998e29" -Method Put -Body $body -ContentType "application/json"

# DELETE movie by ID
Invoke-RestMethod -Uri "http://localhost:3000/movies/61040c0193747a04a1998e29" -Method Delete
