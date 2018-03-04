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
	}
}

function EditUser(key) {
	
}

function fetchUsers(){
	var users = JSON.parse(localStorage.getItem('users'));

	userList.innerHTML = '';

	for(var i = 0; i< users.length ; i++){
		var key = users[i].key;
		var name = users[i].name;
		var id = users[i].id;
		var age = calculate_age(new Date(users[i].birthDay) );
		var cgpa = users[i].cgpa;
		var cellNum = users[i].cellNum;
		userList.innerHTML += 	'<tr>' + 
								'<td>' + (i+1) + '</td>' + 
								'<td>' + name + '</td>' + 
								'<td>' + id + '</td>' + 
								'<td>' + age + '</td>' +
								'<td><button class="btn btn-info btn-sm"  type="button"  data-toggle="modal" data-target="#myModalView">View</button></td>' +
								'<td><button class="btn btn-info btn-sm"  type="button"  data-toggle="modal" data-target="#myModalEdit">Edit</button></td>' +
		              			'<td><button class="btn btn-danger btn-sm" type="button" onclick="deleteUser(\''+ key +'\')">Delete</button> </td>'+
								'</tr>';
	}
}

function calculate_age(birthDay){
	var diff_ms = Date.now() - birthDay.getTime(); 
	var age_dt = new Date(diff_ms);
	return Math.abs(age_dt.getUTCFullYear() - 1970);
}
