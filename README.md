# MeteoForecast

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Development decisions

As this has to be a short test, I hardcoded the filters inside the weather component so there's no way to change them.
Also I did not manage a correct sort mechanism for it's complexity and over time work (and it was not required in the test, but the buttons on the grid were there.).
For the data persistance I used session so whenever you close the tab it does reload the data of the grid and the if the form has been sent already.
Also I did not use a scalated codifying for such reuse of a table or a form due to the short test and the extra complexity it does have without any component library.