accountDetails = {
    1000: { accno: 1000, name: "userone", balance: 5000, password: "user1" },
    1002: { accno: 1002, name: "usertwo", balance: 5000, password: "user2" },
    1003: { accno: 1003, name: "userthree", balance: 7000, password: "user3" },
    1004: { accno: 1004, name: "userfour", balance: 5000, password: "user4" },
    1005: { accno: 1005, name: "userfive", balance: 3000, password: "user5" },
}
let currentUser

const register = (accno, name, password) => {
    console.log("register called");
    if (accno in accountDetails) {


        return {
            status: false,
            statusCode:422,
            message: "user already exist,please login"
        }
    }

    accountDetails[accno] = {
        accno,
        balance: 0,
        name,
        password
    }
    console.log(accountDetails);
    return {
        status: true,
        statusCode:200,
        message: "registration sucessful"
    }
}


const login = (req,accno, pswd) => {
    //this.getDetails()
    var dataset = accountDetails;

    if (accno in dataset) {
        var pswd1 = dataset[accno].password
        if (pswd1 == pswd) {
          req.session.currentUser = dataset[accno].name
           // this.saveDetails()

            return {
                status: true,
                statusCode:200,
                message: "login sucess"
            }
        }
        else {
            return {
                status: false,
                statusCode:422,
                message: "incorrect password"
            }
        }
    }
    else {
        return {
            status: false,
            statusCode:422,
            message: "no user exist,register new one"
        }
    }
}


const deposit=(accno,pswd,amt) =>{
   // this.getDetails()
    
    var dataset = accountDetails;
    if (accno in dataset) {
      var pswd1 = dataset[accno].password
      if (pswd1 == pswd) {
        var bal = parseInt(amt)
        dataset[accno].balance += bal
       // this.saveDetails()
       return {
        status: true,
        statusCode:200,
        message: "amount credicted",
        balance:dataset[accno].balance
    }
      //  alert("amount credicted.new balance:" + this.accountDetails[accno].balance)


      }
      else {
        return {
            status: false,
            statusCode:422,
            message: "invalid password"
        }

      }
    }
    else {

        return {
            status: false,
            statusCode:422,
            message: "invalid user"
        }


    }
  }
  const withdraw=(accno, pswd, amt)=> {
   // this.getDetails()
    // if(!req.session.currentUser){
    //     return {
    //         status: false,
    //         statusCode:404,
    //         message: "please login"
    //     }
    // }
    var dataset = accountDetails;
    if (accno in dataset) {
      var pswd1 = dataset[accno].password
      //console.log(pswd);

      if (pswd1 == pswd) {
        var amd = parseInt(amt)
        if (amd >= dataset[accno].balance) {
            return {
                status: false,
                statusCode:422,
                message: "insufficient balance"
            }
        }
        else {
          dataset[accno].balance -= amd
          return {
            status: true,
            statusCode:200,
            message: "amount debited",
            balance:dataset[accno].balance
        }         // this.saveDetails()
        }

      }
      else {
        return {
            status: false,
            statusCode:422,
            message: "invalid user",
        }
      }
    }
  }

module.exports = {
    register,
    login,
    deposit,
    withdraw

}