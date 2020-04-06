Rails app

Dependencies
* ruby 2.5
* rails 6.0
* sqlite3

Database initialization and seed

the project is using SQLite and I am seeding the table with mock data

* rake db:migrate
* rake db:seed

The event machine is started in a new threat when the application start. Every time it get a value it is inserted in the db.
I am displaying th values in the front end not css so far just raw data. also is not a live board so you need to refresh the page to get the new values.
