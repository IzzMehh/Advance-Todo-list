const darkmode = document.querySelector('#toggle-mode');
const searchInputBox = document.querySelector('#inputSearch');
const moonImage = document.querySelector('#moon');
const sunImage = document.querySelector('#sun');
const background = document.querySelector('body');
const addButton = document.querySelector('#add-btn');
const hiddenSection = document.querySelector('.section3');
const blackScreen = document.querySelector('.add-section');
const cancelButton = document.querySelector('#cancel');
const addBox =document.querySelector('#box');
const applyButton = document.querySelector('#apply');
const divToAddTask = document.querySelector('#content');
const nameInput = document.querySelector('#note-input');
const defaultImg = document.querySelector('#default-img');
const allTask = document.querySelectorAll('.work-list-box');
const filterSearch = document.querySelector('#filter');
let spanText;
let divId;
let input;
let taskName;


// ! IMPORTANT :- I have made the div id in numbers like 0,1,2... so it will be easy to access any other element  for example :- span0, span1 or editicon0, editicon1.

// UPDATING || CREATING KEY VALUES IN BROWSER'S LOCAL STORAGE....

let checkedTask = JSON.parse(localStorage.getItem('completed')) || [];  //Initialized it with "completed" key from local storage if not found then create a Blank Array.
localStorage.setItem('completed', JSON.stringify(checkedTask)); // Update key "completed" in local storage.

let task = JSON.parse(localStorage.getItem('Task')) || []; //Initialized it with "Task" key from local storage if not found then create a blank array.
localStorage.setItem('Task', JSON.stringify(task)); // Update key "Task" in local storage.

let taskCount = task.length || 0; // Initialized it the length of task Array. If no task then it will be initialized with default value 0.

let counter = localStorage.getItem('theme') || 'light'; // Initalized it with "theme" key from local storage if not found then default value "light" will be initialised.
localStorage.setItem('theme',counter); //Update 'theme' in local storage.


// Setting up the User Interface.

// ON RELOAD ----->>>>> .

if(localStorage.getItem('theme')=='light'){ //On reload get the value of 'theme' from local storage and if the value is "light" then light theme will be applied.
    background.style.backgroundColor = 'rgba(239, 220, 195, 0.542)';
    document.documentElement.style.setProperty('--text-color', '#F7F7F7');
    document.documentElement.style.setProperty('--heading-color', '#252525');
    document.documentElement.style.setProperty('--placehold-color', '#666666');
    searchInputBox.style.borderColor = '#6C63FF';
    moonImage.style.display = '';
    sunImage.style.display = 'none';
}
else if(localStorage.getItem('theme')=='dark'){//On reload get the value of 'theme' from local storage and if the value is "dark" then dark theme will be applied.
    background.style.backgroundColor = '#252525';
    document.documentElement.style.setProperty('--text-color', '#252525');
    document.documentElement.style.setProperty('--heading-color', '#F7F7F7');
    searchInputBox.style.borderColor = '#F7F7F7';
    moonImage.style.display = 'none';
    sunImage.style.display = '';
    addBox.style.borderColor='#F7F7F7';
}

if(taskCount>0){ //On reload get the value and length of array and create the Task div's and it's innerHTML also give the "checked" attributes to the completed task.
    defaultImg.style.display = 'none';
    for(let i = 0; i<task.length;i++){ 
    let divTask = document.createElement('div');
    divToAddTask.appendChild(divTask).classList.add('work-list-box');
    divTask.setAttribute("id", `${i}`);
    divTask.innerHTML=`<input style="display:none" type="checkbox" id="input${i}" class="work-list-checkbox"><input type="checkbox" id="checkbox${i}" class="work-list-checkbox main-checkbox"> <span id="span${i}">${task[i]} </span> <ion-icon id="delete${i}" class="delete-icon" name="trash-outline"></ion-icon> <ion-icon id="edit${i}" class="edit-icon" name="create-outline">`;
    let checkboxes = document.querySelector(`#checkbox${i}`);
    checkedTask.forEach(element => {
      if(element==checkboxes.id){
        divTask.innerHTML=`<input style="display:none" type="checkbox" id="input${i}" class="work-list-checkbox"><input type="checkbox" checked id="checkbox${i}" class="work-list-checkbox main-checkbox"> <span id="span${i}"> <strike> ${task[i]} </strike> </span> <ion-icon id="delete${i}" class="delete-icon" name="trash-outline"></ion-icon> <ion-icon id="edit${i}" class="edit-icon" name="create-outline">`;
        divTask.style.color ='#B2B1B1';
      }
    });
}
}


