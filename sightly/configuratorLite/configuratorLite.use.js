'use strict';
use(function () {

  var data;
  var multiVehiclesData = resource.getChild("multiVehiclesData");
  var vehicles = {};
  if (multiVehiclesData != null) {
    data = multiVehiclesData.listChildren();
    try {
      for (let i = 0; i < data.length; i++) {
        var element = data[i];
        var order= i+1;
        var vehicleImages = element.getChild("multiImagesData");
        if (vehicleImages != null) {
          var vehicleImagesData = vehicleImages.listChildren();
          var imagesArray = [];

          for (let j = 0; j < vehicleImagesData.length; j++) {
            var imageData = vehicleImagesData[j];
            imagesArray.push({
              path: encodeURI(imageData.properties.path)
            });
          }
        }


        var vehicleFeatures = element.getChild('vehicleFeaturesData');
        if (vehicleFeatures != null) {
          var vehicleFeaturesData = vehicleFeatures.listChildren();
          var featuresArray = [];
          for (let k = 0; k < vehicleFeaturesData.length; k++) {
            var featureData = vehicleFeaturesData[k];

            featuresArray.push({
              text: featureData.properties.text
            });
          }
        }
        vehicles[element.properties.vehicleModel] = {
          exteriorImage: encodeURI(element.properties.exteriorImage),
          exteriorVideo: encodeURI(element.properties.exteriorVideo),
          exteriorImageMobile: encodeURI(element.properties.exteriorImageMobile),
          exteriorVideoMobile: encodeURI(element.properties.exteriorVideoMobile),
          features: featuresArray,
          marketingText: element.properties.marketingText,
          interiorImages: imagesArray,
          showPrice: element.properties.showPrice,
          order:order
        }
      }

    } catch (error) {
      log.info(error);
    }
  } else {
    log.info("multivehiclesdata is null");
  }


  return {
    'vehiclesData': vehicles,
  };
});