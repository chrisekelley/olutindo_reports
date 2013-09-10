var HomeView = Backbone.View.extend({
	//el: $("#homePageView"),
  template:  loadTemplate("home.vert.template.html"),
	initialize: function() {
		_.bindAll(this, 'addOne', 'reseted', 'render', 'search', 'orientation');
		FORMY.Incidents.bind('add',   this.addOne, this);
		//FORMY.Incidents.bind('search',   this.search, this);
		FORMY.Incidents.bind('reset', this.reseted, this);
		FORMY.Incidents.bind('all',   this.render, this);
		FORMY.Incidents.bind('change', this.search, this);
		FORMY.Incidents.bind('render', this.render, this);

		//FORMY.Incidents.fetch();
		return this;
	}, 
	addOne : function(patient){
		this.view = new SearchListItemView({model: patient});
		this.rendered = this.view.render().el;
		console.log("add one in HomeView:" + JSON.stringify(patient));
		$("#incidents").append(this.rendered);
	},
	events: {
		"click #form-search " : "search",
		"click #form-client " : "incidentLink",
		"click #dashboard " : "dashboardLink",
		"orientationEvent " : "orientation",
	},
	reseted: function() {
		console.log("reseted; Incidents count: " + FORMY.Incidents.length);
		$(this.el).html("");
		FORMY.Incidents.each(this.addOne);
	},
	remove: function() {
		console.log("remove the view in homeView");
		$(this.el).remove();
	},
	incidentLink: function() {
		FORMY.router.navigate('incident', true);
	},
  dashboardLink: function() {
		FORMY.router.navigate('dashboard', true);
	},
	search: function(e) {
		e.preventDefault();
		console.log("Searching");
		var searchTerm =  $('#search_string').val();
		FORMY.router.navigate('search/' + searchTerm, true);
	},
	orientation: "horiz",
	//reportEducationInstance:null,
	render: function() {
//		$("#formRenderingView").remove();
//		$("#recordView").remove();
		//console.log("render in HomeView:" + JSON.stringify(this.model));
		//this.content = this.model.toJSON();
		
//		window.addEventListener(orientationEvent, function() {
//			alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
//			}, false);
		// -90 480
		var homeViewHtml = this.template(this.model.toJSON());
		console.log("rendering HomeView");
		//$(this.el).html(homeViewHtml);
		$("#homePageView").html(homeViewHtml);
		//if(FORMY.Incidents.length > 0){
		FORMY.Incidents.each(this.addOne);
		
		$(".stripeMe tr").mouseover(function(){$(this).addClass("over");}).mouseout(function(){$(this).removeClass("over");});
		$(".stripeMe tr:even").addClass("alt");
		return this;
	}
});

var SearchListItemView = Backbone.View.extend({
	tagName : "tr",
	template: Handlebars.compile($("#search-template").html()),
	initialize : function(){
		//this.model.bind('change', this.render, this);
		// from backbone-couch.js chat example:
		 _.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},

	render : function(){ 
		this.content = this.model.toJSON();
		this.html = this.template(this.content);
		$(this.el).html(this.html);
		//console.log("render SearchListItemView: "+ JSON.stringify(html));
		return this;
	}
});
