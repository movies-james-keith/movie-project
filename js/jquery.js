
//URL of our movie database hosted on Glitch.me
let moviesUrl = "https://receptive-different-edam.glitch.me/movies";

getMoviesDB(moviesUrl);

//Click event to execute addMovie function
$('#add-submit').click(function () {
   addMovie();
});

//Click event to execute deleteMovie function
$('#delete-submit').click(function () {
    let item = $('#delete-item').val();
    deleteMovie(item);
});

//Click event to execute editMovie function
$('#edit-submit').click(function () {
    editMovie();
});

createDropdown();

//Function which takes a string and returns string with the first letter of each word capitalized
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

//Function which takes a number (numerical rating) and replaces it with stars. Limited to 5
function starRating (num){
    let stars = '';
    for(let i = 1; i <= 5; i++) {
        stars += '⭐️';
    }
    return stars;
}

//Function which will delete a movie from the database
function deleteMovie(item) {
        return fetch(moviesUrl + '/' + item, {
            method: 'delete'
        })
            .then(response => response.json());
}

//Function which takes user input through a form and adds a new movie object to the database
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//Function which takes all movie names within the database and places them into a dropdown list
function createDropdown() {
    fetch(moviesUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            for (let i = 0; i < (data.length - 1); i++) {
                let movieTitle = fixCase(data[i].title);
                if(data[i].title !== undefined) {
                    $('#selectMovie').append(`
                    <li><a class="dropdown-item" href="#">${movieTitle}</a></li>
                    `)
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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//Function which takes all the movies' data from the database and renders it
function getMoviesDB(url) {

    fetch(url)
        .then(response => response.json())
        .then(data => {

            // console.log(data)

            for (let i = 0; i < (data.length - 1); i++) {
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