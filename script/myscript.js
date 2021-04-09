var contextPathStud = "https://69txog4rl8.execute-api.ap-south-1.amazonaws.com/dev/S/";
var slideIndex = 0;
var timeoutvar;
var inner = document.getElementById("inner");
var imgpt = inner == null ? "." : "..";

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
var validation2 = {
    isEmailAddress:function(str) {
        var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
   
};
function subscribeNewsLetter(obj){	
	if (!validation2.isEmailAddress($("#newsLetterEmailID").val().trim())) {
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
function initLData(){
	$.getJSON('https://ipapi.co/json/', function(data) {
		var f = "IP:"+$(data).attr("ip")+", City:"+$(data).attr("city")+", Region:"+$(data).attr("region")+", Country:"+$(data).attr("country_name")+", postal:"+$(data).attr("postal")+", latitude:"+$(data).attr("latitude")+", longitude:"+$(data).attr("longitude")+", org:"+$(data).attr("org");
		$("#otherVal").val(btoa(f));
	});
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
					'<li style="width:40%">'+val+'</li>'+
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
			}			
			$(obj).attr('disabled', false);
			$(obj).val('Download Invoice');
		},
		error: function (response) {
			alert("Error occur while processing your request. Please contact admin");
			$(obj).attr('disabled', false);
			$(obj).val('Download Invoice');
		}
	});
	return false;
}	
function closeStudentPopUp() {
	$("#confirmModal").modal('hide');
}
function processToPaymentGateway(obj){
	$("#amount").val(parseFloat($("#amount").val()).toFixed(2));
	$(obj).attr('disabled', true);
	$(obj).val('Please Wait ....');
	$("#cancelPay").remove();
	$(".loader").show();
	$("#notesmg").show();
	$.ajax({
		type: 'POST',
		url:  contextPathStud + "processToPaymentGateway",
		data: JSON.stringify(getFormData($("#paymentForm"))),
		success: function (response) {
			$("#responseid").html(response);
		},
		error: function (response) {
			alert("Error while Processing Payment request "+response);	
			location.reload();
		}
	});
}
function confirmPaymentData() {		
	if (!(validation.isCharacter($("#firstname").val()))) {
		alert("Please Enter valid First Name");
		$("#firstname").focus();
		return false;
	}
	else if (!(validation.isDecimal($("#amount").val()))) {
		alert("Please Enter valid Amount to Pay");
		$("#amount").focus();
		return false;
	}
	else if (!(validation.isNumber($("#phone").val()) && $("#phone").val().length == 10)) {
		alert("Please Enter valid Mobile No");
		$("#phone").focus();
		return false;
	}
	 else if (!validation.isEmailAddress($("#email").val())) {
		alert("Please Enter valid Email ID");
		$("#email").focus();
		return false;
	} 
	$("#confirmModal").modal("show");
	initLData();
}

