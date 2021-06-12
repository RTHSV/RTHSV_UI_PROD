var inner = document.getElementById("inner");
var imgpt = inner == null ? "." : "..";
const head = 'Janardan Bhagat Shikshan Prasarak Sanstha&acute;s';
const title='Ramsheth Thakur Higher Secondary Vidyalay,Kharghar (Commerce &amp; Science)';
const menus =[{name:'Home',link:'/index.html',active:''},
              {name:'Admission',link:'/admission.html',active:''},
              {name:'Student Info',link:'',active:'',hasChild:true},
              {name:'Notices',link:'/Notices.html',active:''},
              {name:'Exam Result',link:'/ExamResult.html',active:''},
              {name:'Contact Us',link:'/contact-us.html',active:''},
              {name:'About Us',link:'',active:'',hasChild:true},
              {name:'About College',link:'/about-us.html',active:''},
              {name:'Our Inspiration',link:'/our-inspiration.html',active:''},
              {name:'Board Of Executive',link:'/board-of-executive.html',active:''},
              {name:'Rules Page',link:'/rules-page.html',active:''},
              {name:'FAQs',link:'/faq-page.html',active:''}]; 

var isAdmin = false;
if(window.location.href.indexOf('/admin')!=-1) {
    isAdmin = true;
}

var socialIcons = '<div class="social-icon-bar nonAppviewClass">';
socialIcons +='<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://rthsv.com" class="fb"><i class="fa fa-facebook"></i></a>';
socialIcons +='<a target="_blank" href="http://twitter.com/share?text=https://rthsv.com Best college in Navi-Mumbai&amp;url=https://rthsv.com/&amp;hashtags=College,Navi-Mumbai" class="tw"><i class="fa fa-twitter"></i></a>';
socialIcons +='<a target="_blank" href="https://api.whatsapp.com/send?phone=+919766628471&amp;text=Hi" class="go"><i class="fa fa-whatsapp"></i></a>';
socialIcons +='<a target="_blank" href="https://play.google.com/store/apps/details?id=com.rthsv" class="li"><i class="fa fa-play"></i></a>';
socialIcons +='<a target="_blank" href="mailto:principal@rthsv.com" class="yt"><i class="fa fa-envelope"></i></a>';
socialIcons +='</div>';

var webSiteMenus = '<div class="collapse navbar-collapse" id="navbar-collapse-1">'+
                        '<ul class="nav navbar-nav" id="mainmenu">'+
                            '<li class="" page="Home"><a onClick="openPage(this)" data-href="'+imgpt+'/index.html">Home</a></li>'+
                            '<li class="" page="Admission"><a onClick="openPage(this)" data-href="'+imgpt+'/admission.html">Admission</a></li>'+
                            '<li class="" page="Student Info"><a data-href="studentInfo">Student Info</a>'+
                                '<ul class="wm-dropdown-menu">'+
                                    '<li page="Notices"><a onClick="openPage(this)" data-href="'+imgpt+'/Notices.html">Notice Board</a></li>'+
                                    '<li page="Exam Result"><a onClick="openPage(this)" data-href="'+imgpt+'/ExamResult.html">Exam Results</a></li>'+
                                    '<li page="Exam Result"><a onClick="openPage(this)" data-href="'+imgpt+'/ranking.html">Student Ranking</a></li>'+
                                '</ul>'+
                            '</li>'+
							'<li class="" page="laboratory"><a onClick="openPage(this)" data-href="'+imgpt+'/lab.html">Laboratory</a></li>'+
                            '<li class="" page="About Us"><a data-href="aboutus">About Us</a>'+
                                '<ul class="wm-dropdown-menu">'+
                                    '<li page="Our Inspiration"><a onClick="openPage(this)" data-href="'+imgpt+'/our-inspiration.html">Our Inspiration</a></li>'+
                                    '<li page="Board Of Executive"><a onClick="openPage(this)" data-href="'+imgpt+'/board-of-executive.html">Board Of Executive</a></li>'+
									'<li page="Privacy Policy"><a onClick="openPage(this)" data-href="'+imgpt+'/privacypolicy.html">Privacy Policy</a></li>'+
                                '</ul>'+
                            '</li>'+
                            '<li class="" page="Rules Page"><a onClick="openPage(this)" data-href="'+imgpt+'/rules-page.html">Rules &amp; Regulations </a></li>'+
                            '<li class="" page="FAQs"><a onClick="openPage(this)" data-href="'+imgpt+'/faq-page.html">FAQ&acute;s</a></li>'+
                            '<li class="" page="Contact Us"><a onClick="openPage(this)" data-href="'+imgpt+'/contact-us.html">Contact Us</a></li>'+
                        '</ul>'+
                    '</div>';

