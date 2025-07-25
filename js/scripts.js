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
		// 견적문의 폼 데이터를 받아 메일 클라이언트를 여는 함수
		
		
		
		

		// 폼 데이터에서 값 추출
		const name    = $('#userName').val();
		const email   = $('#userEmail').val();
		const phone   = $('#userPhone').val();
		const message = $('#inquiryDetails').val();
		
		if ( name == "") {
			alert("이름은 필수입력사항입니다.");
			$('#userName').focus();
			return;
		}
		if ( phone == "") {
			alert("연락처는 필수입력사항입니다.");
			$('#userPhone').focus();
			return;
		}
		if ( message == "") {
			alert("문의내용은 필수입력사항입니다.");
			$('#inquiryDetails').focus();
			return;
		}
		// 이메일 제목과 본문 구성
		const subject = '견적 문의 - '+name
		const body = 
			'이름: '+name+'\n' +
			'이메일: '+email+'\n' +
			'전화번호: '+phone+'\n' +
			'문의 내용:\n'+message
		

		$('#_subject').val(subject);
		$('#message').val(body);
		$('#email').val(email);
		$('#name').val(name);
		console.log($('#_subject').val())
		console.log($('#message').val())
		console.log($('#email').val())
		
		const form = document.getElementById('quoteForm');
		const formData = new FormData(form);
		
		$('#btnEmail').attr("disable", true)
		fetch(form.action, {
			method: 'POST',
			body: formData,
			headers: {
				'Accept': 'application/json' // JSON 응답을 받기 위해 헤더 설정
			}
		})
		.then(response => {
			// 4. 서버로부터 응답을 받습니다.
			if (response.ok) {
				return response.json(); // 응답이 정상이면 JSON으로 변환
			}
			throw new Error('네트워크 응답이 올바르지 않습니다.');
		})
		.then(data => {
			// 5. 성공적으로 처리된 경우
			console.log('Success:', data);
			alert('메일이 성공적으로 발송되었습니다. 감사합니다!');
			form.reset(); // 폼 초기화
		})
		.catch(error => {
			// 6. 에러가 발생한 경우
			console.error('Error:', error);
			alert('메일 발송에 실패했습니다. 다시 시도해주세요.');
		})
		.finally(() => {
			$('#estimateModal').modal('hide'); // Close modal

		});
	});
	
});

