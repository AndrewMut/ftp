(function() {
  'use strict';
  angular
    .module('app')
    .directive('svgIcon', svgIcon);

  svgIcon.$inject = [];

  var icons = {
    iconAdd: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 472.615 472.615" xml:space="preserve"> <g> <g> <polygon points="278.565,194.051 278.565,0 194.053,0 194.053,194.051 0,194.051 0,278.564 194.053,278.564 194.053,472.615 278.565,472.615 278.565,278.564 472.615,278.564 472.615,194.051"/> </g> </g> </svg>',
    iconUpload: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 489.4 489.4" xml:space="preserve"> <g> <g> <path d="M382.4,422.75h-79.1H282h-4.6v-106.1h34.7c8.8,0,14-10,8.8-17.2l-67.5-93.4c-4.3-6-13.2-6-17.5,0l-67.5,93.4 c-5.2,7.2-0.1,17.2,8.8,17.2h34.7v106.1h-4.6H186H94.3c-52.5-2.9-94.3-52-94.3-105.2c0-36.7,19.9-68.7,49.4-86 c-2.7-7.3-4.1-15.1-4.1-23.3c0-37.5,30.3-67.8,67.8-67.8c8.1,0,15.9,1.4,23.2,4.1c21.7-46,68.5-77.9,122.9-77.9 c70.4,0.1,128.4,54,135,122.7c54.1,9.3,95.2,59.4,95.2,116.1C489.4,366.05,442.2,418.55,382.4,422.75z"/> </g> </g> </svg>',
  };

  function svgIcon() {
    var directive = {
      link: link,
      restrict: 'E'
    };

    return directive;

    function link(scope, element, attrs) {
      function path(icon) {
        return icons[icon];
      }

      function renderSVG() {
        element.html(path(attrs.src));
      }

      renderSVG();
    }

  }

})();
