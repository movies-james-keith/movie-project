"use strict"

let moviesUrl = "https://receptive-different-edam.glitch.me/movies";


getMoviesDB(moviesUrl);
// fixCase('tenet tenet');
// addMovie();

$('#submit').click(function () {
   addMovie();
});

$('#delete-submit').click(function () {
    let item = $('#delete-item').val();
    deleteMovie(item);
});

function fixCase(string) {
        if (typeof (string) === 'string' && string !== '') {
            let names = [];
            let fixedNames = '';
            names = string.split(" ");
            for (let i = 0; i < names.length; i++) {
                names.push(names[i].charAt(0).toUpperCase() + names[i].slice(1).toLowerCase());
                fixedNames = fixedNames + names.pop() + ' ';
            }
            console.log(fixedNames);
            return fixedNames;
        }
}

function starRating (num){
    let stars = '';
    for(let i = 1; i <= 5; i++) {
        stars += '⭐️';
    }
    return stars;
}

function deleteMovie(item) {
        return fetch(moviesUrl + '/' + item, {
            method: 'delete'
        })
            .then(response => response.json());
}

function addMovie() {
    let data = { title:  $('#input-title').val(),
        genre:  $('#input-genre').val(),
        year:   $('#input-year').val(),
        plot:   $('#input-plot').val(),
        rating: $('#input-rating').val()
    };
    fetch(moviesUrl, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function getMoviesDB(url) {

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data)
            let html = '';
            html += '<ul>'

            for (let i = 0; i < (data.length - 1); i++) {
                let movieTitle = data[i].title;
                let movieGenre = data[i].genre;
                let movieYear = data[i].year;
                let moviePlot = data[i].plot;
                let movieRating = data[i].rating;
                if(data[i].title !== undefined) {
                    html += '<li>' + fixCase(movieTitle) + '</li>';
                    html += '<li>' + fixCase(movieGenre) + '</li>';
                    html += '<li>' + movieYear + '</li>';
                    html += '<li>' + moviePlot + '</li>';
                    html += '<li>' + starRating(movieRating) + '</li>';

                }
            }
            html += '<ul>';
            $('#moviesList').html(html);

        });
}