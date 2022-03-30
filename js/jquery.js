"use strict"

let moviesUrl = "https://receptive-different-edam.glitch.me/movies";

getMoviesDB(moviesUrl);
// fixCase('tenet tenet');

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
    for(let i = 1; i <= num; i++) {
        stars += ''
    }
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
                    html += '<li>' + movieRating + '</li>';

                }
            }
            html += '<ul>';
            $('#moviesList').html(html);

        });
}