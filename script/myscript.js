var contextPathStud = "https://lk4f5mh0d0.execute-api.ap-south-1.amazonaws.com/dev/S/";
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
	timeoutvar = setTimeout(showSlides, 6000); // Change image every 2 seconds
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
var timeoutvar2;
var slideIndex2 = 0;
function showSlides2() {
	var i;
	var slides2 = document.getElementsByClassName("mySlides2");
	var dots = document.getElementsByClassName("dot2");
	for (i = 0; i < slides2.length; i++) {
		slides2[i].style.display = "none";
	}
	slideIndex2++;
	if (slideIndex2 > slides2.length) { slideIndex2 = 1 }
	if (slideIndex2 == 0) { slideIndex2 = slides2.length }
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" w3-white", "");
	}
	slides2[slideIndex2 - 1].style.display = "block";
	dots[slideIndex2 - 1].className += " w3-white";
	timeoutvar2 = setTimeout(showSlides2, 5000); // Change image every 2 seconds
}
function plusImage2(index) {
	stopSlideShow2();
	slideIndex2 = parseInt(index) + parseInt(slideIndex2) - 1;
	showSlides2();
}
function slidePosition2(index) {
	stopSlideShow2();
	slideIndex2 = parseInt(index)- 1;
	showSlides2();
}
function stopSlideShow2() {
	clearTimeout(timeoutvar2);
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
	userMap["name"]="Prerena Bhosale";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2017-2018";
	userMap["content"]="Being a student at J.B.S.P Sanstha’s ‘Ramsheth Thakur Higher Secondary Vidyalaya, Kharghar’ has been a surreal experience. Almost two years that I spent in this campus as a Science student, I learnt so many things not only through academics but also through extra-curricular activities like dance, sports etc. We get an opportunity to apply academic skills in a real-world context. My two year journey in this college made me a more confident, self-dependent person ready to take on any challenges with a smile. The credit goes to all the teachers and the Principal of this institution. Teachers played the role of being a second mother and this college was no less than a second home for us.The infrastructure  and the ambience available to the students is mind blowing. Well-equipped labs, exhaustive library, hygienic canteen and the natural beauty surrounding the campus motivates one to seek more knowledge.";
	mainMap["2"]=userMap;
	
	var userMap = {};
	userMap["name"]="Tisha Shriyan";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2017-2018";
	userMap["content"]="Best College, they motivates students not only to excel in studies but also in gaming and other cultural activities and is favorable for any kind of students to get easy accustomed, disciplined through friendly environment.Teachers are very cooperative in nature.This place has done that to me and I am very sure that anyone who comes to this place will be a different and a better individual once they leave the gates for good.";
	mainMap["3"]=userMap;
	
	var userMap = {};
	userMap["name"]="Shamila Hamdulay";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2017-2018";
	userMap["content"]="A college is a place where pebbles are polished and diamonds are dimmed. The function of education is to teach one to think critically and my college Ramsheth Thakur Higher Secondary Vidyalaya did the same along with developing intelligence and character. The positive atmosphere in the college is what used to drive us to come to college to learn new concepts and participate in all the activities. I still remember the words of my class teacher on the last day of the college ’No matter what you become in life, what profession you pursue, always ensure that you become a good human being first’. All I can say is that things end but memories last forever, because now it’s not just college but now we are family whose roots cannot be separated. ";
	mainMap["4"]=userMap;
	
	var userMap = {};
	userMap["name"]="Rafat Karbhari";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2018-2019";
	userMap["content"]="The Teacher are well qualified and fair in there work, The college impose strict rules on both faculty and student to maintain uniformity and discpline, Also college maintain balance between the acadeny and extracurricular activities, which makes student easy.The Infrastructure of this campus is mind-blowing.The practical labs are well equipped.The library offers you many options.And the memories in the canteen will always remind you this place.One more point to add is natural beauty surrounding the campus is mesmerizing.";
	mainMap["5"]=userMap;
	
	var userMap = {};
	userMap["name"]="Mariyam ";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2017-2018";
	userMap["content"]="Being a student at J.B.S.P Sanstha's 'Ramsheth Thakur Higher Secondary Vidyalaya,Kharghar' has been a surreal experience.Almost two years I spent in this campus as a Science student.I learned so many things here.There's been not only academics but also extra-curricular activities like dancing,singing, sports,elocution,placard,rangoli,mehendi, greeting cards and many more.And I realised that after,at the end of this journey I was completely different person,more confident,self-dependent,able to do things on my own,able to face the World,take on challenges and always smile.The whole staff of teachers and even our Principal played major role in this journey. Teachers over here are really amazing. They are like second mother.And it was not only a college,it was our second home with many caring mothers.";
	mainMap["6"]=userMap;
	
	var userMap = {};
	userMap["name"]="Kashmiri";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2017-2018";
	userMap["content"]="My Two Years at Ramseth Thakur College have been Excellent and a memory to cherish for a lifetime. All Teachers and staff are professional, Helpul,kind and friendly. Yes i said friendly because my Teachers have Taught me lessons not only from the Books, but also from LIFE. That if we Face any Hard phase then how we should conquer it, I took Admission  and to be honest have learnt perfect things at correct age,I Took Science Stream, but You also have an Option of choosing Commerce too ";
	mainMap["7"]=userMap;
	
	var userMap = {};
	userMap["name"]="Rahul Suryavanshi";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2017-2018";
	userMap["content"]="College environment for study purpose is really excellent they have well equipped lab for all necessary subject the teaching staff is really supportive and helpful in case students find any difficulty non teaching staff is also really co-operative in all the activities";
	mainMap["8"]=userMap;
	
	var userMap = {};
	userMap["name"]="Shruti Telawane";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2018-2020";
	userMap["content"]="I'm from Kharghar and I had studied in Ramsheth Thakur College of Commerce and Science from 2018-20. It's a great place for students. All the teachers and staffs are friendly and helpful. 2 years in RTHSV College not only teaches us our syllabus but also helps us in various activities such as social, cultural, etc. All the labs and their respective lab assistant are too good even the college has such a big ground for sports activities. I along with my friends enjoyed a lot studying in RTHSV College,Kharghar.";
	mainMap["9"]=userMap;
	
	var userMap = {};
	userMap["name"]="Rachana Hiwale";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2018-2020";
	userMap["content"]="I Miss. Rachana Hiwale would like to express my gratitude towards my college and teachers for helping me achieving my score. There were so many things about my time at the college, including how fantastically knowledgeable my teachers were. Not only academic but also lots of different activities on campus allowed me enhance my talent and have an overall development. Ramsheth Thakur college helped me grow career-wise but i have also gained values and memories, I will cherish for life.";
	mainMap["10"]=userMap;
	
	var userMap = {};
	userMap["name"]="Sachin Patil";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2018-2020";
	userMap["content"]="My Two years at RTHSV College were great and a memory to cherish for lifetime.Here the Atmosphere is full of motivation and innovation. All the faculties are enthusiastic and always ready to help. It was full of learning and grooming oneself. Overall it was a great experience and lifetime memory at RTHSV college.";
	mainMap["11"]=userMap;
	
	var userMap = {};
	userMap["name"]="Omkar Tapshale";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2018-2020";
	userMap["content"]="My two years at Ramsheth Thakur Higher Secondary Vidyalaya has been an excellent journey and a memory to cherish for a life time. All teachers and staff are professional, helpful, kind and friendly. Yes, I said friendly because my teachers have taught me lessons not only from the books, but also from Life. Life is full of ups and downs but how we should face hardships and grow strong is what I learnt here. I took admission for science stream in this college and I feel that it was the right decision taken at the right time.";
	mainMap["12"]=userMap;
	
	var userMap = {};
	userMap["name"]="Kaustubh Anil Mundhe";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2016-2017";
	userMap["content"]="My Institute, My Teacher and My Friends were  three Important pillars of my junior college life. My Institute gave me opportunity to excel in  sports (volleyball),  studies & competition About my  Teachers: I was an average student. They help me a lot in that two years (The best friendly Teachers of my life.) I was not good in physics . But I learnt to learn the subject in an interesting way that later proved to be top scoring subject for me. ";
	mainMap["13"]=userMap;
	
	var userMap = {};
	userMap["name"]="Gurudatt";
	userMap["batch"]="&nbsp;&nbsp;- Batch 2016-2017";
	userMap["content"]="I found here, the most experienced and supporting teachers. I got ample opportunities to develop my confidence which kept me motivated and helped me get good grades. My Journey in this college lead me to take right decision for my career.";
	mainMap["14"]=userMap;
	
	$.each(mainMap, function(key, value) {   
		$("#testimonialContent").append('<div class="wm-thumb-testimonial-layer">'+
			'<figure><a href="javascript:void(0);"><img src="'+imgpt+'/images/testimonial/'+key+'.jpg" alt=""></a>'+
			'</figure>'+
			'<div class="thumb-testimonial-text">'+
				'<h4><a href="javascript:void(0);">'+value["name"]+'</a></h4>'+
				//'<span class="wm-color-two">'+value["batch"]+'</span>'+
				'<span class="wm-color-two"></span>'+
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
	var s = window.location.search;
	var key = s.substr(1,s.length);
	$(".type").html(key);
	for(var i =1;i<=26;i++){
		 $("#labimg").append('<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/images/lab/'+key+'/large/'+i+'.JPG"><img src="'+imgpt+'/images/lab/'+key+'/small/'+i+'.JPG" alt="" ></a></li>');
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
	map["Gurupurnima"]="Gurupurnima Event,2019-20#10,2018-19#8";
	map["TeachersDay"]="Teachers Day,2019-20#61,2018-19#23,2017-18#3,2016-17#6";
	map["TraditionalDay"]="Traditional Day,2018-19#34,2016-17#4";
	map["YogaDay"]="Yoga Day,2021-22#24,2018-19#28,2017-18#5";
	map["AnnualDay"]="Annual Day,2017-18#7,2016-17#2";
	map["OrientationDay"]="Orientation Day,2019-20#27,2018-19#1";
	map["PriceDistrubition"]="Prize Distribution,2017-18#8,2016-17#8";
	map["Rakhi"]="Rakhi Competition,2018-19#3";
	map["VachanDay"]="Vachan Day,2021-22#16";
	map["Other"]="Other Event,2018-19#8,2017-18#7,2016-17#2";
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
function initNotificationMessage(){
	$("#wait").show();
	$.ajax({
		type: 'POST',
		url: contextPathStud + "getAllNotification",
		success: function (response1) {
			$(response1).each(function(i,obj){				
				$("#notifiMsg").append('<li class="col-md-12">'+
					'<div class="wm-event-medium-wrap">'+
						'<div class="wm-eventmedium-text" style="padding: 0px 0px 0px 0px;">'+
							'<h5><a href="#" style="color:green">'+$(obj).attr('title')+' : '+$(obj).attr('dateTime')+'</a></h5>'+
							'<p>'+$(obj).attr('message')+'.</p>'+
						'</div>'+
					'</div>'+
				'</li>');						
			});	
			$("#wait").hide();			
		},
		error: function (response) {
			alert("Error while getting Notices Data.Please try after some time");
		}
	});
	return false;
	
	
}