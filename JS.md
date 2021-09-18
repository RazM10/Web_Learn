# Htnl-Css-learn

[Read_Me](https://github.com/RazM10/Web_Learn/blob/master/README.md)
[Ejs](https://github.com/RazM10/Web_Learn/blob/master/EJS.md)
[Html_Css](https://github.com/RazM10/Web_Learn/blob/master/HTML_CSS.md)

## Table of contents
- [Add litener for adding and removing class](#add-litener-for-adding-and-removing-class)
- [Using jquery with fetch api](#using-jquery-with-fetch-api)

## Add litener for adding and removing class

- Adding active class in body and nav item using javaScript
- Removing class by loop

```
  <script>
	// === for hamburger ===
    var hamburger = document.querySelector(".hamburger");
	hamburger.addEventListener("click", function(){
		document.querySelector("body").classList.toggle("active");
	})
	
	/*==================== LINK ACTIVE ====================*/
	const linkColor = document.querySelectorAll('.nav__link')

	function colorLink(){
		linkColor.forEach(l => l.classList.remove('active'))
		this.classList.add('active')
	}

	linkColor.forEach(l => l.addEventListener('click', colorLink))
  </script>
```

## Using jquery with fetch api

- Add jquery library
```
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
```

```
// tag to show msg
<div class="alert" role="alert" id="message"> </div>

// tag of list to show data
<ul class="list-group" id="display"> </ul>

// form to post data from client side
<form id="form">
	<div class="form-group">
		<label for="todo" style="color: #DDBE15;font-size: 30px;">Enter your task</label>
		<input type="text" class="form-control" id="taskUserInput" placeholder="Task">
		<button type="submit" class="btn btn-primary" style="background-color: #DDBE15;">Add</button><br><br><br><br>
	</div>
	
</form>


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
}
```

- 'li' add in 'ul'
```
// js

// build unique ids to delete & edit items
const buildIDS = (todo)=>{
	return {
		pageID : "page_"+ todo._id,
		editID : "edit_" + todo._id,
		deleteID : "delete_" + todo._id,
		listItemID : "listItem_" + todo._id,
		todoID : "todo_" + todo._id
	}
}

// templete to show list in 'ul' with id 'display' in html page prepare in js
const buildTemplate = (todo,ids)=>{
	var nameId=todo._id+'-'+todo.task;
	return `<li style="margin-bottom: 5px;" class="list-group-item" id="${ids.listItemID}">
				<div class="row">
					<div class="col-md-4" id="${ids.todoID}" style="margin-top: 9px;">${todo.task}</div>
					<div class="col-md-4" style="margin-top: 9px;">${todo.createdAt}</div>
					<div class="col-md-4 text-right">
						<form style="display: inline;margin-top: 8px;" action="/todo/taskPage/${nameId}" method="POST">
							<button type="submit" class="btn textColor" style="background-color: #DDBE15;">Edit</button>
						</form>
						<button type="button" class="btn btn-danger" id="${ids.deleteID}">Delete</button>
					</div>
				</div>
		   </li>`;
}

// apply forEach loop on data list. data list from server
const displayTodos = (data)=>{
	data.forEach((todo)=>{
		let ids = buildIDS(todo);
		display.append(buildTemplate(todo,ids));
		editTodo(todo,ids.todoID,ids.editID);
		deleteTodo(todo,ids.listItemID,ids.deleteID);
	});
}
```

- Data get from route and show in ejs using fetch api
```
//get all task of specific user
router.get('/taskWithId',checkAuthenticated, async (req, res) => {
    try {
        const todo = await Task.find( { "uid": req.user.id } );
        res.json(todo);
    } catch (error) {
        res.json({ message: error });
    }
});

// fetch method to get data from server. call 'displayTodos(data);' function after getting data.
const getTodos = ()=>{
	fetch('/todo/taskWithId',{method : "get"}).then((response)=>{
		return response.json();
	}).then((data)=>{
		console.log(data);
		displayTodos(data);
	});
}
getTodos(); // call functuon in <script>
```

- Update route with fetch api
```
//update a task & return updated data
router.put('/task/:taskId', async (req, res) => {
    try {
        const updateTodo = await Task.updateOne(
            { _id: req.params.taskId },
            { $set: { task: req.body.task } },{returnOriginal : true},(err,result)=>{
                if(err)
                    console.log(err)
                else{
                    res.json(result);
                }      
            });
        // res.send(updateTodo);
    } catch (error) {
        res.send(error);
    }
});


// fetch method for edit data
const editTodo = (todo,todoID,editID)=>{
	let editBtn = $(`#${editID}`);
	editBtn.click(()=>{
		fetch(`/todo/task/${todo._id}`,{
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
```

- Delete route with fetch api
```
//Delete a Task
router.delete('/task/:taskId',checkAuthenticated, async (req, res) => {
    try {
        const removeTask = await Task.deleteOne(
            { _id: req.params.taskId }
        );
        res.send(removeTask);
    } catch (error) {
        res.send({ message: error });
    }
});


// fetch method for delete data
const deleteTodo = (todo,listItemID,deleteID)=>{
	let deleteBtn = $(`#${deleteID}`);
	deleteBtn.click(()=>{
		fetch(`/todo/task/${todo._id}`,{
			method: "delete"
		}).then((response)=>{
			return response.json();
		}).then((data)=>{
			displayMessage(false,"Delete Successful");
			$(`#${listItemID}`).remove();
		});
	});
}

// fetch method for post form data
form.submit((e)=>{
	console.log("1.i am in form");
	e.preventDefault();
	fetch('/todo/task',{
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

// to clear user input field
const resetTodosInput = ()=>{
	taskUserInput.val('');
}

 
```





