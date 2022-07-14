
var token;
var userName;
var userPassword;
var url = document.location.origin;
var loginStatus;
var tokenStatus;

function main() {
	retrieveData();
	if (token != null) {
		tokenStatus = refreshToken();
	}
	
	if (tokenStatus != //success state) {
		if (userName != null && userPassword != null) {
			loginStatus = logIn();
			if (loginStatus == good) {
				tokenStatus = refreshToken();
				saveData();
			}
		}
	}
	
	if (loginStatus == //good && tokenStatus == good) {
		refreshTokenLoop();
	}
	
}


function logIn() {
		xmlhttp.open("POST", url = "/API/api/Authentication/LogIn", true);
		
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		
		xmlhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
					var myArr = JSON.parse(this.responseText);
					//make sure you set token to this
				}
		};

		//allow login/data store encrypted upon final completion
		var data = JSON.stringify({"username": "metasyssysagent", "password": "Kansa$N42", "domain": "", "IsNeverExpireSession": "true"});
		
		xmlhttp.send(data);
}


function refreshToken() {	
	var request = new XMLHttpRequest();

	request.open('GET', url + '/API/api/Authentication/RefreshToken');

	request.setRequestHeader('Authorization', 'Bearer ' + token);


	xmlhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 401) {
					
				}

	request.send();
	
	//set a return variable
}

function refreshTokenLoop() {
	refreshToken();
	setTimeout(refreshTokenLoop, 600000);
}



