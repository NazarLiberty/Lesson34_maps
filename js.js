
let to;
let from;
$('#from').on('keydown', () => {
    from = $('#from').val();
    fromPrompt()
})
$('#fromPrompt').on('click', function () {
    $('#from').val($(this).text())
    $(this).removeClass('prompt--active')
})
// From click
// To click
$('#toPrompt').on('click', function () {
    $('#to').val($(this).text())
    $(this).removeClass('prompt--active')
})
$('#to').on('keydown', () => {
    to = $('#to').val();
    toPrompt()
})

$('#info-button').on('click', () => {
    getDistance($('#from').val(), $("#to").val())
})

let iryna = { lat: 41.798249, lng: 24.053290 }
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: iryna,
        zoom: 10
    });
}

function fromPrompt() {
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
        origins: [from],
        destinations: ['Киев'],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        }
        else {
            $('#fromPrompt').addClass('prompt--active')
            $('#fromPrompt').text(response.originAddresses[0])

        }
    });
}

function toPrompt() {
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
        origins: ['Киев'],
        destinations: [to],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        }
        else {
            $('#toPrompt').addClass('prompt--active')
            $('#toPrompt').text(response.destinationAddresses[0])

        }
    });
}
function getDistance(origin, destination) {
    var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        }
        else {
            $('#info-button').next().html(`<p>Distance beetwen ${origin} and ${destination}
             is <span class="info-text"> ${response.rows[0].elements[0].distance.text} </span></p>
              <p> Time to beat is <span class="info-text"> ${response.rows[0].elements[0].duration.text}</span>`);


        }
    });
}



