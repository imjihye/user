/**
 * Created by kimjihye on 26/10/2016.
 */

var usetListData = [];

$(document).ready(function(){
    populateTable();
});

function populateTable() {
    var tableContent = '';
    $.getJSON('/users/userlist', function(data) {
        userListData = data;
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this.id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#userList table tbody').html(tableContent);
        $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo)
    });
}

function showUserInfo(event){
    event.preventDefault();
    var thisUserName = $(this).attr('rel');
    var arrayPosition = userListData.map(function(arrayItem){
        return arrayItem.username;
    }).indexOf(thisUserName);

    var thisUserObject = userListData[arrayPosition];

    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
}

$('#btnAddUser').on('click', addUser);
function addUser(event){
    event.preventDefault();

    var errorCount = 0;
    $('#adduser input').each(function(i, v){
        if($(this).val() === '') {
            errorCount++;
        }
    });

    if(errorCount === 0){
        var newUser = {
            'username' : $('#addUser fieldset input#inputUserName').val(),
            'email' : $('#addUser fieldset input#inputUserEmail').val(),
            'fullname' : $('#addUser fieldset input#inputFullName').val(),
            'age' : $('#addUser fieldset input#inputUserAge').val(),
            'location' : $('#addUser fieldset input#inputUserLocation').val(),
            'gender' : $('#addUser fieldset input#inputUserGender').val()
        }

        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function(response){
            if(response.msg === ''){
                $('#addUser fieldset input').val('');
                populateTable();
            } else {
                alert('Error' + response.msg);
            }
        });
    } else {
        alert('Please fill in all fields');
        return false;
    }
};