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
		dots[i].className = dots[i].className.replace(" active1", "");
	}
	slides[slideIndex - 1].style.display = "contents";
	dots[slideIndex - 1].className += " active1";
	timeoutvar = setTimeout(showSlides, 2000); // Change image every 2 seconds
}
function plusImage(index) {
	stopSlideShow();
	slideIndex = parseInt(index) + parseInt(slideIndex) - 1;
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
	$.ajax({
		type: 'POST',
		url: contextPathStud + "getAllActiveNotices",
		success: function (response1) {
			noticeList = response1;
			displayNoticeData($("#common"));
			console.log(noticeList);
		},
		error: function (response) {
			alert("Error while download data");
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