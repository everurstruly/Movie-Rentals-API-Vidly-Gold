## common -> 
contains modules common and scoped to the application as a whole.

### extensions
extended existing packages

### lib
internal abituary packages

### plugins
internal modules

### vendors
third-party packages


## app -> contains core files that gives the application its identity.
### guards
contains logic of determining the access permission of one entity to another.


controllers -> contains request and response processing logic. Utilizing various services to do so.

routes -> folder grouped by concern. Utilizes guards to analysize access permissions to request. Maps requests to respective controllers

errors -> self explanatory really. Errors are grouped by concerns. Errors from different modules should not be presumed to have the same interface.

helpers -> contains shared and or common modules used by other core modules of the application

middleware -> self explanatory really. Middleware specifig logic goes in here

models -> self explanatory. Contains nothing but models

schema -> contains the request related data schemas and validation logic

service -> contains modules and logic that acts as a layer and facade over resource and data


seed -> contains the logic to directly populate the database

startup -> contains the encapsulated logic and components that goes on when starting up the server