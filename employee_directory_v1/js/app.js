$(document).ready(function () {

	//build the cards
	var url = "https://randomuser.me/api/?nat=us";
	var employeeArray = [];
	for(let i = 0; i < 12; i++) {
		$.getJSON(url, function(data) {
			employeeArray.push(data);
			let statusHTML = '<div class="card" id="' + i + '"">';
			statusHTML += '<img class="profile-pic" src="' + data.results[0].picture.large + '"/>';
			statusHTML += '<div class="info"><p class="name">' + data.results[0].name.first + ' ' + data.results[0].name.last + '</p>';
			statusHTML += '<p class="email">' + data.results[0].email + '</p>';
			statusHTML += '<p class="city">' + data.results[0].location.city + '</p></div>';
			statusHTML += '</div>';
			$('.container').append(statusHTML);
		});
	}

	// Flag the index card
	let index;

	//determine the index of the card
	$('.container').on('click', function(e) {
		if(e.target.id) {
			index = e.target.id;
			buildModal(index);
		}
		else if($(e.target).parent()[0].id) {
			index = $(e.target).parent()[0].id;
			buildModal(index);
		}
		else {
			index = $(e.target).parent().parent()[0].id;
			buildModal(index);
		}
	});

	// close button on modal
	$('.close').on('click', function(e) {
		closeModal();
	});

	//right button on modal based off the index
	$('.right-button').on('click', function() {
		closeModal();
		if(index == 11) {
			index = -1;
		}
		index = parseInt(index) + 1;
		buildModal(index);

	});

	//left button on modal based off the index
	$('.left-button').on('click', function() {
		closeModal();
		if(index == 0) {
			index = 12;
		}
		index = parseInt(index) - 1;
		buildModal(index);
	
	});

	//build modal based off the index
	function buildModal(index) {
		openModal();
		$('.content').empty();
		let modalHTML = '<div class="content">';
		modalHTML += '<img class="profile-pic" src="' + employeeArray[index].results[0].picture.large + '"/>';
		modalHTML += '<p class="name">' + employeeArray[index].results[0].name.first + ' ' + employeeArray[index].results[0].name.last + '</p>';
		modalHTML += '<p class="email">' + employeeArray[index].results[0].email + '</p>';
		modalHTML += '<p class="city">' + employeeArray[index].results[0].location.city + '</p>';
		modalHTML += '<hr>';
		modalHTML += '<p class="phone">' + employeeArray[index].results[0].phone + '</p>'
		modalHTML += '<p class="location">' + employeeArray[index].results[0].location.street + ', ' + 
						employeeArray[index].results[0].location.state + ' ' +
						employeeArray[index].results[0].location.postcode + '</p>';
		modalHTML += '<p class="birthday">' + 
						parseBirthday(employeeArray[index].results[0].dob.date) + '</p></div>';
		$('.modal-content').append(modalHTML);
	}

	//initially hide the modal
	closeModal();

	// open modal
	function openModal() {
		$('.bg-modal').show();
	}

	//close modal
	function closeModal() {
		$('.bg-modal').hide()
	}

	// format the birthday date
	function parseBirthday(date) {
		let newDate = new Date(date);
		let day = newDate.getDate();
		let month = newDate.getMonth();
		let year = newDate.getFullYear();
		let birthday = day + '/' + month + '/' + year;
		return birthday;
	}

	//search function
	$("input[type='search']").on('keyup',function() {
	var keyword = $(this).val().toLowerCase();
	//add hide class to gallery when keydown
	var $images = $('.container div');
	$images.addClass('hide');
	//go through figcaption and match keyword, if same, remove hide class
	$('.name').each(function() {
		let name = $(this).text();
		if(name.indexOf(keyword) >= 0) {
			$(this).parent().parent().removeClass('hide');
			$(this).parent().removeClass('hide');
		}
	});
});
});