var adminMenus = '<div class="collapse navbar-collapse" id="navbar-collapse-1">'+
                    '<ul class="nav navbar-nav" id="mainmenu">'+
                        '<li class="" page=""><a href="javascript:void(0);" data-href="managestud">Manage Student</a>'+
                            '<ul class="wm-dropdown-menu">'+
                                '<li page=""><a href="javascript:void(0);" data-href="./admin-Info.html" onclick="openPage(this)">Student Information</a></li>'+
                                '<li page=""><a href="javascript:void(0);" data-href="./admin-uploaddata.html" onclick="openPage(this)">Upload Student Info</a></li>'+
                                '<li page=""><a href="javascript:void(0);" data-href="./admin-studentresult.html" onclick="openPage(this)">Upload Student Result</a></li>'+
                            '</ul>'+
                        '</li>'+                        
                        '<li class="" page=""><a href="javascript:void(0);" data-href="notification">Notification</a>'+
							'<ul class="wm-dropdown-menu">'+
                                '<li page=""><a href="javascript:void(0);" data-href="./admin-sendNotification.html" onclick="openPage(this)">Notification to College</a></li>'+
                                '<li page=""><a href="javascript:void(0);" data-href="./admin-newslettersubscription.html" onclick="openPage(this)">Notification to News Letter</a></li>'+
								'<li page=""><a href="javascript:void(0);" data-href="./admin-smsInfo.html" onclick="openPage(this)">SMS Notification </a></li>'+
                            '</ul>'+						
						'</li>'+
                        '<li class="" page=""><a href="javascript:void(0);" data-href="./admin-uploadNotices.html" onclick="openPage(this)">Notices</a></li>'+
						'<li class="" page=""><a href="javascript:void(0);" data-href="./admin-paymentInfo.html" onclick="openPage(this)">Payment Info</a></li>'+
                        '<li class="" page=""><a href="javascript:void(0);" data-href="./admin-changepassword.html" onclick="openPage(this)">Change Password</a></li>'+
                        '<li class="" page=""><a href="./admin-login.html">Logout</a></li>'+
                    '</ul>'+
                '</div>';

var mainMenus = webSiteMenus;
if(isAdmin) {
    mainMenus = adminMenus;
}

var header = '<header id="wm-header" class="wm-header-one" style="z-index: 1 !important;position: relative;">'+
                '<div class="wm-topstrip">'+
                    '<div class="container">'+
                        '<div class="row">'+
							'<div class="col-md-1">'+
                                '<div class="top-header">'+
                                   '<img src="'+imgpt+'/images/Logo.PNG" style="max-width:112px">'+
                                '</div>'+
							'</div>'+	
                            '<div class="col-md-11">'+
                                '<div class="top-header">'+
                                    '<div class="header-text1">Janardan Bhagat Shikshan Prasarak Sanstha&acute;s</div>'+
                                    '<div class="header-text2">Ramsheth Thakur Higher Secondary Vidyalay,Kharghar (Commerce &amp; Science)</div>'+
                                '</div>'+
                                '<ul class="wm-stripinfo">'+
                                    '<li><i class="wmicon-location"></i> Plot No.1,Sector 33, Kharghar,Navi Mumbai - 410210 </li>'+
                                    '<li><i class="wmicon-technology4"></i> +91 932-338-2271 / +91 932-360-9161 / +91 887-974-7375</li>'+
                                    '<li><i class="wmicon-clock"></i> Mon - Sat: 11:00am - 05:00pm</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="wm-main-header">'+
                    '<div class="container">'+
                        '<div class="row">'+
                            //'<div class="col-md-2"><a href="'+imgpt+'/index.html" class="wm-logo"><img src="'+imgpt+'/images/Logo.PNG" alt="'+title+'" title="'+title+'" width="100px"></a></div>'+
                            '<div class="col-md-1"></div>'+
							'<div class="col-md-11" style="margin-top:30px;margin-bottom:30px">'+
                                '<nav class="navbar navbar-default">'+
                                    '<div class="navbar-header">'+
                                        '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="true">'+
                                            '<span class="sr-only">Toggle navigation</span>'+
                                            '<span class="icon-bar"></span>'+
                                            '<span class="icon-bar"></span>'+
                                            '<span class="icon-bar"></span>'+
                                        '</button>'+
                                    '</div>'+
                                    mainMenus+
                                '</nav>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</header>';

// $(function(event){
//     var elem = $('#socialIcons');
//     var htmlFile = elem.attr('data-html');
//     $.ajax({
// 		type: 'get',
// 		url: htmlFile,
// 		success: function (response) {			
// 			elem.html(response);
// 		},
// 		error: function (response) {
// 			alert("Error while download data");
// 		}
// 	});
// });

$(function(event){
    if(isAdmin) {    
        $("#headerSec").html(header);    
    } else {
        $("#headerSec").html(socialIcons+header);
    }
});

