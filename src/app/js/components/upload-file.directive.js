(function() {
  angular
    .module('app')
    .directive('uploadFile', uploadFile);

  uploadFile.$inject = [];

  function uploadFile() {

    var directive = {
      link: link,
      restrict: 'AE'
    };

    return directive;

    function link(scope, element, attrs, ctrl) {

      element.bind('change', function(event) {
        var files = event.target.files;
        var uploadedOnPCfile = files[0];

        if (!!uploadedOnPCfile) {
          scope.$applyAsync(function() {
            scope.uploadedImage = uploadedOnPCfile;

            var img = document.getElementById("uploaded-image");
            var reader = new FileReader();
            reader.onloadend = function() {
              img.src = reader.result;
            }
            reader.readAsDataURL(uploadedOnPCfile);
            $("img").after(img);
          });
        } else {
          console.log('none');
        }

      });
    }

  }

})();
