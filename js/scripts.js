$(document).ready(function(){
	// Carousel auto-slide interval
	$('#keyVisual').carousel({
		interval: 5000 // Change slide every 5 seconds
	});

	// Inquiry submission button action
	$('#estimateModal .btn-primary').on('click', function() {
		
		sendQuoteEmail();
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

// 견적문의 폼 데이터를 받아 메일 클라이언트를 여는 함수
function sendQuoteEmail() {
    // 폼 요소 가져오기
    const form = document.getElementById('quoteForm');
    const formData = new FormData(form);

    // 폼 데이터에서 값 추출
    const name = formData.get('userName') || 'Unknown';
    const email = formData.get('userEmail') || '';
    const phone = formData.get('userPhone') || 'Not provided';
    const message = formData.get('inquiryDetails') || 'No message provided';

    // 이메일 제목과 본문 구성
    const subject = encodeURIComponent('견적 문의 - '+name);
    const body = encodeURIComponent(
        '이름: '+name+'\n' +
        '이메일: '+email+'\n' +
        '전화번호: '+phone+'\n' +
        '문의 내용:\n'+message
    );

    // mailto 링크 생성
    const mailtoLink = 'mailto:gazzz79@gmail.com?subject='+subject+'&body='+body;
	alert(mailtoLink)
    // 메일 클라이언트 열기
    window.location.href = mailtoLink;
}
