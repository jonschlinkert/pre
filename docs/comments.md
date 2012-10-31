# Comments


## Block Comments

CSS-style block comments are preserved by Pre:

```css
.content {
  color: black /* Hello, I'm a CSS-style comment. I will be preserved. */
}
```


## Line Comments

Single-line comments are also valid in Pre, but as in LESS,
they are ‘silent’, so they don’t show up in the compiled
CSS output:

```css
.content {
  color: white  // Hi, I'm a silent comment, I won't show up in your CSS
}
```

