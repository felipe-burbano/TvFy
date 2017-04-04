$(function () {

	var $tvShowsContainer = $("#app-body").find(".tv-shows");

	function renderShows(dataShows){
		
		dataShows.forEach(function(show){
		
		var article = template
			.replace(':name:',show.name)
			.replace(':summary:',show.summary)
			.replace(':img:',show.image.medium)
			.replace(':img alt:',show.name + " logo")
		
		var $article = $(article);
			$article.hide();
			$tvShowsContainer.append($article.fadeIn(2500));
		});
	}

	$("#app-body").find('form').submit(function(ev){		
			ev.preventDefault();

			var busqueda = $(this).find("input[type='text']").val();
			$tvShowsContainer.find('.tv-show').remove();
			var loader =  $('<div class="loader">');
			loader.appendTo($tvShowsContainer);

			$.ajax({

				url: 'http://api.tvmaze.com/search/shows',
				data: { q: busqueda },

				success: function(resu, textStatus, xhr){
					loader.remove();								
					var shows = resu.map(function(elem){
						return elem.show;
					})

					renderShows(shows);
					
					console.log(resu);
				},
			});
	});

	var template = '<article class="tv-show">'+
				   '<div class="left img-container">'+
				   '<img src=":img:" alt=":img alt:">'+
				   '</div>'+
				   '<div class="right info">'+
				   '<h1>:name:</h1>'+
				   '<p>:summary:</p>'+
				   '</div>'+
				   '</article>';

	if(!localStorage.dataShows){
		$.ajax('http://api.tvmaze.com/shows')
		 .then(function(dataShows){
			$tvShowsContainer.find('.loader').remove();
			localStorage.shows = JSON.stringify(dataShows);
			renderShows(dataShows);
		});
	} else {
		renderShows(localStorage.dataShows);
	}
	
});