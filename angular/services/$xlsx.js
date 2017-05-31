angular.module('app.services')

.factory('$xlsx', function() {
	var service = {
		parse: function(binaryData) {
			var workbook = XLSX.read(binaryData, {type: 'binary', cellDates: true})
			var worksheet = workbook.Sheets[workbook.SheetNames[0]]
			return XLSX.utils.sheet_to_json(worksheet)
		}
	}

	return service
})