function initTestimonialData(){
	var mainMap = {};
	
	var userMap = {};
	userMap["name"]="Snehal K Salunkhe";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2018-2019";
	userMap["content"]="Hello! I am Snehal K. Salunkhe, I have completed my B. Tech Biotechnology in the past year. Currently, I am planning for a Master's in Science in Germany. Seven years ago, I took one of the good decisions of my life, that is to take admission in RTHSV. Initially, I was struggling to adjust myself to the environment and developing a perpetual relationship with my professors. My journey over these two years has been amazing. During my school times, I struggled a lot with my active participation in various events, having a good interaction with my school folks as well as getting good grades. The two years of my academic life in this institution have given rise to a lot of positive changes as a person. The professors have been so understanding and cooperative with me.For the present and incoming students, I will recommend this institution in terms of various factors such as the brilliant staff, amazing infrastructure, numerous facilities.";
	mainMap["1"]=userMap;
	
	var userMap = {};
	userMap["name"]="Rafat Karbhari";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2018-2019";
	userMap["content"]="The Teacher are well qualified and fair in there work, The college impose strict rules on both faculty and student to maintain uniformity and discpline, Also college maintain balance between the acadeny and extracurricular activities, which makes student easy.";
	mainMap["2"]=userMap;
	
	var userMap = {};
	userMap["name"]="Tisha";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2017-2018";
	userMap["content"]="Best College, they motivates students not only to excel in studies but also in gaming and other cultural activities and is favorable for any kind of students to get easy accustomed, disciplined through friendly environment.Teachers are very cooperative in nature.";
	mainMap["3"]=userMap;
	
	var userMap = {};
	userMap["name"]="Shamila ";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2017-2018";
	userMap["content"]="The College is placed where you will get best education.This help me to develop my skills and education content";
	mainMap["4"]=userMap;
	
	$.each(mainMap, function(key, value) {   
		$("#testimonialContent").append('<div class="wm-thumb-testimonial-layer">'+
			'<figure><a href="javascript:void(0);"><img src="'+imgpt+'/images/testimonial/'+key+'.jpg" alt=""></a>'+
			'</figure>'+
			'<div class="thumb-testimonial-text">'+
				'<h4><a href="javascript:void(0);">'+value["name"]+'</a></h4>'+
				'<span class="wm-color-two">'+value["batch"]+'</span>'+
				'<p>'+value["content"]+'</p>'+
			'</div>'+
		'</div>');
	});
}

function initFAQ(){
	var map={};
	map["What is the timing of the college?"]="The timing of the college is 11pm to 5pm.";
	map["Is the college bus facility available?"]="No";
	map["Is offline admission available in the college?"]="No";
	map["Whether the college is CBSE or State Board?"]="State Board.";
	map["Do students in college have uniforms?"]="Yes";
	map["Does college have Information Technology Subject in college?"]="Yes";
	map["Can I take I.T. subject? Is there any surety of getting I.T. subject?"]="Yes, you can take I.T. subject but there is no surety as students who come in merit list will only get I.T. subject.";
	map["What are the documents to be attached with admission form for state board students?"]="1.Online generated form no1 and form no2,<br>2. Admission form,<br>3. 3 photos,<br>4. X mark sheet (original) with 3 Xerox copies,<br>5. X leaving certificate (original) with 3 Xerox, <br>6. 3 Xerox of Aadhar Card, and <br>7. 3 Caste certificate Xerox ";
	map["What are the documents to be attached with admission form for CBSE and ICSE board students?"]="1.Online generated form no1 and form no2,<br>2. Admission form, <br>3.Passport size photos 3, <br>4. X mark sheet (original) with 3 Xerox copies, <br>5. X leaving certificate (original) with 3 Xerox,  <br>6. 3 Xerox of Aadhar Card, <br>7.3 Caste certificate Xerox and<br>8. Migration certificate (original) and 2 Xerox.<br>";
	map["Can we change subjects later?"]="No. Subjects once selected cannot be changed.";
	
	var i=0;
	$.each(map, function(key, value) {  
		i++;
		$("#accordion").append('<div class="panel panel-default">'+
			'<div class="panel-heading" role="tab" id="heading'+i+'">'+
				'<h4 class="panel-title">'+
					'<a role="button" data-toggle="collapse"'+
						'data-parent="#accordion" href="#collapse'+i+'"'+
						'aria-expanded="true" aria-controls=" collapse'+i+'">'+key+'</a>'+
				'</h4>'+
			'</div>'+
			'<div id="collapse'+i+'" class="panel-collapse collapse in"'+
				'role="tabpanel" aria-labelledby="heading'+i+'">'+
				'<div class="panel-body">'+value+'</div>'+
			'</div>'+
		'</div>');
	});
}
function initLabImg(){
	for(var i =1;i<=26;i++){
		 $("#labimg").append('<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/images/lab/large/'+i+'.JPG"><img src="'+imgpt+'/images/lab/small/'+i+'.JPG" alt="" ></a></li>');
	}
}
function initLabImgMobile(){
	for(var i =1;i<=26;i++){
		 $("#labimg").append('<div class="wm-thumb-testimonial-layer">'+
			'<figure><a href="javascript:void(0);"><img src="'+imgpt+'/images/lab/large/'+i+'.JPG"" style="margin-bottom: 27px;"></a></figure>'+
			'</div>');
	}
}

