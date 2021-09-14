$(document).ready(()=>{

    const display = $("#display");
    const form = $("#form");
    const taskUserInput = $("#taskUserInput");
    const message = $("#message");
    message.hide();

    const displayMessage = (flag,msg)=>{
        // successful
        if(flag){
            message.removeClass('alert-danger');
            message.addClass('alert-success');
            message.html(msg);
            message.show();
        }
        else{
            message.removeClass('alert-success');
            message.addClass('alert-danger');
            message.html(msg);
            message.show();
        }
    }

    const buildIDS = (todo)=>{
        return {
            pageID : "page_"+ todo._id,
            editID : "edit_" + todo._id,
            deleteID : "delete_" + todo._id,
            listItemID : "listItem_" + todo._id,
            todoID : "todo_" + todo._id
        }
    }

    const buildTemplate = (todo,ids)=>{
        var nameId=todo._id+'-'+todo.task;
        return `<li style="margin-bottom: 5px;" class="list-group-item" id="${ids.listItemID}">
                    <div class="row">
                        <div class="col-md-2" id="${ids.todoID}" style="margin-top: 9px;">${todo.task}</div>
                        <div class="col-md-4" style="margin-top: 9px;">${todo.createdAt}</div>
                        <div class="col-md-6 text-right">
                            <form style="display: inline;margin-top: 8px;" action="/user/taskPage/${nameId}" method="POST">
                                <button type="submit" class="btn textColor" style="background-color: #DDBE15;"><span class="glyphicon glyphicon-log-out"></span> Update</button>
                            </form>
                            <button type="button" class="btn btn-secondary" id="${ids.editID}">Edit</button>
                            <button type="button" class="btn btn-danger" id="${ids.deleteID}">Delete</button>
                        </div>
                    </div>
               </li>`;
    }

    const displayTodos = (data)=>{
        data.forEach((todo)=>{
            let ids = buildIDS(todo);
            display.append(buildTemplate(todo,ids));
            editTodo(todo,ids.todoID,ids.editID);
            deleteTodo(todo,ids.listItemID,ids.deleteID);
        });
    }

    const editTodo = (todo,todoID,editID)=>{
        let editBtn = $(`#${editID}`);
        editBtn.click(()=>{
            fetch(`/user/task/${todo._id}`,{
                method : "put",
                headers : {
                    "Content-Type" : "application/json; charset=utf-8" 
                },
                body : JSON.stringify({task : taskUserInput.val()})
            }).then((response)=>{
                console.log(response);
                return response.json();
            }).then((data)=>{
                console.log(data);
                // let todoIndex = $(`#${todoID}`);
                // todoIndex.html(data.task);
                display.empty();
                getTodos();
                resetTodosInput();
                displayMessage(true,"Edit Successful");
            });
        });
    }

    const deleteTodo = (todo,listItemID,deleteID)=>{
        let deleteBtn = $(`#${deleteID}`);
        deleteBtn.click(()=>{
            fetch(`/user/task/${todo._id}`,{
                method: "delete"
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                displayMessage(false,"Delete Successful");
                $(`#${listItemID}`).remove();
            });
        });
    }

    const getTodos = ()=>{
        fetch('/user/taskWithId',{method : "get"}).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            displayTodos(data);
        });
    }

    getTodos();

    const resetTodosInput = ()=>{
        taskUserInput.val('');
    }

    form.submit((e)=>{
        console.log("1.i am in form");
        e.preventDefault();
        fetch('/user/task',{
            method : 'post',
            body : JSON.stringify({task : taskUserInput.val()}),
            headers : {
                "Content-Type" : "application/json; charset=utf-8"
            }
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(!data.error){
                const todo={
                    _id: data['_id'],
                    uid: data['uid'],
                    task: data['task'],
                    createdAt: data['createdAt']
                };
                console.log(todo);
                let ids = buildIDS(todo);
                display.append(buildTemplate(todo,ids));
                editTodo(todo,ids.todoID,ids.editID);
                deleteTodo(todo,ids.listItemID,ids.deleteID);
                displayMessage(true,"Insert Successful");
                // if(data.result.ok == 1 && data.result.n == 1){
                //     console.log(data);
                //     getTodos();
                //     // let ids = buildIDS(data.document);
                //     // display.append(buildTemplate(data.document,ids));
                //     // editTodo(data.document,ids.todoID,ids.editID);
                //     // deleteTodo(data.document,ids.listItemID,ids.deleteID);
                //     // displayMessage(true,data.msg);
                // }
            }
            else{
                console.log('fail');
                displayMessage(false,"Insert Fail");
            }

            resetTodosInput();
            
        });
    });

});