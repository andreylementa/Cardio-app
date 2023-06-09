'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--temp');
const inputElevation = document.querySelector('.form__input--climb');
let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;

      const { longitude } = position.coords;
      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (event) {
        mapEvent = event;
        form.classList.remove('hidden');
        inputDistance.focus();
        //const { lat, lng } = mapEvent.latlng;
        //L.marker([lat, lng])
        //  .addTo(map)
        //  .bindPopup(
        //    L.popup({
        //      autoClose: false,
        //      closeOnClick: false,
        //      maxWidth: 200,
        //      minWidth: 100,
        //      className: 'running-popup',
        //    })
        //  )
        //  .setPopupContent('Пробежка')
        //  .openPopup();
      });
    },
    function () {
      console.log('error');
    }
  );
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  inputDistance.value = inputDuration.value = inputCadence.value = '';
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        autoClose: false,
        closeOnClick: false,
        maxWidth: 200,
        minWidth: 100,
        className: 'running-popup',
      })
    )
    .setPopupContent('Пробежка')
    .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
