# sublime-rubyfmt
[Atom](https://atom.io/) plugin to autoformat [Ruby](https://www.ruby-lang.org/en/) code with [Rubyfmt](https://github.com/samphippen/rubyfmt)

## Dependencies
`ruby` and `rubyfmt` must already be installed and in your path:

```shell
$ which {ruby,rubyfmt}
/Users/tel/.rbenv/shims/ruby
/Users/tel/bin/rubyfmt
```


## Plugin installation

Through [Atom packages](https://atom.io/packages) (once released):
```
Settings/Preferences ->
   Install ->
     Search Packages: rubyfmt (enter)
```

## Formatting code

On Windows/Linux: `Alt + ;`  
On MacOS: `Cmd + ;`

With a file open and identified as Ruby or Ruby on Rails, hit the above combination to apply auto format.

If your file contains syntax errors it won't be formatted.

## Format on Save / Other settings

Format on save is disabled by default but can be enabled from the Package Settings.

## Syntax errors

If the Ruby code contains a syntax error it cannot be formatted. The syntax error will be displayed in a notification window. 

