## INTRODUCTION
> This is a gulp task pretreatment collection

> It is imperfect

## USAGE:

>`$ gulp [task] {-parameter <value> || --command}`

// New A Temporary Directory  
`$ gulp [task] -t < value >`

// Clean All Destination Directories  
`$ gulp clean --all`

// Minify Some Type Of Files By Command  
`$ gulp [styles | scripts | images] --min`

// Use Livereload Plugin to auto reload files  
`$ gulp watch --live`

// Modify Rename Archived Project(.zip)  
`$ gulp zip --rename`

#### Some common task's Example here:
`$ gulp build`    
Default compiled into **./dev/**    

`$ gulp build -t`    
Compiled into **./tmp/**   

`$ gulp build <-t=name | -t name>`    
Compiled into **./tmp-name/**    

`$ gulp zip`    
Packing project to **./archive/**, default name is *dev-201604100545.zip* (default destination + '-' + timestamp)

`$ gulp zip <--rename=name | -rename name>`    
Packing project to **./archive/**, name is *name.zip*  

#### All Of Tasks & Commands
###### Commands:
- -d            
- -p
- -t           temporary directory
- -t name
- -t=name
- --all
- --min
- --rename
- --prettify   prettify codes
- --live       use livereload mod

###### Tasks:
├─┬ build    
 │ └─┬ <series>    
 │   ├── clean    
 │   ├── styles    
 │   ├── scripts    
 │   ├── templates    
 │   └─┬ transfer    
 │     └─┬ <parallel>    
 │       ├── libs    
│       └─┬ <parallel>    
 │         ├── fonts    
 │         └── extras    
 ├── clean    
 ├─┬ default    
 │ └─┬ <series>    
 │   └── help    
 ├── h2j    
 ├── help    
 ├── images    
 ├── scripts    
 ├─┬ server    
 │ └─┬ <parallel>    
 │   ├── web    
 │   └─┬ watch    
 │     └─┬ <series>    
 │       ├─┬ build    
 │       │ └─┬ <series>    
 │       │   ├── clean    
 │       │   ├── styles    
 │       │   ├── scripts    
 │       │   ├── templates    
 │       │   └─┬ transfer    
 │       │     └─┬ <parallel>    
 │       │       ├── libs    
 │       │       └─┬ <parallel>    
 │       │         ├── fonts    
 │       │         └── extras    
 │       └─┬ <parallel>    
 │         ├── watch    
 │         └── reload    
 ├── styles    
 ├── templates    
 │   │   └─┬ transfer    
 │   │     └─┬ <parallel>    
 │   │       ├── libs    
 │   │       └─┬ <parallel>    
 │   │         ├── fonts    
 │   │         └── extras    
 │   └─┬ <parallel>    
 │     ├── watch    
 │     └── reload    
 └── zip    
