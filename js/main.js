"use strict"


let moviesUrl = "https://receptive-different-edam.glitch.me/movies";

getMoviesDB(moviesUrl);
createDropdown();
createDeleteDropdown()


$('#add-submit').click(function (e) {
    e.preventDefault();
   addMovie();

});

$('#delete-submit').click(function (e) {
    e.preventDefault();
    deleteMovie();
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


function fixCase(string) {
    if (typeof (string) === 'string' && string !== '') {
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
    if (num == '1' || num == '2' || num == '3' || num == '4' || num == '5') {

    for (let i = 1; i <= num; i++) {
        stars += '⭐️';
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
    let data = { title:  $('#add-title').val(),
        genre:  $('#add-genre').val(),
        year:   $('#add-year').val(),
        plot:   $('#add-plot').val(),
        rating: $('#add-rating').val()
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
    createDropdown();
}


function createDropdown() {
    fetch(moviesUrl)
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < (data.length); i++) {
                let movieTitle = data[i].title;
                let movieId = data[i].id;
                if(data[i].title !== undefined && typeof(data[i].title) !== 'object') {
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
                if(data[i].title !== undefined && typeof(data[i].title) !== 'object') {
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
    let data = {
        title:  $('#edit-title').val(),
        genre:  $('#edit-genre').val(),
        year:   $('#edit-year').val(),
        plot:   $('#edit-plot').val(),
        rating: $('#edit-rating').val()
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
                if(data[i].title !== undefined) {
                    $('#movieCard').append(`
                    <div class="card text-center bg-primary text-light border-warning col-6">
                        <div class="card-body" id="${movieId}">
                            <h5 class="card-title"> ${movieTitle} </h5>
                            <p class="card-text"> ${movieGenre} </p>
                            <p class="card-text"> ${movieYear} </p>
                            <p class="card-text"> ${moviePlot} </p>
                            <p class="card-text"> ${movieRating} </p>
                        </div>
                    </div>
                    `)
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
}


function clearDropDown() {
    $('#select-movie .newoption').remove();
}


function clearDeleteDropDown() {
    $('#delete-movie .newoption').remove();
}


