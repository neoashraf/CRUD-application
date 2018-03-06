var toEdit;
function saveUser(){

	// get the new input
	var userKey = chance.guid();
	var userName = document.getElementById('inputName').value;
	var userId = document.getElementById('inputID').value;
	var userCgpa = document.getElementById('inputCgpa').value;
	var userBirthDay = document.getElementById('inputBirthDay').value;
	var userCellnum = document.getElementById('inputCellNum').value;

	//create object of the new input
	var user = {
		key : userKey,
		name : userName,
		id : userId, 
		cgpa : userCgpa,
		birthDay : userBirthDay,
		cellNum : userCellnum
	}

	//store in local storage
	if(!localStorage.getItem('users')){
		var users = [];
		users.push(user);
		localStorage.setItem('users',JSON.stringify(users));
	}else{
		var users = JSON.parse(localStorage.getItem('users')); 
		users.push(user);
		localStorage.setItem('users',JSON.stringify(users))
	}

	//reset the input fields in modal
	document.getElementById('inputName').value = '';
	document.getElementById('inputID').value = '';
	document.getElementById('inputCgpa').value = '';
	document.getElementById('inputBirthDay').value ='';
	document.getElementById('inputCellNum').value ='';

	//display the updated list of users
	fetchUsers();
	actionConfirmation.innerHTML = "User is registered successfully.";
}

function deleteUser(key){

	var result = confirm('Want to delete?');	//confirmation
	if(result){									// if confirm
		var users = JSON.parse(localStorage.getItem('users'));
		for(var i = 0; i < users.length; i++){
			if(users[i].key == key){
				users.splice(i,1);
			}
		}
		localStorage.setItem('users',JSON.stringify(users)); 
		fetchUsers();
		actionConfirmation.innerHTML = "User is deleted successfully.";
	}
}

function editUser(key) {
	var users = JSON.parse(localStorage.getItem('users'));
	for(var i = 0; i < users.length; i++){
		if(users[i].key == key){
			toEdit = i;
			break;
		}
	}
	document.getElementById('inputName1').value = users[toEdit].name;
	document.getElementById('inputID1').value = users[toEdit].id;
	document.getElementById('inputCgpa1').value = users[toEdit].cgpa;
	document.getElementById('inputBirthDay1').value = users[toEdit].birthDay;
	document.getElementById('inputCellNum1').value = users[toEdit].cellNum;
	localStorage.setItem('users',JSON.stringify(users)); 
}

function edited(){

	var users = JSON.parse(localStorage.getItem('users')); 

	users[toEdit].name = document.getElementById('inputName1').value;
	users[toEdit].id = document.getElementById('inputID1').value;
	users[toEdit].cgpa = document.getElementById('inputCgpa1').value;
	users[toEdit].birthDay = document.getElementById('inputBirthDay1').value;
	users[toEdit].cellNum = document.getElementById('inputCellNum1').value;

	localStorage.setItem('users',JSON.stringify(users));
	fetchUsers();
	actionConfirmation.innerHTML = "User information is updated successfully.";
}

function viewUser(key){

	var i;
	var users = JSON.parse(localStorage.getItem('users'));
	for(i = 0; i < users.length; i++){
		if(users[i].key == key){
			break;
		}
	}

	var index = i + 1;
	var name = users[i].name;
	var id = users[i].id;
	var birthDay = users[i].birthDay;
	var cgpa = users[i].cgpa;
	var cellNum = users[i].cellNum;

	userDetails.innerHTML = '<tr>' + 
							'<td>' + index + '</td>' + 
							'<td >'+ name + '</td>' + 
							'<td>' + id + '</td>' + 
							'<td>' + birthDay + '</td>' +
							'<td>' + cgpa + '</td>' +
							'<td>' + cellNum + '</td>' +
							'</tr>';

}


var isAscending = true;
function sortList(){
	
	if(isAscending){
		isAscending =  false;

		var table, tr, td, x, y, shouldSwitch,switching;
		
		table = document.getElementById('userList');

		switching = true;
		while(switching){
			switching = false;
			tr = table.getElementsByTagName('tr');
			for(var i = 0;i < (tr.length - 1);i++){
				shouldSwitch = false;
				x = tr[i].getElementsByTagName('td')[3];
				y = tr[i+1].getElementsByTagName('td')[3];
				if(x.innerHTML > y.innerHTML){
					shouldSwitch = true;
					break;
				}
			}
			if(shouldSwitch){
				tr[i].parentNode.insertBefore(tr[i+1],tr[i]);
				switching = true;
			}
		}
	}
	else{	
		isAscending = true;

		var table, tr, td, x, y, shouldSwitch,switching;
		
		table = document.getElementById('userList');

		switching = true;
		while(switching){
			switching = false;
			tr = table.getElementsByTagName('tr');
			for(var i = 0;i < (tr.length - 1);i++){
				shouldSwitch = false;
				x = tr[i].getElementsByTagName('td')[3];
				y = tr[i+1].getElementsByTagName('td')[3];
				if(x.innerHTML < y.innerHTML){
					shouldSwitch = true;
					break;
				}
			}
			if(shouldSwitch){
				tr[i].parentNode.insertBefore(tr[i+1],tr[i]);
				switching = true;
			}
		}
	}
}

function searchUser(){

	var input, filter, table, tr, td, i;
	input = document.getElementById("searchName");
	filter = input.value.toUpperCase();
	table = document.getElementById("userList");
	tr = table.getElementsByTagName("tr");
	console.log(tr);
	for (i = 1; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[1];
		if (td) {
		  if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
		    tr[i].style.display = "";
		  } else {
		    tr[i].style.display = "none";
		  }
		}       
	}
}

function fetchUsers(){
	var users = JSON.parse(localStorage.getItem('users'));

	userList.innerHTML = '';
	for(var i = 0; i< users.length ; i++){
		var index = i+1;
		var key = users[i].key;
		var name = users[i].name;
		var id = users[i].id;
		var age = calculate_age(new Date(users[i].birthDay) );
		var cgpa = users[i].cgpa;
		var cellNum = users[i].cellNum;
		userList.innerHTML += 	'<tr>' + 
								'<td>' + index + '</td>' + 
								'<td >'+ name + '</td>' + 
								'<td>' + id + '</td>' + 
								'<td>' + age + '</td>' +
								'<td><button class="btn btn-info btn-sm"  type="button"  onclick="viewUser(\''+ key +'\')" data-toggle="modal" data-target="#myModalView">View</button></td>' +
								'<td><button class="btn btn-info btn-sm"  type="button"  onclick="editUser(\''+ key +'\')" data-toggle="modal" data-target="#myModalEdit">Edit</button></td>' +
		              			'<td><button class="btn btn-danger btn-sm" type="button" onclick="deleteUser(\''+ key +'\')">Delete</button> </td>'+
								'</tr>';
	}
	clearAlert();
}

function calculate_age(birthDay){
	var diff_ms = Date.now() - birthDay.getTime(); 
	var age_dt = new Date(diff_ms);
	return Math.abs(age_dt.getUTCFullYear() - 1970); 
}

function clearAlert(){
	actionConfirmation.innerHTML = "";
}