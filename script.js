class Expense_Tracker {

    Update_Balance = () => {
        let income = 0.00
        let expense = 0.00
        let bal = document.getElementById('balance')
        if(localStorage.getItem('Expense')!=null)
            expense=parseFloat(localStorage.getItem('Expense').substring(2))
        if (localStorage.getItem('Income')!=null)
            income= parseFloat(localStorage.getItem('Income').substring(2))
        let newbal=parseFloat(income-expense).toFixed(2)
        if(newbal<0)
            {
                newbal=(newbal*-1).toFixed(2)
                bal.innerText="-$"+newbal
            }
        else
            bal.innerText="$"+newbal
        localStorage.setItem('Balance',bal.innerText)
    }

    UpdateIncome = (num) => {
        let income = document.getElementById('money-plus')
        let newIncome = parseFloat(income.innerText.substring(2))
        newIncome=(newIncome+num).toFixed(2)
        income.innerText="+$"+newIncome
        localStorage.setItem('Income',income.innerText)
        this.Update_Balance()
    }

    UpdateExpense = (num) => {
        num=num*-1
        let expense = document.getElementById('money-minus')
        let newExpense = parseFloat(expense.innerText.substring(2))
        newExpense=(newExpense+num).toFixed(2)
        expense.innerText="-$"+newExpense
        localStorage.setItem('Expense',expense.innerText)
        this.Update_Balance()
    }

    Check_IncomeOrExpense = () => {
        let num = document.getElementById('amount')
        if(num.value.charAt(0)==='-')
        {
            this.UpdateExpense(parseFloat(num.value))
        }
        else
        {
            this.UpdateIncome(parseFloat(num.value))
        }
    }

    SetBalance = () => {
        let bal = document.getElementById('balance')
        bal.innerText=localStorage.getItem('Balance')
    }

    SetIncome = () => {
        let income = document.getElementById('money-plus')
        income.innerText=localStorage.getItem('Income')
    }

    SetExpense = () => {
        let expense = document.getElementById('money-minus')
        expense.innerText=localStorage.getItem('Expense')
    }


    UpdateTransaction = () => {
        //let details & let num from key in local storage
        let ID = parseInt(localStorage.getItem('Key'))
        for(let i=ID; i>=0; i--)
        {
            let key = ""+i
            let details = localStorage.getItem(key)
            if (details!=null)
            {
                let newitem = document.createElement('li')
                newitem.id=key
                let purpose = details.substring(1,details.indexOf(','))
                let amount = parseFloat(details.substring(details.indexOf(',')+1,details.length-1))
                amount=amount.toFixed(2)
                newitem.className=amount<0?"minus":"plus"
                newitem.onclick = () =>{
                    if(newitem.className==="minus")
                        this.UpdateExpense(amount*-1)
                    else
                        this.UpdateIncome(amount*-1)
                    localStorage.removeItem(newitem.id)
                    location.reload()
                }
                let add_details = document.createElement('span')
                let add_num = document.createElement('span')
                add_details.innerText=purpose
                add_num.innerText=amount
                document.getElementById("list").append(newitem)
                document.getElementById(key).append(add_details)
                document.getElementById(key).append(add_num)
            }
            else
                continue
        }  
    }

    Update_History = () => {
        let details = document.getElementById('text')
        let num = document.getElementById('amount')
        let key = parseInt(localStorage.getItem('Key'))
        key=key+1
        localStorage.setItem('Key',key)
        let transaction = "["+details.value+","+num.value+"]"
        localStorage.setItem(key,transaction)
        this.Check_IncomeOrExpense()
    }

}

window.onload = () => {
    let ET = new Expense_Tracker()
    if(localStorage.getItem('Balance')!=null)
        ET.SetBalance()
    if(localStorage.getItem('Income')!=null)
        ET.SetIncome()
    if(localStorage.getItem('Expense')!=null)
        ET.SetExpense()
    if(localStorage.getItem('Key')==null)
        localStorage.setItem('Key',"-1")
    else
        ET.UpdateTransaction()
    Add_transaction = () =>{
        ET.Update_History()
    }
}