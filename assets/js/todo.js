//get todos from localStorage
let todos = localStorage.getItem("todos");
//creating element for showing todos in table
const todoTableBox = document.createElement("div"); 
// get add &  search btns
const btnAdd = document.querySelector(".btn-add");
const btnSearch = document.querySelector(".btn-search");
// creating element for showing add or search input
const formBox = document.createElement("div"); 

//try parse data or null
try{
    todos = JSON.parse(todos);
    todos = (Array.isArray(todos) && todos.length!=0) ? todos : null;
}catch(e){
    todos = null;
}

//set default values if todos is null
if(!todos){
    todos = [
        {todo:"go shopping",done:false},
        {todo:"watch movies",done:false},
        {todo:"like movies",done:false}
    ]
    localStorage.setItem("todos",JSON.stringify(todos));
}

//delete todos function 
const removeTodo = (indexRemoveTodo)=>{
    todos.splice(indexRemoveTodo,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    showTodos(todos);
}

//add todos function
const addTodo = (todoItem)=>{
    todos.push({todo : todoItem,done:false});
    localStorage.setItem("todos",JSON.stringify(todos));
    showTodos(todos);
}

//search todos function
const searchTodo = (searchedItem)=>{
    let searchedTodos = todos.filter(element=>element.todo.includes(searchedItem));
    if(searchedItem.length ==0){
        searchedTodos = todos;
    }
    showTodos(searchedTodos);
}

//show todos functionality
const showTodos = (todosList)=>{
    todoTableBox.className = "todo-table-box";
    document.querySelector(".content").append(todoTableBox);
    todoTableBox.innerHTML = `<table class="todo-table"><tbody class="tbody-table"></tbody></table>`;
    const tbodyTable = document.querySelector(".tbody-table");
    tbodyTable.innerHTML = "";
    todosList.forEach((element,index)=>{
        if(element.done == true){
            tbodyTable.innerHTML += ` <tr class="tr-table">
            <td class="td-table done-todo"><span>${element.todo}</span></td>
            <td class="td-table"><i class="fa fa-close"></i></td>
            </tr>`;
        }
        else{
            tbodyTable.innerHTML += ` <tr class="tr-table">
            <td class="td-table"><span>${element.todo}</span></td>
            <td class="td-table"><i class="fa fa-close"></i></td>
            </tr>`;
        }
        const rows = [...tbodyTable.querySelectorAll("tr")];
        rows.forEach((row,index)=>{
            //deleted todo
            row.querySelector("i").addEventListener("click",event=>{
                removeTodo(index)
            })
            //doned todo
            row.querySelector("span").addEventListener("click",event=>{
                todosList[index].done = !todosList[index].done;  
                todos.forEach((element,i)=>{
                    if(todos[i].todo == todosList[index].todo){
                        todos[i].done = todosList[index].done;
                    }
                })
                localStorage.setItem("todos",JSON.stringify(todos));
                showTodos(todosList);
            });
        })
           
           
        })
}
showTodos(todos);

//forEach on btns and create and show add or search forms 

btnAdd.addEventListener("click",event=>{
    formBox.className = "form-box";
    document.querySelector(".btn-add-search-box").after(formBox);
    formBox.innerHTML = `<form class="form-add-todo">
    <input type="text" placeholder="Add a todo..." id="addTodo" class="input-add-todo">
    </form>`;
    document.querySelector("form").addEventListener("submit",event=>{
        const input = event.target.firstElementChild;
        event.preventDefault();
        if(input.value.length!=0){
            addTodo(input.value.toLowerCase());
            input.value = "";
        }
    })
})


btnSearch.addEventListener("click",event=>{
    formBox.className = "form-box";
    document.querySelector(".btn-add-search-box").after(formBox);
    formBox.innerHTML =`<form class="form-search-todo">
    <input type="text" placeholder="Search a todo..." id="searchTodo" class="input-search-todo">
    </form>`;
    document.getElementById("searchTodo").addEventListener("keyup",event=>{
        searchTodo(event.target.value.toLowerCase());
    })

})