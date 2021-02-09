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
socialIcons +='<a href="javascript:void(0);" class="fb"><i class="fa fa-facebook"></i></a>';
socialIcons +='<a href="javascript:void(0);" class="tw"><i class="fa fa-twitter"></i></a>';
socialIcons +='<a href="javascript:void(0);" class="go"><i class="fa fa-google"></i></a>';
socialIcons +='<a href="javascript:void(0);" class="li"><i class="fa fa-linkedin"></i></a>';
socialIcons +='<a href="javascript:void(0);" class="yt"><i class="fa fa-youtube"></i></a>';
socialIcons +='</div>';

var webSiteMenus = '<div class="collapse navbar-collapse" id="navbar-collapse-1">'+
                        '<ul class="nav navbar-nav">'+
                            '<li class="" page="Home"><a href="'+imgpt+'/index.html">Home</a></li>'+
                            '<li class="" page="Admission"><a href="'+imgpt+'/admission.html">Admission</a></li>'+
                            '<li class="" page="Student Info"><a href="javascript:void(0);">Student Info</a>'+
                                '<ul class="wm-dropdown-menu">'+
                                    '<li page="Notices"><a href="'+imgpt+'/Notices.html">Notice Board</a></li>'+
                                    '<li page="Exam Result"><a href="'+imgpt+'/ExamResult.html">Exam Results</a></li>'+
                                '</ul>'+
                            '</li>'+
                            '<li class="" page="Contact Us"><a href="'+imgpt+'/contact-us.html">Contact Us</a></li>'+
                            '<li class="" page="About Us"><a href="javascript:void(0);">About Us</a>'+
                                '<ul class="wm-dropdown-menu">'+
                                    '<li page="About College"><a href="'+imgpt+'/about-us.html">About College</a></li>'+
                                    '<li page="Our Inspiration"><a href="'+imgpt+'/our-inspiration.html">Our Inspiration</a></li>'+
                                    '<li page="Board Of Executive"><a href="'+imgpt+'/board-of-executive.html">Board Of Executive</a></li>'+
									'<li page="Privacy Policy"><a href="'+imgpt+'/privacypolicy.html">Privacy Policy</a></li>'+
                                '</ul>'+
                            '</li>'+
                            '<li class="" page="Rules Page"><a href="'+imgpt+'/rules-page.html">Rules &amp; Regulations </a></li>'+
                            '<li class="" page="FAQs"><a href="'+imgpt+'/faq-page.html">FAQ&acute;s</a></li>'+
                        '</ul>'+
                    '</div>';

var adminMenus = '<div class="collapse navbar-collapse" id="navbar-collapse-1">'+
                    '<ul class="nav navbar-nav">'+
                        '<li class="" page=""><a href="javascript:void(0);">Manage Student</a>'+
                            '<ul class="wm-dropdown-menu">'+
                                '<li page=""><a href="javascript:void(0);" data-page="admin-Info.html" onclick="openAdminPage(this)">Student Information</a></li>'+
                                '<li page=""><a href="javascript:void(0);" data-page="admin-uploaddata.html" onclick="openAdminPage(this)">Upload Student Info</a></li>'+
                                '<li page=""><a href="javascript:void(0);" data-page="admin-studentresult.html" onclick="openAdminPage(this)">Upload Student Result</a></li>'+
                            '</ul>'+
                        '</li>'+                        
                        '<li class="" page=""><a href="javascript:void(0);" data-page="admin-sendNotification.html" onclick="openAdminPage(this)">Notification</a></li>'+
                        '<li class="" page=""><a href="javascript:void(0);" data-page="admin-uploadNotices.html" onclick="openAdminPage(this)">Notices</a></li>'+
                        '<li class="" page=""><a href="javascript:void(0);" data-page="admin-changepassword.html" onclick="openAdminPage(this)">Change Password</a></li>'+
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
                            '<div class="col-md-12">'+
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
                            '<div class="col-md-2"><a href="'+imgpt+'/index.html" class="wm-logo"><img src="'+imgpt+'/images/Logo.PNG" alt="'+title+'" title="'+title+'" width="100px"></a></div>'+
                            '<div class="col-md-10">'+
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
                                    '<input type="text" placeholder="Enter your e-mail address">'+
                                    '<input type="submit" value="Subscribe to our newsletter">'+
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
                                    '<li><i class="wm-color wmicon-phone"></i> +91 932-338-2271 <br /> +91 932-360-9161 <br /> +91 887-974-7375</li>'+
                                    '<li><i class="wm-color wmicon-letter"></i><a href="mailto:principal@rtshv.com">principal@rtshv.com</a></li>'+
                                '</ul>'+
                                '<div class="wm-footer-icons">'+
                                    '<a href="#" class="wmicon-social5"></a>'+
                                    '<a href="#" class="wmicon-social4"></a>'+
                                    '<a href="#" class="wmicon-social3"></a>'+
                                '</div>'+
                            '</aside>'+
                            '<aside class="widget widget_twitter col-md-4">'+
                                '<div class="wm-footer-widget-title">'+
                                    '<h5><i class="wmicon-social2"></i> @enrollcampus</h5>'+
                                '</div>'+
                                '<ul>'+
                                    '<li>'+
                                        '<p>Check Youniverse - Multipurpose PSD Template @ThemeForest: <a href="#">pic.twitter.com/xcVlqJySjq</a></p>'+
                                        '<time datetime="2008-02-14 20:00" class="wm-color">2 hrs ago</time>'+
                                    '</li>'+
                                    '<li>'+
                                        '<p>Check out my New PSD: FashionPlus - Fashion eCommerce: <a href="#">pic.twitter.com/xc445Ghyt</a></p>'+
                                        '<time datetime="2008-02-14 20:00" class="wm-color">4 hrs ago</time>'+
                                    '</li>'+
                                    '<li class="nonAppviewClass">'+
                                        '<a target="_blank" href="https://play.google.com/store/apps/details?id=com.rthsv&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">'+
											'<img src="'+imgpt+'/images/social/applogo.png" style="height:60px;border-radius:10px" >'+
										'</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</aside>'+
                            '<aside class="widget widget_gallery col-md-3">'+
                                '<div class="wm-footer-widget-title">'+
                                    '<h5>Our Professors</h5>'+
                                '</div>'+
                                '<ul class="gallery">'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-1.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-1.jpg" alt=""></a></li>'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-2.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-2.jpg" alt=""></a></li>'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-3.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-3.jpg" alt=""></a></li>'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-4.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-4.jpg" alt=""></a></li>'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-5.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-5.jpg" alt=""></a></li>'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-6.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-6.jpg" alt=""></a></li>'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-7.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-7.jpg" alt=""></a></li>'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-8.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-8.jpg" alt=""></a></li>'+
                                    '<li><a title="" data-rel="prettyPhoto[gallery1]" href="'+imgpt+'/extra-images/widget-galleryfull-9.jpg"><img src="'+imgpt+'/extra-images/widget-gallery-9.jpg" alt=""></a></li>'+
                                '</ul>'+
                            '</aside>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</footer>';