// Functions  ------>>>>>


function hideSection3(){ // Hide the section 3 (Add task window).
    hiddenSection.style.display='none';
};

function changeTheme() { //toggle between ligth and dark theme
    if(localStorage.getItem('theme')=='light'){ 
    background.style.backgroundColor = '#252525';
    background.style.transition = 'all 0.4s linear';
    document.documentElement.style.setProperty('--text-color', '#252525');
    document.documentElement.style.setProperty('--heading-color', '#F7F7F7');
    searchInputBox.style.borderColor = '#F7F7F7';
    moonImage.style.display = 'none';
    sunImage.style.display = '';
    addBox.style.borderColor='#F7F7F7';
    counter='dark';
    localStorage.setItem('theme',counter);
}
    else if(localStorage.getItem('theme')=='dark'){ 
    background.style.backgroundColor = 'rgba(239, 220, 195, 0.542)';
    background.style.transition = 'all 0.4s linear';
    document.documentElement.style.setProperty('--text-color', '#F7F7F7');
    document.documentElement.style.setProperty('--heading-color', '#252525');
    document.documentElement.style.setProperty('--placehold-color', '#666666');
    searchInputBox.style.borderColor = '#6C63FF';
    moonImage.style.display = '';
    sunImage.style.display = 'none';
    counter='light';
    localStorage.setItem('theme',counter);
    }
};


function addTask(){ //Add the task.
    if(nameInput.value.length>0){ //works only if the task name have atleast 1 letter. (So, blank task won't be created).
      let nameExist = false;
      for(let x=0;x<task.length;x++){
        if(task[x]==nameInput.value){ //Checks whether the task name already exist.
          nameExist=true;
          break;
        }
      }
      if(!nameExist){ // if task name do not exist then create one and store the value in local Storage.
       taskName = nameInput.value; // initalize it with the input given by the user.
       task.push(taskName); // add Task name in the array from LAST.
       localStorage.setItem('Task', JSON.stringify(task)); //update the local storage
       let divTask = document.createElement('div'); // create a div element and stores it in divTask Variable.
       divToAddTask.appendChild(divTask).classList.add('work-list-box'); //add the div to #content and add "work-list-box" class to it.
       for(let i = 0; i<task.length;i++){ 
       divTask.setAttribute("id", `${i}`); // add id to each div.
       divTask.innerHTML=`<input style="display:none" type="checkbox" id="input${i}" class="work-list-checkbox"><input type="checkbox" id="checkbox${i}" class="work-list-checkbox main-checkbox"> <span id="span${i}"> ${taskName} </span> <ion-icon id="delete${i}" class="delete-icon" name="trash-outline"></ion-icon> <ion-icon id="edit${i}" class="edit-icon" name="create-outline">`;  // div content.
       hideSection3(); // after create a div the section-3 will be hidden.
       defaultImg.style.display='none'; // after a div is create the default img (detective) will be hidden as it is not empty anymore.
       window.location.reload(); // reload the webpage to update the value of the new div created.
      }
}
    else{ // if the task name already EXIST.
      nameInput.value = '';  //the entered value will become blank.
      nameInput.placeholder = 'This name is already in use.' // update placeholder.
      nameInput.style.borderColor = 'red'; // change the border color. to get user attention.
    }
  }
};




addButton.onclick = ()=>{ // when the add button (+) is clicked then the section-3 will appear.
  hiddenSection.style.display='block';
  document.body.style.overflow = 'hidden';
  nameInput.value = '';
  document.querySelector('#note-input').focus();
};


cancelButton.onclick = hideSection3;

blackScreen.onclick = hideSection3;

darkmode.onclick = changeTheme;
applyButton.onclick = addTask;




// EVENT LISTENERS ----->>>



// DELETE TASKS... --->>>> 


  const deleteIcons = document.querySelectorAll('.delete-icon'); // stores all the delete icon inside it.

  deleteIcons.forEach((deleteIcon) => { // Iterate over each delete icon.
    deleteIcon.addEventListener( 'click',() =>{ // add onClick event listener to each delete-icon.
  const divToDelete = deleteIcon.parentNode; //gets the parent node of the delete-icon which is clicked.
  divToDelete.style.transform = 'scale(1.1)'; 
  divToDelete.style.transition = 'all 0.2s ease-in-out';

  setTimeout(() => { //added timeout so the animation can complete.
      const spanElement = document.getElementById(`span${divToDelete.id}`); // stores the span element.
      if (spanElement) { // if the spanElement got a value then.
          task = task.filter((taskName) => taskName !== spanElement.innerText.trim()); // create new array without the task which is going to be deleted and stores the new array value to the task variable.
          localStorage.setItem('Task', JSON.stringify(task)); // update the 'Task' key with the updated task value.
          divToDelete.remove(); // delete the div.
      checkedTask = checkedTask.filter((id) => id !== `checkbox${divToDelete.id}`); //if the div was a completed task then it will create a new array without that div. and update the value of checkedTask array with it.
      localStorage.setItem('completed',JSON.stringify(checkedTask)); // update the "completed" key.
      }
  }, 200);
})
  });