function generateEventMap(){
	var map={}
	map["Gurupurnima"]="Gurupurnima Event,2018-19#8,2019-20#10";
	map["TeachersDay"]="Teachers Day,2016-17#6,2017-18#5,2018-19#33,2019-20#62";
	map["TraditionalDay"]="Traditional Day,2016-17#4,2018-19#36";
	map["YogaDay"]="Yoga Day,2017-18#5,2018-19#28";
	map["AnnualDay"]="Annual Day,2016-17#2,2017-18#7";
	map["OrientationDay"]="Orientation Day,2018-19#1,2019-20#27";
	map["PriceDistrubition"]="Price Distrubition,2016-17#8,2017-18#8";
	map["Rakhi"]="Rakhi Competation,2018-19#10";
	map["Other"]="Other Event,2016-17#2,2017-18#9,2018-19#8";
	return map;
}

function initEvents(){
	var map = generateEventMap();	
	$.each(map, function(key, value) { 
	value=value.split(",")
		$("#eventsid").append('<li class="col-md-4">'+
			'<figure>'+
				'<a href="events.html?'+key+'">'+
				'<img style="height:180px" src="'+imgpt+'/images/events/'+key+'.jpg"  alt="'+key+'" title="'+key+'"></a>'+
			'</figure>'+
			'<div class="wm-newsgrid-text">'+
				'<h5><a href="javascript:void(0);" class="wm-color" alt="'+key+'" title="'+key+'">'+value[0]+'</a></h5>'+
				'<a class="wm-banner-btn" href="events.html?'+key+'" alt="View more" title="View more">View more</a>'+
			'</div>'+
		'</li>');
	});	
}
function initEventsDetails(){
	var map = generateEventMap();
	var s = window.location.search;
	var key = s.substr(1,s.length);
	var mapData = map[key];
	var value=mapData.split(",");
	$(".eventName").html(value[0]);
	
	for(var i=1;i<value.length;i++){
	var val2 = value[i].split("#");	
	var data = '<div class="wm-title-typoelements wm-detail-editore">'+
		'<h2>'+value[0]+'&nbsp;<span>'+val2[0]+'</span></h2>'+
	'</div>'+
	'<div class="widget widget_gallery col-md-12">'+
		'<ul class="gallery" id="labimg">';			
			for(var j=1;j<=parseInt(val2[1]);j++){
				data = data +'<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/images/events/'+val2[0]+'/'+key+'/'+j+'.jpg"><img src="'+imgpt+'/images/events/'+val2[0]+'/'+key+'/'+j+'.jpg"></a></li>';
			}
		data + '</ul></div>';
		$("#eventsData").append(data);
	}		
}
function initEventsDetailsMobile(){
	var map = generateEventMap();
	var s = window.location.search;
	var key = s.substr(1,s.length);
	var mapData = map[key];
	var value=mapData.split(",");
	$(".eventName").html(value[0]);
	
	for(var i=1;i<value.length;i++){
	var val2 = value[i].split("#");	
	var data = '<div class="wm-title-typoelements wm-detail-editore">'+
		'<h2>'+value[0]+'&nbsp;<span>'+val2[0]+'</span></h2>'+
	'</div>'+
	'<div class="widget widget_gallery col-md-12">'+
		'<ul class="wm-thumb-testimonial" id="labimg">';			
			for(var j=1;j<=parseInt(val2[1]);j++){
				
				data = data + '<div class="wm-thumb-testimonial-layer">'+
			'<figure><a href="javascript:void(0);"><img src="'+imgpt+'/images/events/'+val2[0]+'/'+key+'/'+j+'.jpg" style="margin-bottom: 27px;"></a></figure>'+
			'</div>';
				
			}
		data + '</ul></div>';
		$("#eventsData").append(data);
	}
	
	
	
}