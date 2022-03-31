"use strict"


let moviesUrl = "https://receptive-different-edam.glitch.me/movies";

getMoviesDB(moviesUrl);
createDropdown();




$('#add-submit').click(function (e) {
    e.preventDefault();
   addMovie();

});

$('#delete-submit').click(function (e) {
    e.preventDefault();
    let item = $('#delete-input').val();
    deleteMovie(item);
});

$('#edit-submit').click(function (e) {
    e.preventDefault();
    editMovie();
});

$('#select-movie').change(function(e){
    e.preventDefault();
    let title = $(this).val()
    populateEditForm(title);
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

function starRating (num) {
    let stars = '';
    if (num == '1' || num == '2' || num == '3' || num == '4' || num == '5') {

    for (let i = 1; i <= num; i++) {
        stars += '⭐️';
    }
}
    return stars;
}

function deleteMovie(item) {

    fetch(moviesUrl + '/' + item, {
        method: 'delete'
    })
        .then(response => response.json());
        fetch(moviesUrl + '/' + item, {
            method: 'delete'
        })
            // .then(response => response.json());
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                getMoviesDB()});
}

function addMovie() {
    let data = { title:  $('#add-title').val(),
        genre:  $('#add-genre').val(),
        year:   $('#add-year').val(),
        plot:   $('#add-plot').val(),
        rating: $('#add-rating').val()
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
            getMoviesDB()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    createDropdown();
}

function createDropdown() {
    fetch(moviesUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data)

            for (let i = 0; i < (data.length); i++) {
                let movieTitle = data[i].title;
                let movieId = data[i].id;

                if(data[i].title !== undefined) {
                    $('#select-movie').append(`
                    <option> ${movieTitle} </option>                    
                    `)
                }
            }
        });
}

function populateEditForm(title) {
    fetch(moviesUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (let i = 0; i < (data.length); i++) {
                let movieTitle = fixCase(data[i].title);
                let movieGenre = fixCase(data[i].genre);
                let movieYear = data[i].year;
                let moviePlot = data[i].plot;
                let movieRating = starRating(data[i].rating);
                if(data[i].title === title) {
                    $('#edit-title').val(`${movieTitle}`)
                    $('#edit-genre').val(`${movieGenre}`)
                    $('#edit-year').val(`${movieYear}`)
                    $('#edit-plot').val(`${moviePlot}`)
                    $('#edit-rating').val(`${movieRating}`)
                }
            }
        });
}

function editMovie() {
    let data = { title:  $('#edit-title').val(),
        genre:  $('#edit-genre').val(),
        year:   $('#edit-year').val(),
        plot:   $('#edit-plot').val(),
        rating: $('#edit-rating').val()
    };
    fetch(moviesUrl, {
        method: 'PUT', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            getMoviesDB()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function getMoviesDB() {

    fetch(moviesUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data)

            for (let i = 0; i < (data.length); i++) {
                let movieTitle = fixCase(data[i].title);
                let movieGenre = fixCase(data[i].genre);
                let movieYear = data[i].year;
                let moviePlot = data[i].plot;
                let movieRating = starRating(data[i].rating);
                if(data[i].title !== undefined) {
                    $('#moviesList').append(`
                    <li> ${movieTitle} </li>
                    <li> ${movieGenre} </li>
                    <li> ${movieYear} </li>
                    <li> ${moviePlot} </li>
                    <li> ${movieRating} </li>
                    `)
                }
            }
        });
}