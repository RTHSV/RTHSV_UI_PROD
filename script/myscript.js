var contextPathStud = "https://69txog4rl8.execute-api.ap-south-1.amazonaws.com/dev/S/";
var slideIndex = 0;
var timeoutvar;

function showSlides() {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) { slideIndex = 1 }
	if (slideIndex == 0) { slideIndex = slides.length }
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" w3-white", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " w3-white";
	timeoutvar = setTimeout(showSlides, 2000); // Change image every 2 seconds
}
function plusImage(index) {
	stopSlideShow();
	slideIndex = parseInt(index) + parseInt(slideIndex) - 1;
	showSlides();
}
function slidePosition(index) {
	stopSlideShow();
	slideIndex = parseInt(index)- 1;
	showSlides();
}
function stopSlideShow() {
	clearTimeout(timeoutvar);
}
/*
function getAllActiveNotices(){
	var jsonStr = '{"className":"'+$("#className").val()+'","token":"'+sessionStorage.getItem("rthsv_token")+'"}';
	$.ajax({
	  type: 'POST',
	  data: jsonStr,
	  url: contextPathStud +"getAllActiveNotices",
	  success: function (response1) { 
			createStudentDetailsTable(response1);
			$(obj).attr('disabled',false);
			$(obj).val('Fetch Student Data');
		},
	  error : function (response) { 
			alert("Error while fetching StudentData");
			validateFail(response);
			}
	});	
}*/
var noticeList;
function getAllActiveNotices() {
	$("#noticePleasewait").show();
	$("#noticeHeader").hide();
	$.ajax({
		type: 'POST',
		url: contextPathStud + "getAllActiveNotices",
		success: function (response1) {
			noticeList = response1;
			$("#noticePleasewait").hide();
			$("#noticeHeader").show();
			displayNoticeData($("#common"));
			console.log(noticeList);
		},
		error: function (response) {
			alert("Error while getting Notices Data.Please try after some time");
		}
	});
	return false;
}

$(function (event) {
	$('#common').click(function () {
		displayNoticeData($(this));
	});
	$('#FYJC_Science').click(function () {
		displayNoticeData($(this));
	});
	$('#SYJC_Science').click(function () {
		displayNoticeData($(this));
	});
	$('#FYJC_Commerce').click(function () {
		displayNoticeData($(this));
	});
	$('#SYJC_Commerce').click(function () {
		displayNoticeData($(this));
	});
	$('#Non-Teaching_Staff').click(function () {
		displayNoticeData($(this));
	});
	$('#Teaching_Staff').click(function () {
		displayNoticeData($(this));
	});
});

function displayNoticeData(obj) {
	var isNotice = 1;
	var notCnt = 0;	
	//$("#leftPanelUL li").removeClass('active');
	//$(obj).parent().addClass("active");
	//$("#classType").html($(obj).html().trim().substr(27).trim());
	$("#noticeDisplay").html("");
	$(noticeList).each(function (i, notice) {
		if ($(obj).attr('id') == $(notice).attr('classFor')) {
			$("#classType").html($(notice).attr('noticeSub'));
			if (isNotice == 1) {
				$("#noticeDisplay").html("<div class='loader' style='margin-top:70px'></div>");
			}
			isNotice = 2;
			$.ajax({
				type: 'POST',
				data: '{"path":"' + $(notice).attr('s3Path') + '"}',
				url: contextPathStud + "downloadNotice",
				success: function (response1) {
					$("#noticeDisplay").find(".loader").remove();
					$("#noticeDisplay").append('<div class="wm-typo-title"><h5>'+(++notCnt)+'. Subject : <span>'+$(notice).attr('noticeSub')+'</span></h5></div>');
					if(sessionStorage.getItem('appview') == 'true'){
						$("#noticeDisplay").append("<input type='button' class='btn-result' value='Download Notice for "+$(notice).attr('noticeSub')+"' data-respone="+response1+" onclick='return downloadNoticeApp(this)'><br><br>");
					}else{
						$("#noticeDisplay").append("<iframe width='100%' style='margin-bottom: 60px;' height='100%' src='data:application/pdf;base64, " + response1 + "'></iframe>");
					}
				},
				error: function (response) {
					alert("Error while download data");
				}
			});

		}
	});
	if (isNotice == 1)
		$("#noticeDisplay").html("<h1 class=\"text-center\"> No Notice is available </h1>");
	return false;
}

function downloadNoticeApp(obj){
	const linkSource = "data:application/pdf;base64,"+$(obj).attr('data-respone');
	const downloadLink = document.createElement("a");
	const fileName = "abc.pdf";
	downloadLink.href = linkSource;
	downloadLink.download = fileName;
	downloadLink.click();﻿
	
}

