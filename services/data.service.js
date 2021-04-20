
const db = require('./db')



// accountDetails = {
//     1000: { accno: 1000, name: "userone", balance: 5000, password: "user1" },
//     1002: { accno: 1002, name: "usertwo", balance: 5000, password: "user2" },
//     1003: { accno: 1003, name: "userthree", balance: 7000, password: "user3" },
//     1004: { accno: 1004, name: "userfour", balance: 5000, password: "user4" },
//     1005: { accno: 1005, name: "userfive", balance: 3000, password: "user5" },
// }
let currentUser

const register = (accno, name, password) => {
    //  console.log("register called");
    return db.User.findOne({ accno }).then(user => {
        // console.log(user);
        if (user) {
            return {
                status: false,
                statusCode: 422,
                message: "user already exist,please login"

            }
        }
        else {
            const newUser = new db.User({
                accno,
                name,
                balance: 0,
                password

            });
            newUser.save();
            return {
                status: true,
                statusCode: 200,
                message: "registration sucessful"

            }
        }

    })



    // if (accno in accountDetails) {


    //     return {
    //         status: false,
    //         statusCode:422,
    //         message: "user already exist,please login"
    //     }
    // }

    // accountDetails[accno] = {
    //     accno,
    //     balance: 0,
    //     name,
    //     password
    // }
    // console.log(accountDetails);
    // return {
    //     status: true,
    //     statusCode:200,
    //     message: "registration sucessful"
    // }
}


const login = (req, acno, pswd) => {

    //var acno = parseInt(accno1);
    return db.User.findOne({
        accno: acno,
        password: pswd
    }).then(user => {
        if (user) {
            req.session.currentUser = user.accno

            return {
                status: true,
                statusCode: 200,
                message: "login sucess",
                name: user.name,
                acno: user.accno
            }
        }
        return {
            status: false,
            statusCode: 422,
            message: "incorrect credentials"

        }
    })
}




const deposit = (req, acno, pswd, amt) => {
    // this.getDetails()
    //var acno = parseInt(accno1);

    var amt = parseInt(amt);
    return db.User.findOne({
        accno: acno,
        password: pswd
    }).then(user => {
        if (!user) {

            return {
                status: false,
                statusCode: 422,
                message: "incorrect credentials"

            }


        }

        user.balance += amt;
        user.save();
        return {
            status: true,
            statusCode: 200,
            message: "amount credicted",
            balance: user.balance
        }


    })
}




const withdraw = (req, acno, pswd, amt) => {

    console.log(req.session.currentUser);
    var amt = parseInt(amt);
    return db.User.findOne({
        accno: acno,
        password: pswd
    }).then(user => {
        if (!user) {

            return {
                status: false,
                statusCode: 422,
                message: "incorrect credentials"

            }


        }
        if (req.session.currentUser != acno) {

            return {
                status: false,
                statusCode: 422,
                message: "permission denied"

            }
        }

        if (user.balance < amt) {
            return {
                status: false,
                statusCode: 422,
                message: "insufficient balance"

            }
        }

        user.balance -= amt;
        user.save();
        return {
            status: true,
            sdeleteAccountDetailstatusCode: 200,
            message: "amount debited",
            balance: user.balance
        }


    })
}

    const deleteAccountDetails = (acno) => {
        return db.User.deleteOne({
            accno: acno
        }).then(user => {
            if (!user) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "operation denied"
                      }
            }
                return {
                    status: true,
                    statusCode: 200,
                    message: "account number" + acno + "deleted succesfully"

                }

        })
    }



module.exports = {
    register,
    login,
    deposit,
    withdraw,
    deleteAccountDetails

}