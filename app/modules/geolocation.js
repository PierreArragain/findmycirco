const {  reverseSearch } = require('../api/reqAddress');

const geolocation = {

  options: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 5000,
  },

  success(position) {
    const coordinates = position.coords;
    return coordinates;
  },

  error(err) {
    console.warn(`ERROR (${err.code}): $[err.message}`);
  },


  async getAddressFromGeolocation() {
    const coord = navigator.geolocation.getCurrentPosition(geolocation.success, geolocation.error, geolocation.options);
    try {
    const result = await reverseSearch(coord);
    if (result) {
      return result;
      } else {
          res.render('home', { error: "address"});
      }
      } catch (err) {
          console.log(err);
      }
  }

}


module.exports = geolocation;