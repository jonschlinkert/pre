[pre](http://pre.io)
===

# Pre dynamic presentation language

Pre is dynamic presentation language that compiles into HTML.

Pre does for HTML what LESS and SASS do for CSS. Pre was heavily influenced by Zen-Coding, [Less](http://lesscss.org/) and [Jade](https://github.com/visionmedia/jade) and implemented with JavaScript for [node](http://nodejs.org).

[Grunt](https://github.com/gruntjs/grunt) is a javascript-based build tool that will be used to compile Pre. Once you have node and npm running, pull down the developer dependencies from _package.json_, grab the example gruntfile (coming soon), and run:

```bash
grunt pre
```

## Test drive

TODO

And be sure you check the gh-pages branch too for activity and updates!


## README Contents

TODO: needs to be reorganized and ToC needs to be corrected

- [Features](#a1)
- [Implementations](#a2)
- [Getting Started](#a3)
- Public API
- [Syntax](#a6)
    - [Line Endings](#a6-1)
    - [Tags](#a6-2)
    - [Text Nodes](#a6-3)
    - [Comments](#a6-4)
    - [Block Comments](#a6-5)
    - [Nesting](#a6-6)
    - [Block Expansion](#a6-7)
    - [Case](#a6-8)
    - [Attributes](#a6-9)
    - [HTML](#a6-10)
    - [Doctypes](#a6-11)
- [Executable Code](#a8)
- [Iteration](#a9)
- [Conditionals](#a10)
- [Template inheritance](#a11)
- [Includes](#a13)
- [Mixins](#a14)
- [Generated Output](#a15)
- [Example Gruntfile](#a16)
- [pre(1)](#a17)
- [Tutorials](#a18)
- [License](#a19)

<a name="a1"/>
## Features

  - reusability, component-oriented
  - better readability than Jade or HAML
  - whitespace agnostic, flexible indentation
  - html lexicon
  - syntax and semantics of CSS and LESS
  - mixins
  - parametric mixins
  - variables
  - guards
  - partials and static includes
  - attribute interpolation
  - html 5 mode (the default doctype)
  - combine dynamic and static tag classes
  - template inheritance
  - block append / prepend
  - block comments and inline comments
    - :stylus must have [stylus](http://github.com/LearnBoost/stylus) installed
    - :less must have [less.js](http://github.com/cloudhead/less.js) installed
    - :markdown must have [markdown-js](http://github.com/evilstreak/markdown-js), [node-discount](http://github.com/visionmedia/node-discount), or [marked](http://github.com/chjj/marked) installed
    - :coffeescript must have [coffee-script](http://jashkenas.github.com/coffee-script/) installed
  - [Sublime Text Syntax Highlighting](http://github.com/jonschlinkert/pre-sublime-highlighter)


<a name="a3"/>
## Getting Started

via npm:

```bash
$ npm install pre
```

<a name="a4"/>
## Compiling

To compile pre to static HTML, use the [grunt-pre](http://sellside.github.com/grunt-pre) task, and simply execute:

```bash
$ grunt pre
```

If you are are a Windows user, when executing [gruntjs](https://github.com/gruntjs/grunt) from the same folder as the grunt.js file, you must execute:

```bash
grunt.cmd pre
```

<a name="a6"/>
## Syntax

<a name="a6-1"/>
### Line Endings

**CRLF** and **CR** are converted to **LF** before parsing.

Pre's lexicon follows HTML convention, and targeting is accomplished using the selector syntax of CSS, and a grammar similar to LESS or JSON. Take this example:

```css
section {}
```
This is recognized as an HTML tag since the selector is not preceded by `.` or `#`, and so it compiles to this:

`<section></section>`

```css
.section {}
```
The above statement would be recognozed as an HTML attribute, since the selector is preceded by `.`, and so it compiles to this:

`<div class="section"></div>`

The default tag is always `div` unless a specific HTML tag is explicity stated.


<a name="a6-1"/>
### Line Endings

**CRLF** and **CR** are converted to **LF** before parsing.

<a name="a6-2"/>
### Declarations

Declaration blocks in Pre work the same way as CSS. Accept in Pre, declarations reference text and attribute nodes attached to specific selectors. Like CSS, declarations consist of two parts: properties which directly map to HTML attributes, e.g. : and value which is equivalent of HTML value, e.g. 10pt. NOTE: properties are always ended with a colon.

### Tags

If you know CSS, you have a huge head start using Pre. If you know LESS, you almost know Pre. A tag is simply a leading word:

```css
html {}
```

for example is converted to `<html></html>`

tags can also have classes using the same syntax as CSS:

```css
.row-fluid {}
```

which would render `<div class="row-fluid"></div>`

Ids work the same

```css
#myCarousel {}
```

renders `<div id="myCarousel"></div>`

By default, `.` and `#` both compile to a `div` tag. To specify another tag, just add it before the `.` or `#`:

```css
p.lead {}
```

renders `<p class="lead"></p>`

use classes and ids together, just like [Emmet](https://github.com/sergeche/zen-coding) (fka ZenCoding):

```css
div#one.two.three > .nested {}
```
renders
`<div id="one" class="two three">`
  `<div class="nested"></div>`
`</div>`

No need to write divs over and over, just do:

```css
#one {}
.two {}
.three {}
```

which outputs:

```html
<div id="one"></div>
<div class="two"></div>
<div class="three"></div>
```

and this

```css
#one {
  .two {}
}

```
compiles to:

```html
<div id="one">
  <div class="two"></div>
</div>
```

Use multipliers to reduce code footprint for repeating elements:

```css
.two*3 {}
```
outputs:

```html
<div class="two"></div>
<div class="two"></div>
<div class="two"></div>
```

### Siblings

You can either do this:

```css
.one {
}
.two {
}
```
or this:

```css
.one + .two {}
```

to get this:

```css
<div class="one"></div>
<div class="two"></div>
```

<a name="a6-3"/>
### Text Nodes

Need text? Simply place some content inside the `text` property:

```css
p { text: "Lorem ipsum" }
```

renders `<p>Lorem ipsum</p>`.

You can add as much text as you need this way:

```css
h1 { text: "War and Peace, Chapter 1" }
p { text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit..." }
```
renders
```css
<h1>War and Peace, Chapter 1</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
```
If you need to escape your text, ...


### Attributes

Need to add custom attributes? Just add them as a property and they will be compiled as attributes in the resulting HTML:

```css
.row {
  data-tooltip: "This is a tooltip!";
  myAttr: "Invalid markup is awesome!";
  p {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...";
  }
}
```
renders

```html
<div class="row" data-tooltip="This is a tooltip!" myAttr="Invalid markup is awesome!">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
</div>
```

Remember, classes are attributes too, so you have options for applying classes (or multiple classes). You can either do this:

```css
.one.two {}
```
or this...

```css
.one {
  class: "two";
}
```
and both examples yield the same result:

```css
<div class="one two"></div>
```

The same goes for Id's. This:

```css
#main.content {}
```
renders to:

```css
<div id="main" class="content"></div>
```

And this:

```css
#main.content {
  class: "wide-content";
}
```
compiles to:

```css
<div id="main" class="content wide-content"></div>
```

### Template Syntax

If static text doesn't work for you, use your templating language of choice instead of text.

Mustache:

```css
p { text: "{{name}}"; }
p { text: "{{company}}"; }
```
results in `<p>{{name}}</p><p>{{company}}</p>`

Web Forms:

```css
p { text: "<%: name %>"; }
p { text: "<%: company %>"; }
```
results in `<p><%: name %></p><p><%: company %></p>`

Razor:

```css
p { text: "@name"; }
p { text: "@company"; }
```
results in `<p>@name</p><p>@company</p>`

Remember, to escape the template code you need to keep it wrapped in quotation marks. More about escaping [here]().

## Variables

Pre allows variables to be defined. Pre variables are defined with an at sign (@), and variable assignment is done with a colon (:).
During translation, the values of the variables are inserted into the output HTML document.

```css
@loremText:  "lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.";

p { text: @loremText; }
```
results in `<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p>`

###Variables for repeating elements

Remember multipliers? They're even better with variables:

```css
@items: 5; // arbitrary number or another variable

.item*@items {}
```
outputs:

```html
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
```

###Variable interpolation

Variables must be interpolated to be evaluated inside of escaped strings. So this:

```css
@name:       "Brian";
@greeting:   "Goodbye World";

p {
  text: "@{name} said @{greeting} at the developer conference."
}
```
produces this: `<p>Brian said Goodbye World at the developer conference.</p>`


###Escaping

If you want to want to pass through a string unevaluated, add quotation marks around the value.

```css
p { text: "@name"; }
p { text: "@company"; }
```
results in `<p>@name</p><p>@name</p>` (a good way to use Razor, mustache or your preferred templating engine)

This also works as a good tactic to escape HTML:

```css
.username {
  "text": "<strong>Bob Smith</strong>"
}
```
results in `<div><strong>Bob Smith</strong></div>`

###JavaScript

```css
script {
  "text": "alert('Hello, World!')"
}
```
results in

```javascript
<script>
  alert('Hello, World!')
</script>
```

And this:

```css
a.button {
  href: "#";
  onClick: "alert('Hello, World!'); return false;";
  text: "Click Here";
}
```
results in

```javascript
<a class="button" href="#" onclick="alert('Hello world!'); return false;">Click Here</a>
```



TODO: add json hash example, e.g.

Hash:
```css
{
  "name": "Chris",
  "company": "<b>GitHub</b>"
}
```

###Operations

Similar to LESS, in Pre any number or variable can be operated on. Operations should be performed within parentheses. Here are a couple of examples:

TODO: need to think of some good use cases before I document operations. The following isn't very compelling, but it's not hard to do:

```css
@ticketsSold:               500;
@seatsAvailable:            1000;
@twoForMeUnderTheTable:     2;
@seatsLeft:         (@seatsAvailable - @ticketsSold - @twoForMeUnderTheTable);
```

And use it like this:

```css
ul {
  li*@seatsLeft {}
}
```
Again, not compelling, possibly unethical, and I'm not even sure how this example would even work unless it was compiled on the fly in the browser. Nonetheless, maybe a smarter mind than my own will come up with a good use case for operations in pre.



###String interpolation

Variables can be embeded inside strings in a similar way to LESS, ruby or PHP, with the `@{name}` construct:

```css
@base-url: "http://sub.domain.com";

img {
  src : "@{base-url}/img/bg.png";
}
```
outputs `<img src="http://sub.domain.com/img/bg.png">`



<a name="a6-4"/>
### Comments

CSS-style comments are preserved by Pre:

```css
/* Hello, I'm a CSS-style comment */
```

Single-line comments are also valid in Pre, but they are ‘silent’, so they don’t show up in the processed HTML:

```
// This is a JavaScript-style, silent comment. It won't show up in your HTML
```

Single line comments can be used inline with other

```css
/* this is a valid comment */
.content {
    text: "Yeah!"; // so is this
}
// And so is this
```

would output

```html
<!-- this is a valid comment -->
<div class="content">Yeah!</div>
```




<a name="a6-5"/>
### Block Comments

A block comment is legal as well:

```css
/*
  .content {
      text: "Yeah!";
  }
*/
```

will output

```html
<body>
  <!--
  <div class="content">Yeah!</div>
  -->
</body>
```

<a name="a6-6"/>
### Nesting

Pre allows you to either nest tags in the "traditional" way, or use block expansion if you prefer terse, single-line nested tags:

So you can do this:

```css
#one {
  .two {}
}
```
<a name="a6-7"/>
### Code Expansion

or use block expansion, like this:

```css
#one > .two {}
```

and both will compile to this:

```html
<div id="one">
  <div class="two"></div>
</div>
```

<a name="a6-8"/>
### Case

TODO: Brian, could use some peer review. Please feel free to cut this out of the spec, revise it, or suggest changes:

Case statements take the following form:

```css
ul {
  when (@seatsAvailable > @ticketsSold) {
    li > a { href: "Buy Now"; }
  }
  when (@seatsAvailable < @ticketsSold) {
    li { text: "Sold Out"; }
  }
  else {
    li { text: "There are @{tickets} tickets available."; }
  }
}
```

<a name="a6-9"/>
### Attributes

TODO


<a name="a6-10"/>
### HTML

```css
html {}
```
yields:

```html
<html></html>
```

And this:

```css
html {
  head {
    title: { text: "Home"; }
  }
  body {
    .container {
      .row {
        .span3 {}
        .span9 {}
      }
    }
  }
}
```
yields:

```html
<html>
  <head>
    <title>Home</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="span3"></div>
        <div class="span9"></div>
      </div>
    </div>
  </body>
</html>
```


<a name="a6-11"/>
### Doctypes

NOTE: doctypes should probably be built in as keywords rather than
leaving it to devs to define mixins. Mixins would be clunky.
I'd like some feedback and ideas on best approach.

For example, the following doctype is HTML5, we could assign the keyword _DOCTYPE(5)_ to yield:

```html
<!DOCTYPE html>
```

and _DOCTYPE(strict)_ to yield

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

With the idea being that "normal" mixin syntax requires that a `.` precedes the mixin, but a "keyword" mixin
is "hard-coded" and thus is not preceded with a `.`.

Another option is to allow variables to be passed in:

_DOCTYPE(@doctype)_



<a name="a8"/>
## Executable Code

TODO


<a name="a9"/>
## Iteration

TODO


<a name="a10"/>
## Conditionals

TODO

<a name="a11"/>
## Template inheritance

TODO

<a name="a13"/>
## Includes

TODO


<a name="a14"/>
###Mixins

In Pre, it is possible to add the properties (HTML attributes) from ruleset to those of another ruleset. So, for example, let's say you have the following block:

```css
.username {
  "text": "<strong>@name</strong>"
}
```
which compiles to: `<div class="username"><strong>Bob Smith</strong></div>`


And you want to use these properties inside other rulesets, just drop the class into any other ruleset in which we wish to include its properties, like so:

And use it like this:

```css
.profile {
  .username;
}
```

it will result in:

`<div class="profile"><strong>Bob Smith</strong></div>`

Mixins will also process selectors as well as their properties, so if you create the mixin like this:

```css
.username() {
  .username {
    "text": "<strong>@name</strong>"
  }
}
```
And use it the same way:

```css
.profile {
  .username;
}
```
it will result in:

`<div class="profile"><div class="username"><strong>Bob Smith</strong></div></div>`


##Parametric Mixins

Turn the last example into a parametric mixin:

```css
.username(@name: "Bob Smith") {
  "text": "<strong>@name</strong>"
}
```

And use it like this:

```css
.profile {
  .username();
}
```

which results in:

`<div class="profile">`
   `<div class="username"><strong>Bob Smith</strong></div>`
`</div>`

Mixins can also use variables for default values. So a mixin like this:

```css
@exampleUsername: "Bob Smith";

.username(@name: @exampleUsername) {
  "text": "@name"
}
```

would still be used like this:

```css
.profile {
  .username();
}
```

and result in:

`<div class="profile">`
   `<div class="username">Bob Smith</div>`
`</div>`


###Templates and Partials

TODO: documentation on this is wip, the following examples are incomplete but are left here as starting points.

Use mustache tags and partials:
```css
.container {
  {{> template}}
}
```

Pre mixins:
```css
.container();
```

Or underscore templates:
```css
.container {
  <%= template %>
}
```


<a name="a15"/>
## Generated Output



<a name="a16"/>
## Example Gruntfile

Below is an example Gruntfile used to compile _pages/*.pre_
into _pages/*.html_ files by simply executing `grunt pre`.

```css
pre: {
  docs: {
    src: 'pages/index.pre',
    dest: 'index.html',
    options: {
      pretty: true
    }
  },
  dev: {
    options: {
      pretty: true
    },
    files: {
      "docs": ['docs/**/*.pre'],
      "app": ['pages/*.pre']
    }
  }
}
```

this can be combined with the `grunt-contrib-watch` task to run the Pre tasks whenever watched files change:

```bash
$ grunt watch:pre
```

<a name="a17"/>
## pre(1)

TODO



<a name="a18"/>
## Tutorials

TODO



<a name="a19"/>
## License

(The MIT License)

Copyright (c) 2009-2010 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXpreSS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<a name="a20"/>
## Credits

* Jade: This documenation draws heavily upon the docs for [Jade](https://github.com/visionmedia/pre), credit goes to [TJ Holowaychuk ](https://github.com/visionmedia) and the contributors of Jade
* LESS
* HAML
* Jekyll
* ZenCoding
* Mustache


