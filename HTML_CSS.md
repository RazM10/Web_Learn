# Htnl-Css-learn

[Read_Me](https://github.com/RazM10/Web_Learn/blob/master/README.md)
[Ejs](https://github.com/RazM10/Web_Learn/blob/master/EJS.md)
[Js](https://github.com/RazM10/Web_Learn/blob/master/JS.md)

## Table of contents
- [Menu page finding](#menu-page-finding)
- [Float](#float)
- [Flex](#flex)
- [Position](#position)
- [Ancor tag](#ancor-tag)
- [css variable](#css-variable)

## Menu page finding

- Adding scrolling in sidebar menu by setting 'overflow: auto;' in '.wrapper .sidebar' class design 
- Also remove scrollbar showing side of sidebar menu by adding '.wrapper .sidebar::-webkit-scrollbar' style 

[Files](https://github.com/RazM10/Web_Learn/blob/master/files/scrolling.html)

<img height="380px" src="https://github.com/RazM10/Web_Learn/blob/master/images/scrolling.PNG">

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

## Test css

- font
```
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins" , sans-serif;
}

font-size: 20px;
font-weight: 500;
```

- width
```
// 4 types of page layout are there: 
// 	1. static page(used fix size) 
// 	2. liquid page (used % in size)
//  3. adaptive page layout (used @media (max-width: 420px){...})
//  4. responsive page layout (liquid + adaptive)

// width calculation, when we set any fix size
width: calc(100% / 4 - 15px);

// another example with position
.home-section{
  position: relative;
  min-height: 100vh;
  top: 0;
  left: 78px;
  width: calc(100% - 78px);
}
// open used as like active class for side bar.
.sidebar.open ~ .home-section{
  left: 250px;
  width: calc(100% - 250px);
}
```

- margin
```
margin: top right bottom left;
margin: vertical horizontal;
```

- border
```
width: calc(100% / 3 - 15px);
border-color: #d0d7de;
border-style: solid;
border-width: 1px;
border-radius: 6px;
```

- border-radius
```
// set round shape to element
border-radius: 12px;

// another, work like circle
border-radius: 50%;
```

- box-shadow/ elevation
```
// it will set shadow arount box. like elevation
box-shadow: 0 5px 10px rgba(0,0,0,0.1);

// another
border-shadow: 2px 3px 4px 5px blue;
border-shadow: horizontal vertical blur spread color;
```

- Center element
```
// to keep cente
align-items: center; // works for vertical center
justify-content: center; // works for horizontal center

// like row CrossAxisAlignment: center (-=) -> (--)
display: flex;
align-items: center;

// also use like space-between of row items (---) -> ( - - - - )
display: flex;
justify-content: space-between / space-around / start / end / center;

// also used for perfectly center
height: 20px;
width: 20px;
background: #8FDACB;
line-height: 20px;
text-align: center;
```

- display: it convert block element -> inline element, or vise-versa
```
// use of display: flex
display: flex;
// input 
---
  ---1
  ---2
  ---
    ---3
  ---
---
// output
1  3
2

display: block/ inline;
// input
---
  ---1
  ---2
---

//output
// display: block;
1
2

// display: inline
1 2
```

- float: left / right
```
1 2
// to keep block elements side by side. used for block elements.
```

- Overflow: hidden / scroll
```
overflow: hidden;
// one div is separated from another div.
// or when one element go outside from border.
```

## Float

```
<div style="background:yellow; width:100%;">
	<div style="background:red; width:50%; float:left;">
    	<h5>Hello</h5>
    </div>
    
    <div style="background:blue; width:50%; float:right;">
    	<h5>Hello</h5>
    </div>
</div>
```
<img height="150px" src="https://github.com/RazM10/Web_Learn/blob/master/images/float.PNG">

## Flex

```
diplay: flex;

flex-direction: row; // for row or column

flex-wrap: wrap; // working like wrapping

justify-content: space-around; // like mainAxisAlignment of row. column->mainAxisALignment

align-items: center; // like crossAxisAlignment of row. column->crossAxisAlignment

align-self: flex-end; // to override the parent crossAxisAliment property by the applied child in row

align-content: center; // only for using on multi-line flex-box container, to keep all container at start/end/center
			// add a height to flex-box container to see the result

// working on sigle div of flex container
flex-shrink: 0; // work like fixed size & it will not shrink.

flex-grow: 1; // work like Expanded(flex: 1;) & coved all empty spaces by the applied item.

align-self: flex-end; // to override the parent crossAxisAliment property by the applied child in row

order: 1; // set serial to child of parent
```

- align-items: center; (crossAxisAlignment of row)

<img height="380px" src="https://github.com/RazM10/Web_Learn/blob/master/images/flex_1.PNG">

- align-content: flex-end; (can see the result, when used big height)

<img height="380px" src="https://github.com/RazM10/Web_Learn/blob/master/images/flex_2.PNG">

- align-self: flex-end; (apply on child)

<img height="380px" src="https://github.com/RazM10/Web_Learn/blob/master/images/flex_3.PNG">

## Position

- static: default page position(goto inspaction, then computed tab, then search for position). top, left, right, bottom can't apply on it.
- relative: top, left, right, bottom can apply on it. and it take distance from main body.
- absolute: div_1(relative) > div_2(absolute). div_2 take distance from div_1 not form main body. div_1 take from main body.
- sticky: the applied child will be kept fixed on top, when this child is reached to top.

<img height="380px" src="https://github.com/RazM10/Web_Learn/blob/master/images/position_1.PNG">

- Here 'One' is sticky, top will keep it fixed on top, when it reach to top. otherwise, it will on it's own place.

<img height="380px" src="https://github.com/RazM10/Web_Learn/blob/master/images/position_2.PNG">

## Ancor tag

- can set target="_blank/_self" to open page in new tab or current page
```
<a href="#" class="btn btn--bg" target="_blank">Live Link</a>
```

## css variable

```
:root {
  --blue: #1e90ff;
  --white: #ffffff; 
}

body {
  background-color: var(--blue);
}

h2 {
  border-bottom: 2px solid var(--blue);
}
```











