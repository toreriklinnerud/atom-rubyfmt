# atom-rubyfmt
[Atom](https://atom.io/) plugin to autoformat [Ruby](https://www.ruby-lang.org/en/) code with [Rubyfmt](https://github.com/samphippen/rubyfmt)

![ezgif-1-efe14eccc5e4](https://user-images.githubusercontent.com/13226/62165767-2e94ae80-b2ed-11e9-9ccc-c401b49d92e1.gif)


## Dependencies
`ruby` is assumed to be in path and `rubyfmt.rb` is assumed to be in `~/bin/rubyfmt.rb` but this can be overriden in the package settings. 


## Plugin installation

Through [Atom packages](https://atom.io/packages), search for rubyfmt. 

## Formatting code

On Windows/Linux: `Alt + ;`  
On MacOS: `Cmd + ;`

With a file open and identified as Ruby or Ruby on Rails, hit the above combination to apply auto format.

## Format on Save / Other settings

Format on save is disabled by default but can be enabled from the Package Settings.

![settings-screenshot](https://user-images.githubusercontent.com/13226/62165887-6d2a6900-b2ed-11e9-8cb4-5b08c29cb256.png)


## Syntax errors

If the Ruby code contains a syntax error it cannot be formatted. The syntax error will be displayed in a notification window. 

![syntax-error-screenshot]("https://user-images.githubusercontent.com/13226/62164251-153e3300-b2ea-11e9-972d-c76e9de21fb2.png")