// CHECKBOX (CHECK,UNCHECK) --->>>



const checkboxAll = document.querySelectorAll('.work-list-box>.main-checkbox'); //store all checkboxes 

checkboxAll.forEach((checkbox) => { // Iterate over each checkbox.
  checkbox.addEventListener('change',() =>{ //add "change" event listener to each checkbox.
    if (checkbox.checked) { //if any checkbox get's checked.
      let getSpanId = checkbox.id.replace('checkbox', ''); // get the checkbox Id.
      let spanDiv = document.querySelector(`#span${getSpanId}`); // get the span Id which stores the task name.
      let getSpanText = spanDiv.innerText; //get the task name which is inside span.

      let taskAlreadyChecked = false; 

      checkedTask.forEach((checkedId) => { // check wheter the checkbox which is clicked already checked or not.
        if (`checkbox${checkedId}` === checkbox.id) {
          taskAlreadyChecked = true;
        }
      });
      if (!taskAlreadyChecked) { // if not checked then.
        spanDiv.innerHTML = `<strike>${getSpanText}</strike>`;
        spanDiv.style.color = '#B2B1B1';
        checkedTask.push(`checkbox${getSpanId}`); // add it to the checkedTask array from last.
        localStorage.setItem('completed', JSON.stringify(checkedTask)); // update local storage.
      } else {
        console.log(`checkbox${checkbox.id} is already in the checkbox list`);
      }
    }
    else{ // if the checkbox is removed.
      let getSpanId= checkbox.id.replace('checkbox','');  // get checkbox id
      let spanDiv = document.querySelector(`#span${getSpanId}`); // get span div
      let getSpanText = spanDiv.innerText; //get span text || task name.
      spanDiv.innerHTML = `${getSpanText}`;
      spanDiv.style.color = 'var(--heading-color)';
      checkedTask = checkedTask.filter((id) => id !== `checkbox${getSpanId}`);
      localStorage.setItem('completed',JSON.stringify(checkedTask));
    }
    }
  )
  });




  // EDIT TASK ---->>>>>>



const editIcons = document.querySelectorAll('.edit-icon'); //store each edit icon.
let countforedit = 0;


editIcons.forEach(editIcon => { // itreate over each edit icon
  editIcon.addEventListener('click', () => { //add click event listener to each
    if(countforedit==0){ // condition to make sure only ONE task is edited at a time
      const divToEdit = editIcon.parentNode; // get edit icon parent node / div
      changeInputType(divToEdit);
    }
});
});

