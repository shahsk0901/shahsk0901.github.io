function initialize () {

}

function displayWelcome() {
    document.getElementById("displayWelcome").style.display = "block";
    document.getElementById("dipslayWelcome").className = "w3-card";
}

function sendRequest () {
   var sendRequest = new XMLHttpRequest();
   var search = document.getElementById("form-input").value;
   var query = encodeURI(document.getElementById("form-input").value);
   sendRequest.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   sendRequest.setRequestHeader("Accept","application/json");
   document.getElementById("searchResult").innerHTML = "Search results for <em><b>" + search + "</b></em><br />";
   sendRequest.onreadystatechange = function () {
       if (this.readyState == 4) {
          var moviesResponseList = JSON.parse(this.responseText);
          document.getElementById("listMovies").innerHTML = "";
          document.getElementById("listMovieInfo").innerHTML = "";
          for(var i=0;i<moviesResponseList.results.length;i++) {
              listMovies(i,moviesResponseList);
          }
       }
   };
   sendRequest.send(null);
}


function listMovies(i,movieList) {
    var getMovieId = movieList.results[i].id;

    document.getElementById("listMovies").innerHTML +=
        "<a class='w3-normal' style='text-decoration:none;margin-right:10px;' href='#' onclick=movieInfo("+getMovieId+")>" +
            "<p class='w3-text-dark-grey w3-hover-teal' style='padding-left:30px;margin:0px;padding-top:10px;padding-bottom:10px;'>" +
                       "<b>" + movieList.results[i].title + "<br /> " + "</b>" +
                "<span class=''>Release Date:" + movieList.results[i].release_date + "</span>" +
            "</p>" +
        "</a><br />";
}

function movieInfo(id) {
    var movieInfo = new XMLHttpRequest();
    movieInfo.open("GET", "proxy.php?method=/3/movie/"+id);
    movieInfo.setRequestHeader("Accept","application/json");
    movieInfo.onreadystatechange = function () {
        if (this.readyState == 4) {
            var movieInfoResponseList = JSON.parse(this.responseText);
            var str = JSON.stringify(movieInfoResponseList,undefined,2);
            document.getElementById("listMovieInfo").innerHTML = "";
            movieInfoInflator(str);
        }
    };
    movieInfo.send(null);
}

function movieInfoInflator(str) {
    var getMovieInfo = JSON.parse(str);
    document.getElementById("listMovieInfo").innerHTML +=
        "<div style='height:400px;width:auto;'>" +

            "<div style='position:relative;width:300px;height:300px;float:left;margin-right:20px'>" +
                "<img width='300px' height='300px' alt='Movie Poster' style='text-align: center' " +
                    "src='http://image.tmdb.org/t/p/w500/" + getMovieInfo.poster_path + "' />" +
            "</div>" +

            "<div style='position:relative;width:800px;float:left'>" +
                "<p > " +
                    "Original Title:&emsp;" + getMovieInfo.original_title + "<br />" +

                    "Overview:&emsp;&emsp;&emsp;" +
                    "<span style='display:inline-block;width:750px;word-wrap:break-word;'>" +
                        getMovieInfo.overview +
                    "</span><br />" +
                    "Genres:&emsp;&emsp;&emsp;&emsp;" + getMovieGenres() + "<br />" +

                    "Popularity:&emsp;&emsp;&nbsp;" + getMovieInfo.popularity + "<br />" +

                    "Status:&emsp;&emsp;&emsp;&emsp;&nbsp;" + getMovieInfo.status + "<br />" +

                    "Release Date:&emsp;" + getMovieInfo.release_date + "<br />" +

                "</p>" +


                "<p> Cast of the movie <br />" +
                    "<span id='cast'>" + displayCast(getMovieInfo.id) + "</span>" +
                "</p>" +
            "</div>" +
        "</div>";

    function getMovieGenres() {
        var genre = "";
        for (i=0;i<getMovieInfo.genres.length;i++) {
            genre += getMovieInfo.genres[i].name + ", ";
        }
        return genre.slice(0,genre.length - 2);
    }
}

/*function getMoviePoster(str) {
    var movieData = JSON.parse(str);
    var baseUrl = ""; var posterSize = ""; var fullPosterPath = "";
    var posterPath = movieData.poster_path;
    var moviePoster = new XMLHttpRequest();
    moviePoster.open("GET", "proxy.php?method=/3/configuration");
    moviePoster.setRequestHeader("Accept","application/json");
    moviePoster.onreadystatechange = function () {
        if (this.readyState == 4) {
            var moviePosterPath = JSON.parse(this.responseText);
            baseUrl = moviePosterPath.images.base_url;
            posterSize = moviePosterPath.images.poster_sizes[4];
            fullPosterPath = baseUrl + posterSize + posterPath;
        }
    };
    moviePoster.send(null);
    alert(fullPosterPath);
    return fullPosterPath;
}*/

function displayCast(id) {
    var castInfo = new XMLHttpRequest();
    castInfo.open("GET", "proxy.php?method=/3/movie/"+id+"/credits");
    castInfo.setRequestHeader("Accept","application/json");
    castInfo.onreadystatechange = function () {
        if (this.readyState == 4) {
            var castInfoResponse = JSON.parse(this.responseText);
            var str = JSON.stringify(castInfoResponse,undefined,2);
            document.getElementById("cast").innerHTML = "";
            var cast="";
            for(i=0;i<5;i++)
                cast += castInfoResponse.cast[i].name + ", ";
            document.getElementById("cast").innerHTML = cast.slice(0,cast.length-2);
        }
    };
    castInfo.send(null);
}