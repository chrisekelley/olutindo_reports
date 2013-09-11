function(doc) {
  if (doc.formId === "incident") {
    var theDate = doc.created.toJSON().substring(0,7) ;
    if(doc.dev_education) {
      // dates are stored in the doc as 'yyyy-mm-dd'
      //emit(theDate.split('-')+"education", {'department':'education','resolved': parseInt(doc.resolved)});
      emit((theDate+"-Education").split('-'), parseInt(doc.resolved));
    } else if(doc.dep_administration) {
      emit((theDate+"-Administration").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_council) {
      emit((theDate+"-Council").split('-'), parseInt(doc.resolved));
    }  else if(doc.dep_community_development) {
      emit((theDate+"-Community dev.").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_finance) {
      emit((theDate+"-Finance").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_health) {
      emit((theDate+"-Health").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_nat_resources) {
      emit((theDate+"-Council").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_production) {
      emit((theDate+"-Production").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_works) {
      emit((theDate+"-Works").split('-'), parseInt(doc.resolved));
    }
  }
}