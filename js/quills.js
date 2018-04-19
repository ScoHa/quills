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
	let para = 1;
	
	// Adapted from code by 'neurotik' on StackOverflow (https://stackoverflow.com/a/7624736)
	while (text.length > 255) {
		var s = text.substr(0, 255);
		var i = s.lastIndexOf(" ");
		textOutput = text.substr(0, i);
		let output = "<p class='copyable' id='para" + para + "'>" + textOutput + "</p>";
		para++;
		$('#paginated-text').append(output);
		text = text.substr(i + 1, text.length);
	}
	output = "<p class='copyable' id='para" + para + "'>" + text + "</p>";
	$('#paginated-text').append(output);

	copyPaginatedText();
}

// Click event for submit button
$('#submit').on('click', function(event) {
	var text = $('#text-input').val();
	paginate(text);
});

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

copyToClipboard();
clearTextInput();