function(doc) {
  if(doc.dev_education && doc.formId === "incident") {
    var theDate = doc.created.toJSON().substring(0,10) ;
    emit(theDate.split('-'), 1);
  }
}