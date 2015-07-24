/**
 * 
 * ngwfDdContentCounterDirective directive :
 *
 * WHAT IS IT USED FOR? : 
 *
 * return real item count(does not count placeholder and hidden item being dragged)
 * 
 * 
 */
angular
    .module('ngwfApp.directives.ngwfDdContentCounterDirective', [])
    .directive('ddContentCounter', ['dragDropItemCounterService',

    function(dragDropItemCounterService){

    	console.info('directive ddContentCounter loaded');

    	return {
    		 scope: {
    		 	valueWhenPlaceholder: 	'@ddValueWhenPlaceholder',
    		 	valueWhendragging: 			'@ddValueWhenDragging',
    		 	fullModel : 						'=ddFullModel',
					currentIndex :       		'@ddContentCounterCurrentIndex',
          parentIndex :         	'@ddContentCounterParentIndex',
    		 }, 
    		
    		restrict: 'A', 
    		
    		link: function($scope, element) {
    			

       			//check child count change
    			$scope.$watch(
				    function () { return element[0].children.length; },
				    function (newValue, oldValue) {
				      if (newValue !== oldValue) {

				        var newRealCount= 0;
				        var listClassForThisRow = [];

				        for (var i = element[0].children.length - 1; i >= 0; i--) {
				        	console.info('element is countabale' + dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList));

				        	if(dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList)){
				        		newRealCount++;
				        		listClassForThisRow.push({item: i, isReal : true});
				        	}else{
				        		listClassForThisRow.push({item: i, isReal : false});
				        	} 

				        }
    							console.dir(
    									{
    										ddContentCounterTitleLog : 'ddContentCounter',
    										index : $scope.currentIndex,
    										parentIndex : $scope.parentIndex,
    										realCount : newRealCount
    									}
    								);

				        $scope.contentRealCount = newRealCount;
								//todo : update modelRealItemsCount
								//console.info('counter : ' + newRealCount);
				        dragDropItemCounterService.updateLineItemCss($scope.ddFullModel, listClassForThisRow, columIndex, lineIndex, $scope.contentRealCount);
				      }
				    }
				  );
		  
    		}
    	};

    }]);