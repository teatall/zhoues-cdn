//tab navigation by hash in URL
$(document).ready(function() {
    // Grab the hash from the URL
	var hash = location.hash;
    // Uncheck all the radio buttons
	$("input.tab-radio").attr("checked", null);
    // If there's a hash, check the matching radio button
	if (hash) {
		if($("input" + hash).length){
			$("input" + hash).attr("checked", "checked");
		}else{
			$("input.tab-radio.tab-default").attr("checked", "checked");
		}
	}
    // If there's not, check the .tab-default radio button
    	else {
		$("input.tab-radio.tab-default").attr("checked", "checked");
	}
    // put a hash to the URL
	$('input:radio').change(function(){
    	window.location.hash = this.id;
	});
});

// enable bootstrap tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// print specified element by id
function printContent(pid) {
	var contentPrint = document.getElementById(pid);
	newWin= window.open("");
	newWin.document.write(contentPrint.outerHTML);
	newWin.print();
	newWin.close();
}