var footer = '<footer id="wm-footer" class="wm-footer-one">'+
                '<div class="wm-footer-newslatter">'+
                    '<div class="container">'+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<form method="post" action="javascript:void(0);">'+
                                    '<i class="wmicon-interface2"></i>'+
                                    '<input type="text" id="newsLetterEmailID" placeholder="Enter your e-mail address">'+
                                    '<input type="submit" onclick="return subscribeNewsLetter(this)" value="Subscribe to our newsletter">'+
                                '</form>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="wm-footer-widget">'+
                    '<div class="container">'+
                        '<div class="row">'+
                            '<aside class="widget widget_contact_info col-md-3">'+
                                '<a href="'+imgpt+'/index.html" class="wm-footer-logo"><img src="'+imgpt+'/images/Logo.PNG" alt="" width="80px"></a>'+
                                '<ul>'+
                                    '<li><i class="wm-color wmicon-pin"></i> PLOT NO.1,SECTOR 33, KHARGHAR,NAVI MUMBAI -  410210</li>'+
                                    '<li><i class="wm-color wmicon-phone"></i> +91 932-338-2271 <br /> +91 987-022-5459 <br /> +91 887-974-7375</li>'+
                                    '<li><i class="wm-color wmicon-letter"></i><a href="mailto:principal@rthsv.com">principal@rthsv.com</a></li>'+
                                '</ul>'+
                            '</aside>'+
                            '<aside class="widget widget_twitter col-md-4">'+
                                '<div class="wm-footer-widget-title">'+
                                    '<h5>Useful Link</h5>'+
                                '</div>'+
                                '<ul>'+
                                    '<li>'+
                                        '<p><a style="cursor:pointer" onClick="openPage(this)" data-href="'+imgpt+'/Notices.html">Notice Board</a></p>'+
										'<p><a style="cursor:pointer" onClick="openPage(this)" data-href="'+imgpt+'/ExamResult.html">Exam Result</a></p>'+
										'<p><a style="cursor:pointer" onClick="openPage(this)" data-href="'+imgpt+'/contact-us.html">Contact Us</a></p>'+
										'<p><a style="cursor:pointer" onClick="openPage(this)" data-href="'+imgpt+'/our-inspiration.html">About Us</a></p>'+
										'<p><a style="cursor:pointer" onClick="openPage(this)" data-href="'+imgpt+'/admission.html">Admission</a></p>'+
										'<p><a style="cursor:pointer" onClick="openPage(this)" data-href="'+imgpt+'/faq-page.html">FAQ</a></p>'+
										'<p><a style="cursor:pointer" onClick="openPage(this)" data-href="'+imgpt+'/privacypolicy.html">Privacy Policy</a></p>'+
                                    '</li>'+
                                    '<li class="nonAppviewClass">'+
										'<a target="_blank" href="https://play.google.com/store/apps/details?id=com.rthsv&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">'+
											'<img src="'+imgpt+'/images/social/applogo.png" style="height:60px;border-radius:10px" >'+
										'</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</aside>'+
                            '<aside class="widget widget_gallery col-md-5">'+
                                '<div class="wm-footer-widget-title">'+
                                    '<h5>Our Professors</h5>'+
                                '</div>'+
                                '<ul class="gallery">'+
                                    getFooterImg()
								'</ul>'+
                            '</aside>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</footer>';


function getFooterImg(){
	var content="";
	for(var i =1;i<=11;i++){
		 content = content +'<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/images/staff/large/'+i+'.jpg"><img src="'+imgpt+'/images/staff/small/'+i+'.jpg" alt=""></a></li>';
	}
	return content;
}
function initProofesorImg(){
	for(var i =1;i<=11;i++){
		$("#proofesorImg").append('<div class="wm-thumb-testimonial-layer">'+
			'<figure><a href="javascript:void(0);"><img src="'+imgpt+'/images/staff/large/'+i+'.jpg"" style="margin-bottom: 27px;"></a></figure>'+
			'</div>');
	}
}
if(!isAdmin) {
    $("#footerSec").html(footer);
}

setTimeout(hideAppDetails, 100);
setTimeout(highlitMenu, 100);

function openPage(obj){
		if($(obj).parent().parent().attr('id') == 'mainmenu'){
			sessionStorage.setItem('studact',$(obj).attr('data-href'));
		}else{
			sessionStorage.setItem('studact',$(obj).attr('data-href')+","+$(obj).parent().parent().parent().find('a').eq(0).attr('data-href'));
		}
		location.href=$(obj).attr('data-href');	
}	
function highlitMenu(){
	if(sessionStorage.getItem('studact') != null){
		if(sessionStorage.getItem('studact').split(",") == 1){
			$("#mainmenu > li").find('[data-href="'+sessionStorage.getItem('studact')+'"]').addClass("active");
		}else{		
			sessionStorage.getItem('studact').split(",").forEach(function (iteam) {    
				$("#mainmenu > li").find('[data-href="'+iteam+'"]').addClass("active");
			});
		}
	}else{
		if(location.href.substr(location.href.lastIndexOf("/")).length == 1){
			$("#mainmenu > li").find('[data-href="./index.html"]').addClass("active");
		}else{
			$("#mainmenu > li").find('[data-href=".'+location.href.substr(location.href.lastIndexOf("/"))+'"]').addClass("active");
		}
	}
}
function hideAppDetails(){
	if(sessionStorage.getItem('appview') == 'true'){
		$(".nonAppviewClass").hide();
	}
}	
		