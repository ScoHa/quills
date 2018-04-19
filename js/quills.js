// Each page can contain up to 255 characters
// Carraige returns count as two characters
// No more than 13 lines on a page
// No more than 50 pages in a book
// Copy and Paste only works if charcount is < 255
// Ability to edit page stops once max charcount is reached, wraps into a new textbox for new page
// Boxes show charcount at bottom of textbox
// Boxes will have buttons to copy page to clipboard and to reset

// Enables button to copy the current page to the clipboard
function copyToClipboard() {
	$('#copy-to-clipboard').click(function() {
		$('#text-input').focus();
		$('#text-input').select();
		document.execCommand('copy');
	});
}

// Enables button to clear current page of text
function clearTextInput() {
	$('#clear').click(function() {
		$('#text-input').focus();
		$('#text-input').select().val('');
		$('#charcount').html('0/255');
	});
}

// Copy paginated text on mouseover
function copyPaginatedText() {
	$('.copyable').click(function(event) {
		// on click, determine which paragraph is clicked on and copy that text to the clipboard
		var id = $(this).attr('id');
		var idText = $('#' + id).text();
		alert(idText)
		// document.execCommand('copy');
	});
}



// Paginate entered text and paste it underneath the textarea, with appropriately-sized areas highlighted on mouseover with the ability to copy to clipboard by a click
function paginate(text) {
	// Divide text using substr() method
	// Need to allow for ending a page before a word that would go over
	// Still need to account for the incorrect /n counting, I think
	let char = 0;
	let para = 1;
	//text substr from beginning of text for 254 characters
	while (char < text.length) {
		let textInput = text.substr(char, 254);
		char += 254;
		let output = "<p class='copyable' id='para" + para + "'>" + textInput + "</p>";
		para++;
		$('#paginated-text').append(output);
	}

	copyPaginatedText();
	//save that to a var
	//append that text to page in a div to allow for interaction
	//repeat until all text is accounted for (loop)
}

// Click event for submit button
$('#submit').on('click', function(event) {
	var text = $('#text-input').val();
	paginate(text);
});

// Enter key triggers pagination in addition to button click
// $(".text-input").keypress(function(event) {
// 	if (event.which == 13) {
// 		var text = $('#text-input').val();
//     	paginate(text);
//   	};
// });

// Character count
$(document).ready(function() {
	var textMax = 255;
	$('#charcount').html('0/255');

	$('#text-input').keyup(function() {
		var text = $('#text-input').val();
		var textLength = $('#text-input').val().length;
		var lineBreaks = (text.match(/\r|\n/g)||[]).length;
		$('#charcount').html(textLength + lineBreaks + '/255');
	});

	
});


// $('#para1').on('click', function() {
// 	var textID = $(this).attr("id");
// 	// var idText = $('#' + id).text();
// 	alert(textID);
// });

copyToClipboard();
clearTextInput();