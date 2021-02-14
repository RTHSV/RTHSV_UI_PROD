var contextPath = "https://69txog4rl8.execute-api.ap-south-1.amazonaws.com/dev/A/";
function uploadStudentData(obj) {
	if ($('#jsonDataUpload').val().trim() == "") {
		alert("Please enter valid JSON Data");
		return false;
	}
	$(obj).attr('disabled', true);
	$(obj).val('Please Wait ....');
	var str = "";
	$.each($('#jsonDataUpload').val().split(/\n/), function (i, line) {
		if (line && line.length) {
			str = str + line.trim();
		}
	});
	var jsonStr = '{"classtoUpload":"' + $("#upladClass").val() + '","token":"' + sessionStorage.getItem("rthsv_token") + '","overiderollno":"' + $("#overiderollno").val() + '","jsonDataUpload":' + str + '}';
	$.ajax({
		type: 'POST',
		data: jsonStr,
		url: contextPath + "uploadStudentDetails",
		success: function (response1) {
			alert(response1);
			$(obj).attr('disabled', false);
			$(obj).val('Upload Students Details');
			$('#jsonDataUpload').val('')
		},
		error: function (response1) {
			alert("Please enter Valid JSON Data");
			$(obj).attr('disabled', false);
			$(obj).val('Upload Students Details');
			validateFail(response);
		}
	});
	return false;

}

function uploadStudentResult(obj) {
	if ($('#jsonDataUpload').val().trim() == "") {
		alert("Please enter valid JSON Data");
		return false;
	}
	$(obj).attr('disabled', true);
	$(obj).val('Please Wait ....');
	var str = "";
	$.each($('#jsonDataUpload').val().split(/\n/), function (i, line) {
		if (line && line.length) {
			str = str + line.trim();
		}
	});
	var jsonStr = '{"token":"' + sessionStorage.getItem("rthsv_token") + '","jsonDataUpload":' + str + '}';
	$.ajax({
		type: 'POST',
		data: jsonStr,
		url: contextPath + "updateStudentResult",
		success: function (response1) {
			alert(response1);
			$(obj).attr('disabled', false);
			$(obj).val('Upload Student Results');
			$('#jsonDataUpload').val('');
		},
		error: function (response1) {
			alert("Please enter Valid JSON Data");
			$(obj).attr('disabled', false);
			$(obj).val('Upload Students Details');
			validateFail(response);
		}
	});
	return false;
}

function fetchStudentData(obj) {
	$(obj).attr('disabled', true);
	$(obj).val('Please Wait ....');
	var jsonStr = '{"className":"' + $("#className").val() + '","token":"' + sessionStorage.getItem("rthsv_token") + '"}';
	$.ajax({
		type: 'POST',
		data: jsonStr,
		url: contextPath + "fetchStudentDetails",
		success: function (response1) {
			createStudentDetailsTable(response1);
			$(obj).attr('disabled', false);
			$(obj).val('Fetch Student Data');
		},
		error: function (response) {
			alert("Error while fetching StudentData");
			validateFail(response);
		}
	});
}

function createStudentDetailsTable(response1) {
	$("#displayTableDetails tbody").html('');
	if (response1.length > 0) {
		$.each(response1, function (key, response) {
			var newRow = "<tr><td data-type='number'>" + (++key) + "</td><td data-type='number'>" + $(response).attr("rollNo") + "</td><td>" + $(response).attr("name") + "</td><td data-type='number'>" + $(response).attr("mobileNo") + "</td>" +
				"<td>" + $(response).attr("emailId") + "</td><td>" + $(response).attr("address") + "</td>" +
				"<td><a class='tb-btn' alt='Edit' title='Edit' href='javascript:void(0);' onClick='return editStudentData(this)'>Edit</a>&nbsp;<a class='tb-btn' alt='Delete' title='Delete' href='javascript:void(0);'onClick='return deleteStudentData(this)'>Delete</a></td></tr>";

			$("#displayTableDetails tbody").append(newRow);
		});
	} else {
		var row = "<tr><td colspan='7'>No details available.</td></tr>";
		$("#displayTableDetails tbody").append(row);
	}
}

