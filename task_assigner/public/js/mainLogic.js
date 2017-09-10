      var longestSubList = 0;

      var taskInputBoxCount = 0;
      var tasks = [];

      var peopleInputBoxCount = 0;
      var people = [];

      function addTaskRow() {
        var div = document.createElement('div');

        div.className = 'row';

        // append a to the front to have a unique id for tasks vs people
        div.innerHTML = "<input type='text' name='name' id= '"+"a"+taskInputBoxCount+"'/>\
          <input type='button' value='-' onclick='removeTaskRow(this)'>";

        document.getElementById('taskContent').appendChild(div);

        taskInputBoxCount += 1;
      }

      function removeTaskRow(input) {
        document.getElementById('taskContent').removeChild( input.parentNode );
      }
      
      function addPeopleRow(){
        var div = document.createElement('div');

        div.className = 'row';

        div.innerHTML = "<input type='text' name='name' id= '"+"b"+peopleInputBoxCount+"'/>\
          <input type='button' value='-' onclick='removePeopleRow(this)'>";
      
        document.getElementById('peopleContent').appendChild(div);

        peopleInputBoxCount += 1;
      }

      function removePeopleRow(input) {
        document.getElementById('peopleContent').removeChild( input.parentNode );
      }

      function submit(){
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

        var tableToDisplay = distributeTasks(tasks, people.length);

        // append names to the front of tasks
        appendNames(people, tableToDisplay);

        // remove table from html
        removeOutputTable();

        // pass tableToDisplay into a function to display in html
        displayTable(tableToDisplay);

        tasks = [];
        people = [];
        longestSubList = 0;
      }

      // remove output table from html
      function removeOutputTable(){
        var myTableDiv = document.getElementById("output_table");
        myTableDiv.innerHTML = '';
        while (myTableDiv.firstChild) {
          myTableDiv.removeChild(myTableDiv.firstChild);
        }      
      }

      function distributeTasks(tasks, numberOfPeople){
        // output
        var outputArray = [];
        for(var i = 0; i < numberOfPeople; i++){
            outputArray.push([]);
        }

        var origValOftasks = tasks.length;
        var index = 0;
        var taskCounter = 0;
        var tasksPerPerson = Math.floor(tasks.length / numberOfPeople);
        var randomIndexIntasks = 0;

        // if tasks.length > numberOfPeople
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
        else{
            
        }

        return outputArray;
      }

      function appendNames(people, tableToDisplay){
        for(var i = 0; i < tableToDisplay.length; i++){
          
          // do BEFORE appending a name to the front!
          if(longestSubList < tableToDisplay[i].length){
            longestSubList = tableToDisplay[i].length;
          }

          tableToDisplay[i].unshift(people[i]);
        }
      }

      function displayTable(tableToDisplay){
        var myTableDiv = document.getElementById("output_table")
        var table = document.createElement('TABLE')
        var tableBody = document.createElement('TBODY')

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