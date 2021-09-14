# Htnl-Css-learn

[Read_Me](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/README.md)
[Ejs](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/EJS.md)
[Js](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/JS.md)

## Table of contents
- [Menu page finding](#menu-page-finding)

## Menu page finding

- Adding scrolling in sidebar menu by setting 'overflow: auto;' in '.wrapper .sidebar' class design 
- Also remove scrollbar showing side of sidebar menu by adding '.wrapper .sidebar::-webkit-scrollbar' style 

[Files](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/files/scrolling.html)

<img height="380px" src="https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/images/scrolling.PNG">

```
.wrapper .sidebar{
	background: rgb(5, 68, 104);
	position: fixed;
	top: 0;
	left: 0;
	width: 225px;
	height: 100%;
	padding: 20px 0;
    overflow: auto;
    /* overflow-x: hidden; 
    overflow-x: auto;  */
    scrollbar-width: none; /* For mozilla */
	transition: all 0.5s ease;
}

/* For Google Chrome and others */
.wrapper .sidebar::-webkit-scrollbar {
  display: none;
}
```

- When menu is expanded, main div taking 80% width
- When menu is collapsed, mai div taking 100% width
- "transition: all 0.5s ease;" givig a nice animation when menu is expanded and collapsed

```
main{
	margin-left: 20%;
	width: 80%;
	transition: all 0.5s ease;
}

body.active main{
	margin-left: 0%;
	width: 100%;
}
```

- Adding poppins font in project

```
/*========== GOOGLE FONTS ==========*/
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

*{
	list-style: none;
	text-decoration: none;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	/* font-family: 'Open Sans', sans-serif; */
	font-family: 'Poppins', sans-serif;
}
```

- Adding active class in body and nav item using javaScript

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



