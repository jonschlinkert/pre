# Attributes

Note: this document also exists as a gist here: https://gist.github.com/0fba3e5a31c353b2460b

Pre supports CSS-style properties as attribute delimiters.

```css
a {
  href: "/login";
  title: "View login page";
  text: "Login";
}
```

compiles to:

```html
<a href="/login" title="View login page">Login</a>
```

this

```css
.one {}
```

compiles to:

```html
<div class="one"></div>
```

and this

```css
.one.two {}
```

compiles to

```html
<div class="one two"></div>
```



## Inline & Block Attributes

### Inline Attributes

```css
strong#message.code {
  text: "Hello, World!";
}
```

### Block Attributes

```css
strong {
  id: "message";
  class: "code";
  text: "Hello, World!";
}
```

both render to:

```html
<strong class="code" id="message">Hello, World!</strong>
```


## Attribute Keywords

TODO: list of attribute keywords in pre, see gist: https://gist.github.com/3984049, and issue: https://github.com/sellside/pre/issues/16

With xmllang as a keyword in Pre, the following:

```css
html {
  xmlns: "http://www.w3.org/1999/xhtml";
  xmllang: "en"; // xmllang is a proposed keyword
  lang: "en";
}
```
would render to:

```html
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"></html>
```


## Boolean Attributes

Boolean attributes in Pre are handled similarly to Jade. Some attributes, such as
“checked” for input tags or “selected” for option tags are “boolean” in the sense
that their values are only required if they are present. In HTML (but not XHTML),
these attributes can be written as:

```html
<input type="radio" checked>
```

In other words, boolean attributes with code will only output the attribute when `true`:

```css
input {
  type: "checkbox";
  checked: "checked";
}
```
Since in the above example, the value "checked" really = true, it compiles to
the following in HTML5:

```html5
<input type ="checkbox" checked>
```

or in XHTML (xhtml can be set as an option):

```xhtml
<input type ="checkbox" checked="checked">
```

And this:

```css
input {
  type: "checkbox";
  checked: "anything-but-checked"; false
}
```
compiles to:

```html
<input type ="checkbox">
```

this:

```css
input {
  type: "radio";
  checked: true;
}
```
renders the following in HTML5:

```html
<input type="radio" checked>
```

and in XHTML

```html
<input type="radio" checked="checked"/>
```

```css
input {
  checked: false;
}
```

or simply

```css
input {}
```

Renders the following:

```html
<input> // html5
```
```html
<input/> // xhtml
```


Similarly in Pre:

```css
select {
  option { text: "1"; selected: true; }
  option { text: "2"; }
  option { text: "3"; }
}
```

compiles to this:

HTML5
```html
<select>
  <option selected>1</option>
  <option>2</option>
  <option>3</option>
</select>
```

XHTML
```html
<select>
  <option selected="selected">1</option>
  <option>2</option>
  <option>3</option>
</select>
```


### Undefined and Null Values

When a value is `undefined` or `null` the _attribute_ is _not_ added,
so in the following decaration block, `something: "null"` will not
show up in the compiled results.

```css
div {
  something: null;
}
```
compiles to:

```html
<div></div>
```

But if you wrap 'null' in quotation marks, then "null" will compile
as a value of the "something" attribute.

```css
div {
  something: "null";
}
```
compiles to:

```html
<div something="null"></div>
```



# Syntax Comparison

Simple syntax comparison between HTML, Pre, Jade and HAML

### HTML

```html
<strong class="code" id="message">Hello, World!</strong>
```

The same in Pre:

### Pre

```css
strong#message.code {
  text: "Hello, World!";
}
```
or

```css
strong {
  id: "message";
  class: "code";
  text: "Hello, World!";
}
```

### Jade (todo)

```jade
// todo
```

### Haml

```Haml
%strong{:class => "code", :id => "message"} Hello, World!
```


