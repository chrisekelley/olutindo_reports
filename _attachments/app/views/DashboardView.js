var DashboardView = Backbone.View.extend({
	//el: $("#homePageView"),
	template: loadTemplate("dashboard.template.html"),
	initialize: function() {
	},
	events: {
	},
	orientation: "horiz",
	//reportEducationInstance:null,
	render: function() {
//		$("#formRenderingView").remove();
//		$("#recordView").remove();
		FORMY.reportEducation = this.options.reportEducationInstance;
		FORMY.reportHealth = this.options.reportHealthInstance;
		FORMY.reportWorks = this.options.reportWorksInstance;
		FORMY.reportOther = this.options.reportOtherInstance;
		
		$.when(this.options.reportEducationInstance.deferred, this.options.reportHealthInstance.deferred, 
				this.options.reportWorksInstance.deferred, this.options.reportOtherInstance.deferred)
		   .then(function(educationData, healthData, worksData, otherData){
			   
			   var departmentReport = new Object({date:null,education:null,health: null,works:null,other:null});
			   var reportDate = new Date();
			   console.log("Generating report for: " + reportDate);
         console.log("educationData[0]: " + JSON.stringify(educationData[0]));
			   var education = parseData(reportDate, educationData[0]);	
			   departmentReport.education = education;
			   var health = parseData(reportDate, healthData[0]);	
			   departmentReport.health = health;
			   var works = parseData(reportDate, worksData[0]);	
			   departmentReport.works = works;
			   var other = parseData(reportDate, otherData[0]);	
			   departmentReport.other = other;
			   console.log("running bulletChart. here is the stuff: " + JSON.stringify(departmentReport));
			   //bulletChart(departmentReport);
			   simpleBarCharts();
         resolvedCasesByDepartment();
		   })
		   .fail(function(){
		      console.log( 'I fire if one or more requests failed.' );
		   });
		
//		this.options.reportCollection.deferred.done(function(countData){
////			var homeViewHtml = this.template(this.model.toJSON());
////			console.log("rendering HomeView");
////			//$(this.el).html(homeViewHtml);
////			$("#homePageView").html(homeViewHtml);
////			//if(FORMY.Incidents.length > 0){
////			FORMY.Incidents.each(this.addOne);
//			
//
//			//}
//			
//		});
		
		var dashboardViewHtml = this.template(this.model.toJSON());
		console.log("rendering Dashboard");
		//$(this.el).html(homeViewHtml);
		$("#dashboardPageView").html(dashboardViewHtml);
		return this;
	},
});


function parseData(reportDate, data) {
	var reportYear = reportDate.getFullYear();
	var reportMonth = reportDate.getMonth() + 1;	
	var values = [];
	var labels = [];
	var indices = [];
	var months = [];

	//var counts = [];
	for (i in data.rows) {
		//console.log(data.rows[i].key.join('-') + ": " + "data.rows[i].value: " + JSON.stringify(data.rows[i].value));
		//values.push(data.rows[i].value.resolved);
		labels.push(data.rows[i].key.join('-'));
		var year = parseInt(data.rows[i].key[0], 10);
		var month = parseInt(data.rows[i].key[1], 10);
    console.log("WARNING!!! Disabled date range.")
		//if ((year === reportYear) && (month === reportMonth)) {
			values.push(data.rows[i].value);
		//}
		months.push(month);
		indices.push(i);
	}
//	console.log("labels: " + JSON.stringify(labels));
//	console.log("values: " + JSON.stringify(values));
//	console.log("months: " + JSON.stringify(months));
//	console.log("indices: " + JSON.stringify(indices));
	return values;
}