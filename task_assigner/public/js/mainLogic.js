// Global variables
// determine how many "Task N" column headers to have
var longestSubList = 0;

var taskInputBoxCount = 0;
var tasks = [];

var peopleInputBoxCount = 0;
var people = [];

var outputArray = [];

var tableToDisplay = [];

// adds an input row to "The Tasks" section
function addTaskRow() {
  var div = document.createElement('div');

  div.className = 'row';

  // append a to the front to have a unique id for tasks vs people
  div.innerHTML = "<input type='text' name='name' id= '"+"a"+taskInputBoxCount+"'/>\
    <input type='button' value='-' onclick='removeTaskRow(this)'>";

  document.getElementById('taskContent').appendChild(div);

  taskInputBoxCount += 1;
}

// removes selected input row in "The Tasks" section 
function removeTaskRow(input) {
  document.getElementById('taskContent').removeChild( input.parentNode );
}

// adds an input row to "The People" section    
function addPeopleRow(){
  var div = document.createElement('div');

  div.className = 'row';

  div.innerHTML = "<input type='text' name='name' id= '"+"b"+peopleInputBoxCount+"'/>\
    <input type='button' value='-' onclick='removePeopleRow(this)'>";
      
  document.getElementById('peopleContent').appendChild(div);

  peopleInputBoxCount += 1;
}

// removes selected input row in "The People" section
function removePeopleRow(input) {
  document.getElementById('peopleContent').removeChild( input.parentNode );
}

// Code to run when the down chevron in "The People" section is clicked
function submit(){
  // once table has been displayed, empty the tasks and people arrays
  tasks = [];
  people = [];
  tableToDisplay = [];
  longestSubList = 0;
  outputArray = []
  // remove table from html
  removeOutputTable();

  // obtain tasks from input fields and populate them into an array
  for(i = 0; i < taskInputBoxCount; i++){
    try{
      tasks.push(document.getElementById("a"+i).value);
    }
    catch(TypeError){}
  }
  // obtain people from input fields and populate them into an array
  for(i = 0; i < peopleInputBoxCount; i++){
    try{
      people.push(document.getElementById("b"+i).value);
    }
    catch(TypeError){}
  }

  // console.log("people: " + people);
  // console.log("tasks: " + tasks);
  console.log(tableToDisplay)

  tableToDisplay = distributeTasks(tasks, people.length);

  // append names to the front of tasks
  appendNames(people, tableToDisplay);

  console.log("tableToDisplay below:");
  console.log(tableToDisplay);
  

  // pass tableToDisplay into a function to display in html
  displayTable(tableToDisplay);

}

// remove output table from html
function removeOutputTable(){
  var myTableDiv = document.getElementById("output_table");
  while (myTableDiv.firstChild) {
    myTableDiv.removeChild(myTableDiv.firstChild);
  } 
  // myTableDiv.innerHTML = "";     
}

function distributeTasks(tasks, numberOfPeople){

  for(var i = 0; i < numberOfPeople; i++){
    outputArray.push([]);
  }

  var origValOftasks = tasks.length;
  var index = 0;
  var taskCounter = 0;
  var tasksPerPerson = Math.floor(tasks.length / numberOfPeople);
  var randomIndexIntasks = 0;

  // if tasks.length > numberOfPeople - come back to this later
  if(/**tasks.length > numberOfPeople **/ true){
    // populate output array
    for(var i = 0; i < tasksPerPerson * numberOfPeople; i++){

      randomIndexIntasks = Math.floor((Math.random() * tasks.length));

      if(taskCounter < tasksPerPerson){
        outputArray[index].push(tasks[randomIndexIntasks]);
        taskCounter++;
      }
      else{
        index++;
        outputArray[index].push(tasks[randomIndexIntasks]);
        taskCounter = 1;
      }
      // remove this value from the array
      tasks.splice(randomIndexIntasks,1);  
    }

    var numberOfRemainingElemsIntasks = tasks.length;

    // randomly pick a letter from the remaining letters
    for(var i = 0; i < numberOfRemainingElemsIntasks; i++){
      randomIndexIntasks = Math.floor((Math.random() * tasks.length));

      outputArray[i].push(tasks[randomIndexIntasks]);

      tasks.splice(randomIndexIntasks, 1);
    }   
  }
  // numberOfPeople > tasks.length
  else{}
  return outputArray;
}

function appendNames(people, tableToDisplay){
  for(var i = 0; i < tableToDisplay.length; i++){
    if(longestSubList < tableToDisplay[i].length){
      longestSubList = tableToDisplay[i].length;
    }

    tableToDisplay[i].unshift(people[i]);
  }

  return tableToDisplay;
}

function displayTable(tableToDisplay){
  var myTableDiv = document.getElementById("output_table");
  var table = document.createElement('TABLE');
  var tableBody = document.createElement('TBODY');

  table.border = '1'
  table.appendChild(tableBody);

  var heading = ["Name"];
  for(var i = 0; i < longestSubList; i++){
    heading.push("Task " + (i+1))
  }

  //TABLE COLUMNS
  var tr = document.createElement('TR');
  tableBody.appendChild(tr);
  for (i = 0; i < heading.length; i++) {
    var th = document.createElement('TH')
    th.width = '75';
    th.appendChild(document.createTextNode(heading[i]));
    tr.appendChild(th);
  }

  //TABLE ROWS
  for (i = 0; i < tableToDisplay.length; i++) {
    var tr = document.createElement('TR');
    for (j = 0; j < tableToDisplay[i].length; j++) {
      var td = document.createElement('TD')
      td.appendChild(document.createTextNode(tableToDisplay[i][j]));
      tr.appendChild(td)
    }
    tableBody.appendChild(tr);
  }
  myTableDiv.appendChild(table);       
}

var taskAssigner = angular.module('taskAssigner', []);
taskAssigner.controller('controlResults', ['$scope','$http', function($scope, $http) {

  var getResults = function(){$http.get('/resultList')
    .then(function(response){
      console.log(response.data);
      $scope.resultList = response.data;
    }, function(err){
      console.log("An error happened");
      console.log(err);
    });
  }

  getResults();

  // when [Save Result] button is pressed
  $scope.addResult = function(){
    console.log($scope.resultName);
    console.log(people);
    console.log(outputArray);

    var data = {
      resultName: $scope.resultName,
      people: people,
      outputArray: outputArray
    };

    // call this post function in app.js
    $http.post('/resultList', data).then(function(response){
      console.log("response function: " + response);
      getResults();
    }, function(err){
      console.log("An error happened");
      console.log(err);
    });
  }

  // when [Display] button is pressed
  $scope.displayResult = function(id){

    $http.get('/resultList/' + id).then(function(response){
      // console.log("responding from Display button press");
      console.log(response.data[0].resultName);
      // display resultName in displayedResults
      document.getElementById("resultNameDisplay").textContent = "Displaying results for: " + response.data[0].resultName; 
      console.log(response.data[0].people);
      console.log(response.data[0].outputArray);

    }, function(err){
      console.log(err);
      console.log("An error happened");
    });
  }

  // when [Remove]  button is pressed
  $scope.removeResult  = function(id){
    console.log("Hello from removeResult");
    console.log("id: " + id);

    $http.delete('/resultList/' + id).then(function(response){
      console.log("responding from delete");
      getResults();
    }, function(err){
      console.log("An error happened");
      console.log(err);
    });
  }

}]);
