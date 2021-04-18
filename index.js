const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const Employee = require("../Employee_Badge/employee-list/employee")

const buildTeam = () =>
inquirer
.prompt([
  {
    type: 'list',
    message: 'What employee types would you like to add to this team?',
    name: 'employeeTypeList',
    choices: ['Engineer', 'Intern', 'No additional team members', ],
  },
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

// const buildEngineer = () =>
//   inquirer.prompt([{
//       type: 'input',
//       message: 'Engineers first name:',
//       name: 'engineerFirst',
//     },
//     {
//       type: 'input',
//       message: 'Engineers last name:',
//       name: 'engineerLast',
//     },
//     {
//       type: 'input',
//       message: 'Engineers Badge ID:',
//       name: 'engineerId',
//     },
//     {
//       type: 'input',
//       message: 'Engineer Email:',
//       name: 'engineerEmail',
//     },
//     {
//       type: 'list',
//       message: 'Would you like to add additional members to the team?',
//       name: 'employeeTypeList',
//       choices: ['Engineer', 'Intern', 'No additional team members', ]
//     }
//   ]);
// const buildIntern = () =>
//   inquirer.prompt([{
//       type: 'input',
//       message: 'Intern first name:',
//       name: 'internFirst',
//     },
//     {
//       type: 'input',
//       message: 'Intern last name:',
//       name: 'internLast',
//     },
//     {
//       type: 'input',
//       message: 'Intern Badge ID:',
//       name: 'internId',
//     },
//     {
//       type: 'input',
//       message: 'Intern Email:',
//       name: 'internEmail',
//     },
//     {
//       type: 'list',
//       message: 'Would you like to add additional members to the team?',
//       name: 'employeeTypeList',
//       choices: ['Engineer', 'Intern', 'No additional team members', ]
//     }
//   ]);

const generateEngineerCard = (response) =>
  `<div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Engineer</h5>
        <h6 class="card-subtitle mb-2 text-muted">${response.engineerFirst} ${response.engineerLast}</h6>
        <p class="card-text">Badge ID#: ${response.engineerId}<br>
        Email: ${response.engineerEmail}</p>
      </div>
    </div>`
const generateInternCard = (response) =>
  `<div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Intern</h5>
        <h6 class="card-subtitle mb-2 text-muted">${response.internFirst} ${response.internLast}</h6>
        <p class="card-text">Badge ID#: ${response.internId}<br>
        Email: ${response.internEmail}</p>
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
  </head>
  <body>
      <div class= "companyName">
        <h1>Amazon Employee Badges</h1>
      </div>
      <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Manager</h5>
        <h6 class="card-subtitle mb-2 text-muted">${response.firstName} ${response.lastName}</h6>
        <p class="card-text">Badge ID#: ${response.managerId}<br>
        Email: ${response.managerEmail}</p>
      </div>
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
    console.log(response.employeeTypeList);
    // If user selects "Engineer", menu to input engineer information will be displayed
    if (response.employeeTypeList === 'Engineer') {
      console.log("engineer");
      buildEngineer().then((response) => {
        console.log(response.employeeTypeList);
      });
    }
    // If user selects "Intern", menu to input intern information will be displayed
    else if (response.employeeTypeList === 'Intern') {
      console.log("intern");
      buildIntern().then((response) => {
        console.log(response.employeeTypeList)
      });
    }
    // HTML file set to write once user indicates they would not like to add additional team members
    else if (response.employeeTypeList === 'No additional team members') {
      writeFileAsync('index.html', generateHTML(response));
      console.log('Successfully generated HTML')
    }


  })
  .catch((err) => console.error(err))