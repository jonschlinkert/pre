# Comments


## Block Comments

CSS-style block comments are preserved by Pre:

```css
.content {
  color: black; /* Hello, I'm a CSS-style comment. I will be preserved. */
}
```
This type of comment is appropriate for block comments that expected to render outside of the element, so the above will render as follows:

```html
<div class="content"></div><!-- Hello, I'm a CSS-style comment. I will be preserved. -->
```
However, this

```css
.content {
  color: black;
}
/* Hello, I'm a CSS-style comment. */
```
also renders to this:

```html
<div class="content"></div>
<!-- Hello, I'm a CSS-style comment. I will be preserved. -->
```
But this

```css
/* Hello, I'm a CSS-style comment. */
.content {
  color: black;
}
```
renders to this:

```html
<!-- Hello, I'm a CSS-style comment. I will be preserved. -->
<div class="content"></div>
```
as would be expected...

### Text-Node, Inline Comments

Need a comment to render inside a text node? No problem, just do this:

```css
.content {
  color: black;
  text: "Welcome to our site!";
  comment: "Hello, I'm a text comment."; // this comment will be appended to the text node after the text
}
```
to get:

```html
<div class="content">Welcome to our site! <!-- Hello, I'm a text comment. --></div>
```
or this:

```css
.content {
  color: black;
  comment: "Hello, I'm a comment."; // this comment will be inserted before the text inside the text node
  text: "Welcome to our site!";
}
```
to get:

```html
<div class="content"><!-- Hello, I'm text comment. --> Welcome to our site!</div>
```

## Line Comments

Single-line comments are also valid in Pre, but as in LESS,
they are ‘silent’, so they don’t show up in the compiled
CSS output:

```css
.content {
  color: white;  // Hi, I'm a silent comment, I won't show up in your CSS
}
```