function editStudentData(obj) {
	var newRow = "<td data-type='number'>" + getRowHtml(obj, 0) + "</td>" +
		"<td data-type='number'>" + getRowHtml(obj, 1) + "</td>" +
		"<td><input type='text' size='4' maxlength='20' value='" + getRowHtml(obj, 2) + "'></td>" +
		"<td><input type='text' size='5' maxlength='10' value='" + getRowHtml(obj, 3) + "'></td>" +
		"<td><input type='text' size='8' maxlength='50' value='" + getRowHtml(obj, 4) + "'></td>" +
		"<td><input type='text' size='8' maxlength='200' value='" + getRowHtml(obj, 5) + "'></td>" +
		"<td><a class='tb-btn' href='javascript:void(0);' alt='Update' title='Update' onClick='return updateStudentData(this)'>Update</a>&nbsp;<a class='tb-btn' href='javascript:void(0);' alt='Cancel' title='Cancel' onClick='return fn_cancelUpdate()'>Cancel</a></td>";
	$(obj).parent().parent().html(newRow);

}
function updateStudentData(obj) {
	var map = {};
	map["Roll No"] = getRowHtml(obj, 1).trim();
	map["Name"] = getRowValue(obj, 2).trim();
	map["Mobile No"] = getRowValue(obj, 3).trim();
	map["Email ID"] = getRowValue(obj, 4).trim();
	map["Address"] = getRowValue(obj, 5).trim();
	map["className"] = $("#className").val().trim();
	map["token"] = sessionStorage.getItem("rthsv_token");
	map["operation"] = "U";
	if (!validateStudentDetails(map)) {
		return false;
	}
	updStudentDetails(obj, map);
	return false;
}
function addStudentDetails(obj) {
	var map = {};
	map["Roll No"] = $("#rollNo").val().trim();
	map["Name"] = $("#name").val().trim();
	map["Mobile No"] = $("#mobileno").val().trim();
	map["Email ID"] = $("#emailid").val().trim();
	map["Address"] = $("#address").val().trim();
	map["className"] = $("#className").val().trim();
	map["token"] = sessionStorage.getItem("rthsv_token");
	map["operation"] = "A";
	if (!validateStudentDetails(map)) {
		return false;
	}
	updStudentDetails(obj, map);
	return false;
}

function fn_cancelUpdate() {
	fetchStudentData($("#fetchButton"));
}

function validateStudentDetails(map) {
	if (!validation.isNumber(map['Roll No'])) {
		alert("Please Enter valid Roll No");
		return false;
	} else if (map['Name'] == "") {
		alert("Please Enter valid Name");
		return false;
	} else if (!(validation.isNumber(map['Mobile No']) && map['Mobile No'].length == 10)) {
		alert("Please Enter valid Mobile No");
		return false;
	} else if (!validation.isEmailAddress(map['Email ID'])) {
		alert("Please Enter valid Email ID");
		return false;
	} else if (map['Address'] == "") {
		alert("Please Enter valid Address");
		return false;
	}
	return true;
}
function updStudentDetails(obj, map) {
	$(obj).attr('disabled', true);
	$(obj).val('Wait..');
	$.ajax({
		type: 'POST',
		url: contextPath + "updateStudentDetails",
		data: JSON.stringify(map),
		success: function (response) {
			alert(response);
			if (response.startsWith("Sorry!")) {
				$(obj).attr('disabled', false);
				$(obj).val('Add Student Details');
			} else {
				fetchStudentData($("#fetchButton"));
				$("#confirmModal").modal('hide');
			}
		},
		error: function (response) {
			alert("Error while updating data");
			validateFail(response);
		}
	});
}
function validateStudDetails(obj) {


}
function deleteStudentData(obj) {
	var str = "Are you sure, You want to delete details for Roll No-" + getRowHtml(obj, 1) + ".\nRecord will be permanently deleted.";
	if (confirm(str)) {
		$(obj).attr('disabled', true);
		$(obj).val('Wait..');
		var map = {};
		map["rollNo"] = getRowHtml(obj, 1);
		map["className"] = $("#className").val();
		map["token"] = sessionStorage.getItem("rthsv_token");
		$.ajax({
			type: 'POST',
			url: contextPath + "deleteStudentDetails",
			data: JSON.stringify(map),
			success: function (response) {
				alert(response);
				fetchStudentData($("#fetchButton"));
			},
			error: function (response) {
				alert("Error while updating data");
				validateFail(response);
			}
		});
	}
	return false;
}
function getRowValue(obj, index) {
	return $(obj).parent().parent().find('td').eq(index).find('input').val();
}
function getRowHtml(obj, index) {
	return $(obj).parent().parent().find('td').eq(index).html();
}

