function BankAccount(accountNumber, name, type, balance) {
  this.accountNumber = accountNumber;
  this.name = name;
  this.type = type;
  this.balance = balance;
  this.active = true;
  this.deposit = function (amount) {
    this.balance += amount;
  };
  this.withdraw = function (amount) {
    this.balance -= amount;
  };
  this.checkBalance = function () {
    return this.balance;
  };
  this.isActive = function () {
    return this.active;
  };
}

function getTotalBalance(...accounts) {
  let result = accounts
    .map(
      (singleAccount) =>
        singleAccount.isActive() && singleAccount.checkBalance()
    )
    .reduce((acc, curr) => acc + curr, 0);
  return result;
}
let account1 = new BankAccount(832743982, "Ronaldo", "current", 34);
let account2 = new BankAccount(87328423, "Mike Tyson", "savings", 23);
let account3 = new BankAccount(87328423, "David Beckham", "savings", 23);
let account4 = new BankAccount(87328423, "Tony Robbins", "current", 29);
let account5 = new BankAccount(87328423, "Elon Musk", "current", 8237);
let account6 = new BankAccount(87328423, "Bill Gates", "savings", 657);
let account7 = new BankAccount(87328423, "Nicholas Cage", "savings", 3);
let account8 = new BankAccount(87328423, "Jeff Bezos", "current", 9328);
let account9 = new BankAccount(87328423, "Katy Perry", "savings", 8);
let account10 = new BankAccount(87328423, "Jennifer Lopez", "savings", 78);

account5.deposit(100);
account2.deposit(5);
account6.withdraw(90);
account8.withdraw(328);
account8.deposit(30);
account3.active = false;
account7.active = false;
account9.active = false;
account4.active = false;

// console.log(account6.checkBalance());
// console.log(account2.checkBalance());
// console.log(account8.checkBalance());
// console.log(account3.isActive());
// console.log(account5.isActive());
// console.log(account9.isActive());

console.log(
  getTotalBalance(
    account1,
    account2,
    account3,
    account4,
    account5,
    account6,
    account7,
    account7,
    account8,
    account9,
    account10
  )
);
