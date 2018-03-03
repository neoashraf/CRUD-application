function saveUser(){

	var userName = document.getElementById('inputName').value;
	var userId = document.getElementById('inputID').value;
	var userCgpa = document.getElementById('inputCgpa').value;
	var userBirthDay = document.getElementById('inputBirthDay').value;
	var userCellnum = document.getElementById('inputCellNum').value;

	var user = {
		name : userName,
		id : userId, 
		cgpa : userCgpa,
		birthDay : userBirthDay,
		cellNum : userCellnum
	}
	if(!localStorage.getItem('users')){
		var users = [];
		users.push(user);
		localStorage.setItem('users',JSON.stringify(users));
	}else{
		var users = JSON.parse(localStorage.getItem('users')); 
		users.push(user);
		localStorage.setItem('users',JSON.stringify(users))
	}

	
	//document.getElementById('myModal').reset();
	fetchUsers();

}



function deleteUser(id){
	var users = JSON.parse(localStorage.getItem('users'));
	for(var i =0; i<users.length() ; i++){
		if(users[i] == id)
			users.splice(i,1);
	}
	localStorage.setItem('users',JSON.stringify('users'));

	console.log("Deleted");
	fetchUsers();
}

function fetchUsers(){
	console.log("got it");
}