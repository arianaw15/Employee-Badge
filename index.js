const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const Employee = require("../Employee-Badge/employee-list/employee")

const buildTeam = () =>
inquirer
.prompt([
  {
    type: 'list',
    message: 'What employee types would you like to add to this team?',
    name: 'employeeTypeList',
    choices: ['Engineer', 'Intern', 'No additional team members', ],
  },
  
])

const addEmployee = ()=>
inquirer
.prompt([
  {
    type: 'input',
    message: 'First name:',
    name: 'employeeFirstName',
  },
  {
    type: 'input',
    message: 'Last name:',
    name: 'employeeLastName',
  },
  {
    type: 'input',
    message: 'Employee Badge ID:',
    name: 'employeeID',
  },
  {
    type: 'input',
    message: 'Employee Email:',
    name: 'employeeEmail',
  },
])

//Manager Code
const buildManager = () =>
  inquirer
  .prompt([{
      type: 'input',
      message: 'Mangagers first name:',
      name: 'firstName',
    },
    {
      type: 'input',
      message: 'Mangagers last name:',
      name: 'lastName',
    },
    {
      type: 'input',
      message: 'Mangagers Badge ID:',
      name: 'managerId',
    },
    {
      type: 'input',
      message: 'Mangager Email:',
      name: 'managerEmail',
    },

  ]);


const generateEngineerCard = (response) =>
  `<div class="col-sm">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">Engineer<i class="large material-icons">developer_board</i></h5>
        <h6 class="card-subtitle mb-2 text-muted">${response.employeeFirstName} ${response.employeeLastName}</h6>
        <p class="card-text">Badge ID#: ${response.employeeID}<br>
        Email: ${response.employeeEmail}</p>
        
      </div>
    </div>
    </div>`
const generateInternCard = (response) =>
  `<div class="col-sm">
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">Intern<i class="large material-icons">local_cafe</i></h5>
    <h6 class="card-subtitle mb-2 text-muted">${response.employeeFirstName} ${response.employeeLastName}</h6>
    <p class="card-text">Badge ID#: ${response.employeeID}<br>
    Email: ${response.employeeEmail}</p>
    
  </div>
</div>
</div>`

let generateHTML = (response) =>
  `<!doctype html>
<html lang="en">
  <head>
    <title>Employee Badges</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
  <body>
  <div class="header">
      <h1>Employee Badges</h1>
    </div>
      <div class="container">
    <div class="row">
      <div class="col-sm">
      <div class="card">
      <div class="card-body">
        <h5 class="card-title">Manager<i class="large material-icons">account_circle</i></h5>
        <h6 class="card-subtitle mb-2 text-muted">${response.firstName} ${response.lastName}</h6>
        <p class="card-text">Badge ID#: ${response.managerId}<br>
        Email: ${response.managerEmail}</p>
      </div>
      </div>
      </div>`

const endHTML = () =>
    `</div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>`;

buildManager()
  .then((response) => {
    fs.writeFileSync('index.html', generateHTML(response));
      console.log('Successfully generated HTML');
    buildTeam().then((response)=>{
      console.log (response);
      if(response.employeeTypeList === 'Engineer'){
        addEmployee().then((response)=>{
          fs.appendFileSync('index.html',generateEngineerCard(response));
          buildTeam().then((response)=>{
            console.log (response);
            if(response.employeeTypeList === 'Engineer'){
              addEmployee().then((response)=>{
                fs.appendFileSync('index.html',generateEngineerCard(response));
              })
            }
            else if(response.employeeTypeList === 'Intern'){
              addEmployee().then((response)=>{
                fs.appendFileSync('index.html', generateInternCard(response))
              })
            }
            else if(response.employeeTypeList === 'No additional team members'){
              fs.appendFileSync('index.html',endHTML(response))
            }
          });
        })
      }
      else if(response.employeeTypeList === 'Intern'){
        addEmployee().then((response)=>{
          fs.appendFileSync('index.html', generateInternCard(response));
          buildTeam().then((response)=>{
            console.log (response);
            if(response.employeeTypeList === 'Engineer'){
              addEmployee().then((response)=>{
                fs.appendFileSync('index.html',generateEngineerCard(response));
              })
            }
            else if(response.employeeTypeList === 'Intern'){
              addEmployee().then((response)=>{
                fs.appendFileSync('index.html', generateInternCard(response))
              })
            }
            else if(response.employeeTypeList === 'No additional team members'){
              fs.appendFileSync('index.html',endHTML(response))
            }
          });
        })
      }
      else if(response.employeeTypeList === 'No additional team members'){
        fs.appendFileSync('index.html',endHTML(response))
      }
    });
    
  })
  .catch((err) => console.error(err))