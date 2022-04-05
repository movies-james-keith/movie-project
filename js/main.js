"use strict"


let moviesUrl = "https://receptive-different-edam.glitch.me/movies";

getMoviesDB(moviesUrl);
createDropdown();
createDeleteDropdown();


$('#add-submit').click(function (e) {
    e.preventDefault();
   addMovie();

});

$('#delete-submit').click(function (e) {
    e.preventDefault();
    let response = confirm("Sure are you to delete this movie?");
    if (response == true) {
        alert("Deleted this movie has been!");
        deleteMovie();
    }else{
        alert("Die another day this movie shall!");
    }
});

$('#edit-submit').click(function (e) {
    e.preventDefault();
    editMovie();
});

$('#clear-submit').click(function (e) {
    e.preventDefault();
    clearMoviesDB();
});

$('#select-movie').change(function(e){
    e.preventDefault();
    let title = $(this).val()
    populateEditForm(title);
});

// // Search on Keyup with no submit button
// $('#search-input').keyup(function(e){
//     e.preventDefault();
//     let input = $(this).val()
//     console.log(input);
//     if(input !== '') {
//         clearMoviesDB();
//         matchTitleFromSearch(input);
//     }else {
//         clearMoviesDB();
//         getMoviesDB();
//     }
// });

//  Search on submit button only
$('#search-input-submit').click(function(e){
    e.preventDefault();
    let input = $('#search-input').val()
    console.log(input);
    if(input !== '') {
        clearMoviesDB();
        matchTitleFromSearch(input);
    }else {
        clearMoviesDB();
        getMoviesDB();
    }
});

$('#search-delete-submit').click(function(e){
    e.preventDefault();
    clearMoviesDB();
    getMoviesDB();
    document.getElementById('search-input').value='';
});

function fixCase(string) {
    if (typeof (string) === 'string' && string !== ' ') {
        let names = [];
        let fixedNames = '';
        names = string.split(" ");
        for (let i = 0; i < names.length; i++) {
            names.push(names[i].charAt(0).toUpperCase() + names[i].slice(1).toLowerCase());
            fixedNames = fixedNames + names.pop() + ' ';
        }
        return fixedNames;
    }
}


function starRating (num) {
    let stars = '';
    let emoji = ['😠','😦','😑','😀','😍'];
    if (num == '1' || num == '2' || num == '3' || num == '4' || num == '5') {

    for (let i = 1; i <= num; i++) {
        stars +=  emoji[i];
    }
}
    return stars;
}


function deleteMovie() {
    let deleteId = $('#delete-movie option:selected').attr('id');

        fetch(moviesUrl + '/' + deleteId, {
            method: 'delete'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                clearMoviesDB();
                clearFormValues();
                getMoviesDB();
                clearDropDown();
                clearDeleteDropDown();
                createDropdown();
                createDeleteDropdown();});
}


function addMovie() {
    let data = { title:  $('#add-title').val().trim(),
        genre:  $('#add-genre').val().trim(),
        year:   $('#add-year').val(),
        plot:   $('#add-plot').val(),
        rating: $('#add-rating').val(),
        poster: $('#add-poster').val()
    };
    fetch(moviesUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            clearMoviesDB();
            clearFormValues();
            getMoviesDB();
            clearDropDown();
            clearDeleteDropDown();
            createDropdown();
            createDeleteDropdown();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function createDropdown() {
    fetch(moviesUrl)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < (data.length); i++) {
                let movieTitle = data[i].title;
                let movieId = data[i].id;

                if(movieTitle !== undefined) {
                    $('#select-movie').append(`
                    <option class="${movieTitle} newoption" id="${movieId}"> ${movieTitle} </option>                    
                    `)
                }
            }
        });
}


function createDeleteDropdown() {
    fetch(moviesUrl)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < (data.length); i++) {
                let movieTitle = data[i].title;
                let movieId = data[i].id;
                if(data[i].title !== undefined) {
                    $('#delete-movie').append(`
                    <option class="${movieTitle} newoption" id="${movieId}"> ${movieTitle} </option>                    
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
                let movieRating = data[i].rating;
                let moviePoster = data[i].poster;
                if(data[i].title === title) {
                    $('#edit-title').val(`${movieTitle}`)
                    $('#edit-genre').val(`${movieGenre}`)
                    $('#edit-year').val(`${movieYear}`)
                    $('#edit-plot').val(`${moviePlot}`)
                    $('#edit-rating').val(`${movieRating}`)
                    $('#edit-poster').val(`${moviePoster}`)
                }
            }
        });
}


function editMovie() {
    let data = {
        title:  $('#edit-title').val().trim(),
        genre:  $('#edit-genre').val().trim(),
        year:   $('#edit-year').val(),
        plot:   $('#edit-plot').val(),
        rating: $('#edit-rating').val(),
        poster: $('#edit-poster').val()
    };

    let dataId = $('#select-movie option:selected').attr('id');

    fetch(moviesUrl + '/' + dataId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            clearMoviesDB();
            clearFormValues();
            getMoviesDB();
            clearDropDown();
            clearDeleteDropDown();
            createDropdown();
            createDeleteDropdown();
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
                let movieId = data[i].id;
                let moviePoster = data[i].poster;
                if(data[i].title !== undefined) {
                    $('#movieCard').append(`
                    <div class="card text-center bg-primary text-light border-warning col-xs-12 col-sm-5 col-lg-4 my-2">
                        <div class="card-body" id="${movieId}">
                            <img src="${moviePoster}" alt="${movieTitle}" class="poster mb-2">
                            <h5 class="card-title"> ${movieTitle} </h5>
                            <p class="card-text"> ${movieGenre} </p>
                            <p class="card-text"> ${movieYear} </p>
                            <p class="card-text"> ${movieRating} </p>
                            <p class="card-text"> ${moviePlot} </p>
                            
                        </div>
                    </div>
                    `)
                }else {
                    clearMoviesDB();
                }
            }
        });
}


function clearMoviesDB() {
    $('#movieCard').html('');
}


function clearFormValues() {
    document.getElementById('add-title').value='';
    document.getElementById('add-genre').value='';
    document.getElementById('add-year').value='';
    document.getElementById('add-plot').value='';
    document.getElementById('add-rating').value='';
    document.getElementById('add-poster').value='';
}


function clearDropDown() {
    $('#select-movie .newoption').remove();
}


function clearDeleteDropDown() {
    $('#delete-movie .newoption').remove();
}


function matchTitleFromSearch(input) {
    fetch(moviesUrl)
        .then(response => response.json())
        .then(data => {

                    for (let i = 0; i < (data.length); i++) {
                        let movieTitle = fixCase(data[i].title);
                        let movieGenre = fixCase(data[i].genre);
                        let movieYear = data[i].year;
                        let moviePlot = data[i].plot;
                        let movieRating = starRating(data[i].rating);
                        let movieId = data[i].id;
                        let moviePoster = data[i].poster;
                        if(movieTitle.toLowerCase().includes(input)) {
                            console.log(movieTitle);
                            $('#movieCard').append(`
                    <div class="card text-center bg-primary text-light border-warning col-5 col-lg-4 my-2">
                        <div class="card-body" id="${movieId}">
                            <img src="${moviePoster}" alt="${movieTitle}" class="poster mb-2">
                            <h5 class="card-title"> ${movieTitle} </h5>
                            <p class="card-text"> ${movieGenre} </p>
                            <p class="card-text"> ${movieYear} </p>
                            <p class="card-text"> ${movieRating} </p>
                            <p class="card-text"> ${moviePlot} </p>
                            
                        </div>
                    </div>
                    `)
                        }
                    }

        });
}




