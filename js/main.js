//DOM ready to go
window.addEventListener('load', init);

let postcode;
let number;
//define lng and lat to 0
let lng = 0;
let lat = 0;

//Init App
function init() {

    let postCodesString = '4300 4301 4302 4303 4305 4306 4307 4308 4310 4311 4315 4316 4317 4318 4321 4322 4323 4325 4326 4327 4328 4330 4331 4332 4333 4334 4335 4336 4337 4338 4339 4340 4341 4350 4351 4352 4353 4354 4356 4357 4360 4361 4363 4364 4365 4370 4371 4373 4374 4380 4381 4382 4383 4384 4385 4386 4387 4388 4389 4400 4401 4410 4411 4413 4414 4415 4416 4417 4420 4421 4423 4424 4430 4431 4433 4434 4435 4436 4437 4438 4440 4441 4443 4444 4450 4451 4453 4454 4455 4456 4458 4460 4461 4462 4463 4464 4465 4470 4471 4472 4474 4475 4481 4482 4484 4485 4486 4490 4491 4493 4494 4500 4501 4503 4504 4505 4506 4507 4508 4510 4511 4513 4515 4520 4521 4522 4524 4525 4527 4528 4529 4530 4531 4532 4533 4535 4536 4537 4538 4539 4540 4541 4542 4543 4550 4551 4553 4554 4560 4561 4562 4564 4565 4566 4567 4568 4569 4570 4571 4574 4575 4576 4581 4583 4584 4585 4586 4587 4588 4589 4675 4690 4691 4693 4694 4695 4696 4697 4698';

    let postcodeArray = postCodesString.split(" ");

    for(let i = 0; i < postcodeArray.length; i++) {
        console.log(postcodeArray[i]);
        document.getElementById('postcodes').innerHTML += postcodeArray[i] + '<br>';
    }

    initMap(4.899431, 52.379189);

    let postcodeField = document.getElementById('postcode');
    let huisnummerField = document.getElementById('huisnummer');
    let submitButton = document.getElementById('submit-btn');

    submitButton.addEventListener('click', function () {

        postcode = postcodeField.value;
        number = huisnummerField.value;

        // console.log('postcode', postcode);
        // console.log('huisnummer', number);

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://api.postcodeapi.nu/v2/addresses/?postcode=" + postcode + "&number=" + number,
            "method": "GET",
            "headers": {
                "x-api-key": "5aZWHD18w84lhEb2qMGNI4dH7BybuVuA3r8XMqdO",
                "accept": "application/hal+json"
            }
        }).done(successCallbackHandler).fail(function (e) {
            console.log(e);
        });

    });

}

const successCallbackHandler = (data) => {

    let APIreturnData = data._embedded.addresses[0];

    console.log(APIreturnData);

    let straatField = document.getElementById('straat');
    let plaatsField = document.getElementById('plaats');

    straatField.value = APIreturnData.street;
    plaatsField.value = APIreturnData.city.label;

    //Googe Maps Cordinates
    lng = APIreturnData.geo.center.wgs84.coordinates[0];
    lat = APIreturnData.geo.center.wgs84.coordinates[1];


    initMap(lng, lat);
};

function initMap(lng, lat) {
    let uluru = {lat: lat, lng: lng};

    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });

    let marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

