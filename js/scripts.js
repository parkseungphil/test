$(document).ready(function(){
	// Carousel auto-slide interval
	$('#keyVisual').carousel({
		interval: 5000 // Change slide every 5 seconds
	});

	// Inquiry submission button action
	$('#estimateModal .btn-primary').on('click', function() {
		alert('문의가 제출되었습니다. 빠른 시일 내에 연락드리겠습니다.');
		$('#estimateModal').modal('hide'); // Close modal
	});

	// Dropdown menu hover effect activation
	$('.navbar .dropdown').hover(function() {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideDown(200);
	}, function() {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp(200);
	});

	// Menu activation feature
	$('#gnb .nav-link, #gnb .dropdown-item').on('click', function(e) {
		// Remove 'active' class from all nav items and dropdown items
		$('#gnb .nav-item').removeClass('active');
		$('#gnb .dropdown-item').removeClass('active');

		// Add 'active' class to the clicked item and its parent nav-item
		if ($(this).hasClass('dropdown-item')) {
			$(this).addClass('active');
			$(this).closest('.nav-item').addClass('active');
		} else {
			$(this).closest('.nav-item').addClass('active');
		}
	});

	// Activate menu item based on current URL (optional)
	// This can maintain active state after page refresh if actual page paths are used.
	var currentPath = window.location.pathname;
	$('#gnb a').each(function() {
		if ($(this).attr('href') === currentPath) {
			$(this).addClass('active');
			$(this).closest('.nav-item').addClass('active');
		}
	});
});