function addStudentData(obj) {
	$("#confirmModal").modal('show');
	$("#rollNo").val('')
	$("#name").val('');
	$("#mobileno").val('');
	$("#emailid").val('');
	$("#address").val('');
	$("#addStudDetailsID").attr('disabled', false);
	$("#addStudDetailsID").val('Save');
	
}
function closeStudentPopUp() {
	$("#confirmModal").modal('hide');
}
function sendNotificationToStud(obj) {
	if ($("#msgToBeSend").val().length > 160 || parseInt($("#charLeft").html()) < 0) {
		alert("As per SMS only 160 characters are allowed.")
		return false;
	}
	var str = "Are you sure, You want to send Notification to all " + $("#className").val() + " Students.\nDetails will be send via SMS and Email.";
	if (confirm(str)) {
		$(obj).attr('disabled', true);
		$(obj).val('Please Wait...');
		var map = {};
		map["msgToBeSend"] = $("#msgToBeSend").val();
		map["className"] = $("#className").val();
		map["token"] = sessionStorage.getItem("rthsv_token");
		$.ajax({
			type: 'POST',
			url: contextPath + "sendNotificationToStud",
			data: JSON.stringify(map),
			success: function (response) {
				alert(response);
				$(obj).attr('disabled', false);
				$(obj).val('Send Notification to Student');
			},
			error: function (response) {
				alert("Error while updating data");
				validateFail(response);
			}
		});
	}
	return false;
}
function checkmsglength(obj) {
	var leftC = 160 - $(obj).val().length;
	if ($(obj).val().indexOf("{0}") != -1) {
		leftC = leftC - 20;
	}
	$("#charLeft").html(leftC)
}
function showHideNotifyContent(obj) {
	if ($(obj).val() == "Y") {
		$("#notifyDiv").show();
	} else {
		$("#notifyDiv").hide();
	}
}
function generateBAse64() {
	var fileTag = document.getElementById("noticePDF");
	convertToBase64(fileTag);
}
function uploadNotices(obj) {
	if (checkValidDateFormat($("#validityFrom").val()) || checkValidDateFormat($("#validityTo").val())) {
		alert("Please enter valid ValidityFrom and ValidityTo date, example use format '09/07/2020 07:40 PM'.");
		return false;
	}
	if ($("#noticeSub").val() == "") {
		alert("Please enter SUbject for Notice.");
		return false;
	}
	var fileTag = document.getElementById("noticePDF");
	if (fileTag.files.length == 0) {
		alert("Please Upload PDF file for notice");
		return false;
	}
	if (fileTag.files[0].name.substr(fileTag.files[0].name.lastIndexOf("."), fileTag.files[0].name.length).toUpperCase() != ".PDF") {
		alert("Only PDF file are allowed for notices");
		return false;
	}
	var pdfFile = pdfFileVal.substr(pdfFileVal.indexOf(",") + 1);
	$(obj).attr('disabled', true);
	$(obj).val('Please Wait..');
	var map = {};
	map["pdfFile"] = pdfFile;
	map["validFrom"] = $("#validityFrom").val();
	map["validTo"] = $("#validityTo").val();
	map["className"] = $("#className").val();
	map["noticeSub"] = $("#noticeSub").val();
	map["token"] = sessionStorage.getItem("rthsv_token");
	$.ajax({
		type: 'POST',
		url: contextPath + "uploadNotices",
		data: JSON.stringify(map),
		success: function (response) {
			alert(response);
			location.reload();
		},
		error: function (response) {
			alert("Error while updating data");
			$(obj).attr('disabled', false);
			$(obj).val('Upload Notices');
			validateFail(response);
		}
	});
}
function sendMessageToNewsLetter(obj){
	if($("#message").val().trim() == ""){
		alert("Please enter some Message to send");
		return false;
	}
	var str = "Are you sure, You want to send below message to subscribed People.";
	if (confirm(str)) {
		$(obj).attr('disabled', true);
		$(obj).val('Please Wait..');
		var map = {};
		map["message"] = $("#message").val();
		map["token"] = sessionStorage.getItem("rthsv_token");
		$.ajax({
			type: 'POST',
			url: contextPath + "sendNotificationToNewsLetter",
			data: JSON.stringify(map),
			success: function (response) {
				alert(response);
				location.reload();
			},
			error: function (response) {
				alert("Error while sending Notification");
				$(obj).attr('disabled', false);
				$(obj).val('Send Message');
				validateFail(response);
			}
		});
	}
	return false;	
}
function fetchNewsLetterData(){
	$.ajax({
		type: 'POST',
		data: '{"token":"' + sessionStorage.getItem("rthsv_token") + '"}',
		url: contextPath + "getAllNewLetterSubscriptionDetails",
		success: function (response1) {
			$("#displayTableDetails tbody").html('');
			$.each(response1, function (key, response) {
				$("#displayTableDetails tbody").append("<tr><td data-type='number'>" + (++key) + "</td><td>" + response + "</td></tr>");
			});
		},
		error: function (response) {
			alert("Error while download data");
			validateFail(response);
		}
	});	
}

