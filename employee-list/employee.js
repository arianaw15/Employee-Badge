function Employee() {}
    // constructor() {
    //     this.ID = 12345;
    //     this.email = "arianaw15@gmail.com"
    // };
   Employee.prototype.isSame = function(ID) {
        if (this.ID = ID){
            return false
        }
    };
    Employee.prototype.containsAt = function(email) {
        let emailArray = email.split("");
        for (var x = 0; x > emailArray.length; x++) {
            if (emailArray[x] === "@") {
                return true
            } else {
                return false
            }
        }

    };


module.exports = Employee;