function(doc) {
  if (doc.formId === "incident") {
    var theDate = doc.created.toJSON().substring(0,7) ;
    if(doc.dev_education) {
      // dates are stored in the doc as 'yyyy-mm-dd'
      //emit(theDate.split('-')+"education", {'department':'education','resolved': parseInt(doc.resolved)});
      emit((theDate+"-education").split('-'), parseInt(doc.resolved));
    } else if(doc.dep_administration) {
      emit((theDate+"-administration").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_council) {
      emit((theDate+"-council").split('-'), parseInt(doc.resolved));
    }  else if(doc.dep_community_development) {
      emit((theDate+"-community_development").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_finance) {
      emit((theDate+"-finance").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_health) {
      emit((theDate+"-health").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_nat_resources) {
      emit((theDate+"-council").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_production) {
      emit((theDate+"-production").split('-'), parseInt(doc.resolved));
    }  else if(doc.dev_works) {
      emit((theDate+"-works").split('-'), parseInt(doc.resolved));
    }
  }
}