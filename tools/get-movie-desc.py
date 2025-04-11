import requests

API_KEY = "2b9c47fb345738c2a2e84420da94ed59"  # <- Replace this with your actual TMDb API key
MOVIE_NAME = "Inception"       # <- Change this to search a different movie

# 1. Search the movie by name
search_url = "https://api.themoviedb.org/3/search/movie"
params = {
    "api_key": API_KEY,
    "query": MOVIE_NAME
}
search_response = requests.get(search_url, params=params).json()

if not search_response["results"]:
    print("Movie not found.")
else:
    # 2. Get the first matching movie's ID
    movie_id = search_response["results"][0]["id"]

    # 3. Fetch movie details
    details_url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    details_params = {
        "api_key": API_KEY
    }
    details_response = requests.get(details_url, params=details_params).json()

    # 4. Print out the description
    title = details_response.get("title", "Unknown Title")
    overview = details_response.get("overview", "No description available.")

    print(f"\n🎬 {title}\n")
    print(overview)