if(!isAdmin) {
    $("#footerSec").html(footer);
}

var adminLeftPanel = '<div class="wm-student-dashboard-nav">'+
						'<div class="wm-student-nav">'+
							'<div class="wm-student-nav-text">'+
								'<a href="javascript:void(0);" style="cursor: context-menu;">'+
									'<i class="wmicon-three" style="font-size:18px">&nbsp;Admin Settings</i>'+
								'</a>'+
							'</div>'+
							'<ul id="leftPanelUL">'+
								'<li>'+
									'<a href="javascript:void(0);" data-page="admin-Info.html" onClick=openAdminPage(this)>'+
										'<i class="wmicon-avatar"></i>'+
										'Student Information'+
									'</a>'+
								'</li>'+
								'<li>'+
									'<a href="javascript:void(0);" data-page="admin-uploaddata.html" onClick=openAdminPage(this)>'+
										'<i class="wmicon-book"></i>'+
										'Upload Student Info'+
									'</a>'+
								'</li>'+
								'<li>'+
									'<a href="javascript:void(0);" data-page="admin-studentresult.html" onClick=openAdminPage(this)>'+
										'<i class="wmicon-book"></i>'+
										'Upload Student Result'+
									'</a>'+
								'</li>'+
								'<li>'+
									'<a href="javascript:void(0);" data-page="admin-sendNotification.html" onClick=openAdminPage(this)>'+
										'<i class="wmicon-favorite"></i>'+
										'Send Notification'+
									'</a>'+
								'</li>'+
								'<li>'+
									'<a href="javascript:void(0);" data-page="admin-uploadNotices.html" onClick=openAdminPage(this)>'+
										'<i class="wmicon-paper"></i>'+
										'Upload Notices'+
									'</a>'+
								'</li>'+
								'<li>'+
									'<a href="javascript:void(0);" data-page="admin-changepassword.html" onClick=openAdminPage(this)>'+
										'<i class="wmicon-three"></i>'+
										'Change Password'+
									'</a>'+
								'</li>'+
								'<li>'+
									'<a href="admin-login.html">'+
										'<i class="wmicon-arrow"></i>'+
										'Logout'+
									'</a>'+
								'</li>'+
							'</ul>'+
						'</div>'+
					'</div>';
//$("#adminLeftPanel").html(adminLeftPanel);	
//$("#leftPanelUL > li").find('[data-page="'+localStorage.getItem('act')+'"]').parent().addClass("active")
function openAdminPage(obj){
	// if($("#adminLeftPanel").length != 0){
		localStorage.setItem('act',$(obj).attr('data-page'));
		location.href=$(obj).attr('data-page');	
	// }
}			   
		