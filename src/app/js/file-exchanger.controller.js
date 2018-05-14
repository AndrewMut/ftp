(function() {
  "use strict";

  angular
    .module('app')
    .controller('fileExchanger', fileExchanger);

  fileExchanger.$inject = [
    '$q',
    '$scope',
    'FileUploader',
    'idGeneratorService',
    'ngDialog',
  ];

  function fileExchanger(
    $q,
    $scope,
    FileUploader,
    idGeneratorService,
    ngDialog,
  ) {

    //upload
    $scope.uploader = new FileUploader();

    $scope.list = [{
      name: 'Mark',
      type: 'Otto',
      size: '45'
    }, {
      name: 'Sark',
      type: 'page',
      size: '54',
      data: ''
    }, {
      name: 'Tark',
      type: 'Batto',
      size: '13',
      data: ''
    }, {
      name: 'Kark',
      type: 'Totto',
      size: '33',
      data: ''
    }, {
      name: 'Mareo',
      type: 'Motlo',
      size: '23',
      data: ''
    }];

    //sorting
    $scope.sorter = null;
    $scope.reverse = true;
    $scope.nameIcon = null;
    $scope.typeIcon = null;
    $scope.sizeIcon = null;

    //search filtration
    $scope.strict = false;

    //uploading image
    $scope.uploadedImage = null;

    //sorting functionality
    $scope.customSortBy = function(type) {
      $scope.reverse = ($scope.sorter === type) ? !$scope.reverse : false;
      $scope.sorter = type;

      if (type === 'name') {
        if ($scope.reverse) {
          $scope.nameIcon = 'arrow up';
          $scope.typeIcon = null;
          $scope.sizeIcon = null;
        } else {
          $scope.nameIcon = 'arrow down';
          $scope.typeIcon = null;
          $scope.sizeIcon = null;
        }
      } else if (type === 'type') {
        if ($scope.reverse) {
          $scope.typeIcon = 'arrow up';
          $scope.nameIcon = null;
          $scope.sizeIcon = null;
        } else {
          $scope.typeIcon = 'arrow down';
          $scope.nameIcon = null;
          $scope.sizeIcon = null;
        }
      } else if (type === 'size') {
        if ($scope.reverse) {
          $scope.sizeIcon = 'arrow up';
          $scope.nameIcon = null;
          $scope.typeIcon = null;
        } else {
          $scope.sizeIcon = 'arrow down';
          $scope.nameIcon = null;
          $scope.typeIcon = null;
        }
      }
    };

    //row interaction
    $scope.selectedItem = null;

    $scope.selectItem = function(item) {
      $scope.selectedItem = item;
      console.log('selectedItem', $scope.selectedItem);
    };

    $scope.deselectItem = function() {
      $scope.selectedItem = null;
      console.log('$scope.selectedItem', $scope.selectedItem);
    };

    $scope.correctPreviewType = function(item) {
      if (item.type === 'image' || item.type === 'page') {
        return true;
      }
      return false;
    };

    $scope.correctType = function(item) {
      if (item.type === 'text' || item.type === 'page') {
        return true;
      }
      return false;
    };

    $scope.clickToOpen = function() {
      $scope.uploadedImage = null;
      ngDialog.openConfirm({
          template: 'templates/image-upload.template.html',
          className: 'ngdialog-theme-default',
          scope: $scope
        })
        .then(function(result) {
            if (!!result) {
              $scope.uploadedImage = result;

              var item = {
                name: result.name,
                type: 'image',
                size: result.size / 1000,
                data: result
              };

              var img = document.getElementById("uploaded-image");
              var reader = new FileReader();
              reader.onloadend = function() {
                img.src = reader.result;
              }
              reader.readAsDataURL(result);

              item.link = img.src;
              $scope.list.push(item);
              return 'done';
            } else {
              console.log('error');
              return;
            }
          },
          function(error) {
            return $q.reject(error);
          })
    };

    $scope.previewImage = function(item) {
      var itemForUse = item;
      ngDialog.openConfirm({
          template: 'templates/image-preview.template.html',
          className: 'ngdialog-theme-default',
          scope: $scope,
          onOpenCallback: function() {
            var img = document.getElementById("preview-image");
            var reader = new FileReader();
            reader.onloadend = function() {
              img.src = reader.result;
            }
            reader.readAsDataURL(itemForUse);
            $("img").after(img);
          }
        })
    }

  };
})();
