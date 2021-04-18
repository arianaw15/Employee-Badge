const { is } = require("@babel/types");
const { expect, test } = require("@jest/globals");
const { describe } = require("yargs");
const Employee = require("../employee-list/employee");

// test("Employee", ()=>{
test("isSame", ()=> {
is("Employee ID will fail if the same as another Employee ID", () =>{
    const employeeId = new Employee(12345);
    expect(this.isSame(employeeId)).toBe(false);
})
});
test("containsAt", ()=>{
    is("Employee email does not contain '@'",()=>{
        const employeeEmail = new Employee("arianaw15@gmail.com");
        expect(this.containsAt(employeeEmail).toBe(true));
})
});
// })

