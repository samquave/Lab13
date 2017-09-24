var $submitBtn = $('#chirp-submit');
var $chirpInput = $('#chirp-input-box');
var $chirpList = $('#chirp-field');

$submitBtn.click(postChirp);

$chirpInput.on('input', function () {
    var isEmpty = $chirpInput.val().length === 0;
    $submitBtn.prop('disabled', isEmpty);
});

function postChirp() {
    var chirp = {
        message: $chirpInput.val(),
        user: 'Sam',
        timestamp: new Date().toISOString()
    };
    $.ajax({
        method: 'POST',
        url: '/api/chirps',
        contentType: 'application/json',
        data: JSON.stringify(chirp)
    }).then(function (success) {
        $chirpInput.val('');
        $submitBtn.prop('disabled', true);
        getChirps();
    }, function (err) {
        console.log(err);
    })


}
function getChirps() {
    $.ajax({
        method: 'GET',
        url: '/api/chirps'

    }).then(function (chirps) {
        $chirpList.empty();
        for (var i = 0; i < chirps.length; i++) {
            var $chirpDiv = $('<div class= "chirp-div"></div>');
            var $message = $('<p></p>');
            var $user = $('<h4></h4>');
            var $timestamp = $('<h5></h5>');

            $message.text(chirps[i].message);
            $user.text(chirps[i].user);
            $timestamp.text(new Date(chirps[i].timestamp).toLocaleString());
            $message.append($chirpDiv);
            $user.append($chirpDiv);
            $timestamp.append($chirpDiv);

            $chirpDiv.append($chirpList);


        }

    }, function (err) {
        console.log(err);
    });
}

getChirps();