function viewStudentResult(obj) {
	emptyResult();
	if ($("#seatNo").val() == "") {
		alert("Please enter valid Seat No");
	} else {
		$(obj).attr('disabled', true);
		$(obj).val('Please Wait ....');
		$.ajax({
			type: 'POST',
			data: '{"seatNo":"' + $("#seatNo").val() + '"}',
			url: contextPathStud + "getStudentResult",
			success: function (respone1) {
				$("#resultSection").show();
				$(obj).attr('disabled', false);
				$(obj).val('View Results');
				$('#lblCandName').html($(respone1).attr('studName'));
				$('#lblStCls').html($(respone1).attr('classFor'));
				$('#lblGrd').html($(respone1).attr('passingClass'));
				$('#lblSeatNo').html($(respone1).attr('seatNo'));
				$('#lblRes').html($(respone1).attr('result'));
			},
			error: function (response) {
				alert("No Record Found! Please enter valid Seat No.");
				$(obj).attr('disabled', false);
				$(obj).val('View Results');
			}
		});
	}
}

function emptyResult() {
	$('#lblCandName').html('');
	$('#lblStCls').html('');
	$('#lblGrd').html('');
	$('#lblSeatNo').html('');
	$('#lblRes').html('');
}
function sendTalkToUsmsg(obj){
	if($("#fname").val().trim() == ""){
		alert("Please enter Name");
		$("#fname").focus();
		return false;
	}
	if($("#emailid").val().trim() == ""){
		alert("Please enter Email Id");
		$("#emailid").focus();
		return false;
	}if($("#phoneno").val().trim() == ""){
		alert("Please enter Phone no");
		$("#phoneno").focus();
		return false;
	}if($("#message").val().trim() == ""){
		alert("Please enter message");
		$("#message").focus();
		return false;
	}
		$(obj).attr('disabled', true);
		$(obj).val('Please Wait ....');
		var map = {};
		map["name"]=$("#fname").val().trim();
		map["emailid"]=$("#emailid").val().trim();
		map["phoneno"]=$("#phoneno").val().trim();
		map["message"]=$("#message").val().trim();
		$.ajax({
			type: 'POST',
			data: JSON.stringify(map),
			url: contextPathStud + "contactusdata",
			success: function (response1) {
				alert(response1);
				location.reload();				
			},
			error: function (response) {
				alert("Error occur while processing your request. Please contact admin");
				$(obj).attr('disabled', false);
				$(obj).val('Send Message');
			}
		});
}
var validation = {
    isEmailAddress:function(str) {
        var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
   
};
function subscribeNewsLetter(obj){	
	if (!validation.isEmailAddress($("#newsLetterEmailID").val().trim())) {
		alert("Please Enter valid Email ID");
		$("#newsLetterEmailID").focus();
		return false;
	}	
	$(obj).attr('disabled', true);
	$(obj).val('Please Wait ....');
	$.ajax({
		type: 'POST',
		data: '{"emailID":"' + $("#newsLetterEmailID").val().trim() + '"}',
		url: contextPathStud + "newsLetterSubscription",
		success: function (response1) {
			alert(response1);
			$("#newsLetterEmailID").val('');
			$(obj).attr('disabled', false);
			$(obj).val('Subscribe to our newsletter');			
		},
		error: function (response) {
			alert("Error occur while processing your request. Please contact admin");
			$(obj).attr('disabled', false);
			$(obj).val('Subscribe to our newsletter');
		}
	});
	return false;
}
function showPaymentinfo(){
	try{
		var jsonData = JSON.parse(atob(location.search.substr(1)));
		$.each(jsonData, function(key, val) {
			if(key == 'Payment Status' && val == 'failure'){
				$("#dwnid").remove();
			}else if(key == 'Transaction ID'){
				$("#dwnid").attr('data-id',val)
			}
		  $("#paymentInfo").append('<div class="wm-article">'+
				'<ul>'+
					'<li class="wm-profile-start">'+
						'<div class="wm-profile-detail-info">'+
							'<h6><a href="#">'+key+'</a></h6>'+
						'</div>'+
					'</li>'+
					'<li>'+val+'</li>'+
				'</ul>'+
			'</div>');
		});
	}catch(err) {
		alert("Your Session has been expire.");
		location.href="index.html";
	}
}
function downloadPayInvoice(obj){
	$(obj).attr('disabled', true);
	$(obj).val('Please Wait ....');
	$.ajax({
		type: 'POST',
		data: '{"id":"' + $(obj).attr('data-id') + '"}',
		url: contextPathStud + "downloadInvoice",
		success: function (response1) {
			if (response1.startsWith("Sorry!")) {
				alert(response1);				
			}else{
				const linkSource = "data:application/pdf;base64,"+response1.replaceAll('"','');
				const downloadLink = document.createElement("a");
				const fileName = "RTHSV_Invoice_"+$(obj).attr('data-id')+".pdf";
				downloadLink.href = linkSource;
				downloadLink.download = fileName;
				downloadLink.click();﻿			
				$(obj).attr('disabled', false);
				$(obj).val('Download Invoice');	
			}			
		},
		error: function (response) {
			alert("Error occur while processing your request. Please contact admin");
			$(obj).attr('disabled', false);
			$(obj).val('Download Invoice');
		}
	});
	return false;
}	
