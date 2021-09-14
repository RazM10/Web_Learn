# Htnl-Css-learn

[Read_Me](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/README.md)
[Ejs](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/EJS.md)
[Html_Css](https://github.com/RazMunir/Flutter-learn/blob/main/cheatsheet_nodejs/HTML_CSS.md)

## Table of contents
- [Add litener for adding and removing class](#add-litener-for-adding-and-removing-class)

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