function fetchNoticeData() {
	$.ajax({
		type: 'POST',
		data: '{"token":"' + sessionStorage.getItem("rthsv_token") + '"}',
		url: contextPath + "getAllNotices",
		success: function (response1) {
			$("#displayTableDetails tbody").html('');
			$.each(response1, function (key, response) {
				var newRow = "<tr><td data-type='number'>" + (++key) + "</td><td>" + $(response).attr("classFor") + "</td><td>" + $(response).attr("noticeSub") + "</td><td>" + $(response).attr("createdDate") + "</td><td>" + $(response).attr("validFrom") + "</td><td>" + $(response).attr("validTo") + "</td>";
				newRow = newRow + "<td><a href='#' style='color: blue;text-decoration: underline;' target='_blank' data-path='" + $(response).attr("s3Path") + "' onClick='return downloadNotice(this)'>View</a></td><td><input type='button' value='Delete' onClick='return deleteNotice(this)' data-id='" + $(response).attr("id") + "' /></td></tr>";

				$("#displayTableDetails tbody").append(newRow);
			});
		},
		error: function (response) {
			alert("Error while download data");
			validateFail(response);
		}
	});
}
function downloadNotice(obj) {
	$.ajax({
		type: 'POST',
		data: '{"path":"' + $(obj).attr('data-path') + '"}',
		url: contextPath + "downloadNotice",
		success: function (response1) {
			let pdfWindow = window.open("")
			pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + response1 + "'></iframe>")
		},
		error: function (response) {
			alert("Error while download data");
		}
	});
	return false;
}
function deleteNotice(obj) {
	var str = "Are you sure, You want to delete this notice.\nNotice will be permanently deleted.";
	if (confirm(str)) {
		$(obj).attr('disabled', true);
		$(obj).val('Wait..');
		var map = {};
		map["noticeid"] = $(obj).attr('data-id');
		map["token"] = sessionStorage.getItem("rthsv_token");
		$.ajax({
			type: 'POST',
			url: contextPath + "deleteNotice",
			data: JSON.stringify(map),
			success: function (response) {
				alert(response);
				fetchNoticeData($("#fetchButton"));
			},
			error: function (response) {
				alert("Error while deleting data");
				$(obj).attr('disabled', false);
				$(obj).val('Delete');
				validateFail(response);
			}
		});
	}
	return false;
}

function doLogin(obj) {
	$(obj).attr('value', 'Please wait...').prop('disabled', true);
	var map = {};
	map["data"] = btoa($("#password").val());
	$.ajax({
		type: 'POST',
		data: JSON.stringify(map),
		url: contextPath + "validateLogin",
		success: function (response1) {
			if (response1.length == 8) {
				sessionStorage.setItem("rthsv_token", response1);
				localStorage.setItem('act', 'admin-Info.html');
				location.href = "admin-Info.html"
			} else {
				$(obj).attr('value', 'Login').prop('disabled', false);
				alert(response1);
				$("#password").focus();
			}
		}
	});
}
function validateFail(response) {
	if (response.responseJSON.startsWith("Error!")) {
		location.href = "admin-login.html";
	}
}
checkSessionDetails();
function checkSessionDetails() {
	var a = window.location.href;
	var b = a.substring(a.lastIndexOf("/") + 1)
	if (sessionStorage.getItem("rthsv_token") == null && b != "admin-login.html") {
		location.href = "admin-login.html";
	}
}
function updatePass(obj) {
	if ($("#oldPass").val().trim() == "") {
		alert('Please enter Old Password');
		return false;
	}
	if ($("#newPass").val().trim() == "") {
		alert('Please enter New Password');
		return false;
	}
	if ($("#confirmPass").val().trim() != $("#newPass").val().trim()) {
		alert('New-Password and Confirm-Password does not match');
		return false;
	}
	$(obj).attr('value', 'Please wait...').prop('disabled', true);
	var map = {};
	map["token"] = sessionStorage.getItem("rthsv_token");
	map["oldpass"] = btoa($("#oldPass").val().trim());
	map["data"] = btoa($("#newPass").val().trim());
	$.ajax({
		type: 'POST',
		data: JSON.stringify(map),
		url: contextPath + "updatePassword",
		success: function (response1) {
			alert(response1);
			if (response1.startsWith("Error!")) {
				$(obj).attr('disabled', false);
				$(obj).val('Change Password');
			} else {
				location.href = "admin-login.html";
			}
		},
		error: function (response) {
			validateFail(response);
		}
	});
	return false;
}