function changeInputType(divToEdit){
    divId = divToEdit.id;
    console.log(divId);
    input = document.querySelector(`#input${divId}`);
    document.querySelector(`#checkbox${divId}`).style.display = 'none';
    input.style.display = '';
    spanText = document.getElementById(`span${divId}`).innerText;
    document.getElementById(`span${divId}`).innerHTML = `<ion-icon id="done${divId}" style="color:green; cursor: pointer;position: relative;top: 9px;font-size:27px" name="checkmark-outline"></ion-icon> <ion-icon id="undo${divId}" style="color:red;cursor: pointer;position: relative;top: 8px;font-size:23px" name="close-circle-outline"></ion-icon>`;
    input.setAttribute('type','text');
    input.value = spanText;
    input.style.width = '60%';
    input.style.borderColor = '#EC3D3E';
    input.style.paddingLeft = '20px'
    input.style.fontSize = '10px'
    input.style.cursor= 'auto';
    input.style.color = 'var(--heading-color)'
    input.style.transition = 'all 1s ease-in-out';
    input.style.marginLeft = '75px';
    input.focus();
    document.querySelector(`#delete${divId}`).style.display = 'none';
    document.querySelector(`#edit${divId}`).style.display = 'none';
    countforedit++;


    document.querySelector(`#done${divId}`).onclick = () => { // if the done icon is clicked.
      if(input.value.length > 0){ // the new name should have atleast 1 letter.
      task[divId] = input.value;
      localStorage.setItem('Task', JSON.stringify(task)); // update the div with new name in "Task" key.
      input.style.width = '';
      input.style.cursor= 'pointer';
      input.style.width = '16px'  
      input.style.height='16px';
    input.style.borderColor = 'var(--btn-color)';
      input.setAttribute('type','checkbox');
    input.style.paddingLeft = '0px'
      input.style.marginLeft = '0px';
      input.style.transition = 'all 1s ease-in-out';
      if(document.querySelector(`#checkbox${divId}`).checked)// if the div which is edited was completed task.
      { 
      document.getElementById(`span${divId}`).innerHTML = `<strike> ${input.value} </strike>`;
      }
      else{ // if the div was not a completed task.
      document.getElementById(`span${divId}`).innerText = input.value;
      }
      document.querySelector(`#delete${divId}`).style.display = 'block';
      document.querySelector(`#edit${divId}`).style.display = 'block';
      setTimeout(()=>{
      let checkbox = document.querySelector(`#checkbox${divId}`).style.display = '';
      input.style.display='none';
      },950)
      countforedit=0;
      }
      else{// if the new name have less then 1 letter.
        console.log('No value given'); 
        input.setAttribute('placeholder','Please enter the name of your task.');
      }
      }
    

    document.querySelector(`#undo${divId}`).onclick = () => { // if cross icon is clicked.
        input.style.width = '';
        input.style.cursor= 'pointer';
        input.style.width = '16px'
        input.style.height='16px';
      input.style.borderColor = 'var(--btn-color)';
        input.setAttribute('type','checkbox');
      input.style.paddingLeft = '0px'
        input.style.marginLeft = '0px';
        input.style.transition = 'all 1s ease-in-out';
        if(document.querySelector(`#checkbox${divId}`).checked)
        { 
        document.getElementById(`span${divId}`).innerHTML = `<strike> ${input.value} </strike>`;
        }
        else{
        document.getElementById(`span${divId}`).innerText = input.value;
        }
        document.querySelector(`#delete${divId}`).style.display = 'block';
        document.querySelector(`#edit${divId}`).style.display = 'block';
        setTimeout(()=>{
          let checkbox = document.querySelector(`#checkbox${divId}`).style.display = '';
          input.style.display='none';
          },950)
        countforedit=0;
    };
}



// SEARCH TASKS -------->>>>>>



function search() {  // search function
  const valToSearch = inputSearch.value.trim().toLowerCase(); //convert the input value to lower case to avoid (Case-sensitivity) and remove the blank space from beggining and end.
  for (let i = 0; i < task.length; i++) { // Itreate over each task.
    const taskText = document.querySelector(`#span${i}`).textContent.trim().toLowerCase(); // convert each task text to lower case to match with the input and remove blank space from beggining and end.

    const taskElement = document.getElementById(`${i}`); // select the div.

    if (taskText.includes(valToSearch)) { // if the inputed value is anywhere in the taskName.
      taskElement.style.display = '';// shows the only matched div
    } else if (taskText === "") {
      taskElement.style.display = 'block'; // show all div if the input is cleared.
    } else {
      taskElement.style.display = 'none';  // hide all the div which is not matched with the task name.
    }
  }
}
const inputSearch = document.querySelector('#inputSearch'); // gets the input box.
inputSearch.addEventListener('input', search); // add event listener to the input box.



// FILTER TASK (ALL, COMPLETED, UNCOMPLETED)


filterSearch.addEventListener('change',function(){  // when the dropdown box value is changed.
  const filterValue = this.value; // get the dropdox box value.
  if(filterValue==='all'){ // display all task.
    task.forEach((element, index) => {
      document.getElementById(`${index}`).style.display = 'block'; 
    });
  }
  else if(this.value=='complete'){// display only completed task
   task.forEach((element, index) => { 
      const contain = checkedTask.includes(`checkbox${index}`) 
      document.getElementById(`${index}`).style.display = contain ? 'block' : 'none';
    });
  
}
  else if(filterValue=='incomplete'){ // display only incomplete task
    task.forEach((element, index) => {
      const contain = checkedTask.includes(`checkbox${index}`);
      document.getElementById(`${index}`).style.display = contain ? 'none' : 'block';
    })
  }
});

document.getElementById('note-input').addEventListener('input', function (event) {
  const validPattern = /^[a-zA-Z0-9 ]*$/;
  const inputValue = event.target.value;

  if (!validPattern.test(inputValue)) {
      event.target.value = inputValue.slice(0, -1);
  }
});
