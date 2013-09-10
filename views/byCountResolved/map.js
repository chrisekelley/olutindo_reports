function(doc) {
	if(doc.resolved) {
		//emit(doc.assignedId, doc);
		// dates are stored in the doc as 'yyyy-mm-dd'
		//var compoundId = doc.created + "-" + doc._id;
    // Simply give a count of any doc that has the resolved field, no matter its value.
		emit(doc.created.split('-'), 1);
		//emit(compoundId.split('-'), parseInt(doc.resolved));
		//emit(doc.created, parseInt(doc.resolved));
	}
}