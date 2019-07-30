# atom-rubyfmt
[Atom](https://atom.io/) plugin to autoformat [Ruby](https://www.ruby-lang.org/en/) code with [Rubyfmt](https://github.com/samphippen/rubyfmt)

![ezgif-1-efe14eccc5e4](https://user-images.githubusercontent.com/13226/62165767-2e94ae80-b2ed-11e9-9ccc-c401b49d92e1.gif)


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

<img width="400" alt="Screen Shot 2019-07-30 at 16 55 08" src="https://user-images.githubusercontent.com/13226/62165887-6d2a6900-b2ed-11e9-8cb4-5b08c29cb256.png">


## Syntax errors

If the Ruby code contains a syntax error it cannot be formatted. The syntax error will be displayed in a notification window. 

<img width="957" alt="Screen Shot 2019-07-30 at 16 50 01" src="https://user-images.githubusercontent.com/13226/62164251-153e3300-b2ea-11e9-972d-c76e9de21fb2.png">
