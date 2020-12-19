$(document).ready(function(){
	$(".desni").hide();
	$(".lijevi").hide();
});


function pretraga() 
{
	let ime = $("#ime").val();
	let tip = $("#select").val();
	let godina = $("#godina").val();
	$(".desni").hide();
	$(".lijevi").hide();
	$(".dodato").hide();

	if(ime === "")
	{
		$(".error").hide();
		$(".bez_unosa").html("<h2>Molimo Vas da unesete naziv filma/serije");
		$(".bez_unosa").show();
	}

	else{

		$(".bez_unosa").hide();
		$.ajax({
			type: "GET",
			url: `http://www.omdbapi.com/?apikey=57f7a8de&t=${ime}&type=${tip}&y=${godina}`,
			success: (response) => {

				let response_json = JSON.stringify(response);
				let response_json_parsed = JSON.parse(response_json);

				let url = response_json_parsed.Poster;
				let naslov = response_json_parsed.Title;
				let godina = response_json_parsed.Year;
				let datum = response_json_parsed.Released;
				let trajanje = response_json_parsed.Runtime;
				let reziser = response_json_parsed.Director;
				let glumci = response_json_parsed.Actors;
				let radnja = response_json_parsed.Plot;
				let brojSezona = response_json_parsed.totalSeasons;


				
				if(response_json_parsed.Response === "False")
				{
					$(".error").html("Unijeli ste nepostojeci podatak. Nijesmo pronasli u bazi podataka Vasu pretragu!");
					$(".error").show();
					
				}

				else
				{
					$(".desni").show();
					$(".lijevi").show();
					$("#slika").attr("src",url);
					$(".naslovFilmaSerije").html(naslov);
					$(".god").html(godina);
					$(".datum").html(datum);
					$(".trajanje").html(trajanje);
					$(".reziser").html(reziser);
					$(".glumci").html(glumci);
					$(".radnja").html(radnja);
					$(".brSezona").html(brojSezona);
					if(tip==="movie")
					{
						$(".brSezona1").hide();
						$(".brSezona").hide();
					}
					else
					{
						$(".brSezona1").show();
						$(".brSezona").show();
					}
					response_json_parsed.Ratings.forEach(function(rating)
					{
						$(".table").append(`
							<tr class="dodato"><td></td> <td>${rating.Source}</td> <td>${rating.Value}</td></tr>
							`)
					})
					$(".error").hide();
				}

			}
		});
	}
}