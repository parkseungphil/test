$(document).ready(function(){
	// Carousel auto-slide interval
	$('#keyVisual').carousel({
		interval: 5000 // Change slide every 5 seconds
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
	
	$('#btnEmail').on('click', function(e) {
		e.preventDefault(); // 기본 폼 제출 방지

		// 폼 데이터에서 값 추출
		const name = $('#userName').val();
		const email = $('#userEmail').val();
		const phone = $('#userPhone').val();
		const message = $('#inquiryDetails').val();

		// 필수 입력 검증
		if (!name) {
			alert("이름은 필수입력사항입니다.");
			$('#userName').focus();
			return;
		}
		if (!phone) {
			alert("연락처는 필수입력사항입니다.");
			$('#userPhone').focus();
			return;
		}
		if (!message) {
			alert("문의내용은 필수입력사항입니다.");
			$('#inquiryDetails').focus();
			return;
		}

		// 이메일 제목과 본문 구성
		const subject = '견적 문의 - '+name;
		//const body = '이름: '+name+'\n이메일: '+email+'\n전화번호: '+phone+'\n문의 내용:\n'+message+'';

		// 버튼 비활성화
		$('#btnEmail').prop('disabled', true);
		//clean24abc@naver.com
		fetch('https://formsubmit.co/ajax/clean24abc@naver.com', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				name: $('#userName').val(),
				email: $('#userEmail').val(),
				phone: $('#userPhone').val(),
				message: $('#inquiryDetails').val(),
				_captcha: 'false',
				_subject: subject
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
			alert('메일이 성공적으로 발송되었습니다. 감사합니다!');
			document.getElementById('quoteForm').reset();
		})
		.catch(error => {
			console.error('Error:', error);
			alert('메일 발송에 실패했습니다. 다시 시도해주세요.');
		})
		.finally(() => {
			$('#btnEmail').prop('disabled', false);
			$('#estimateModal').modal('hide');
		});
	});
	
});

