Infinidat - SW task

A brief explanation about the project and its files:
The program runs by the help of the famous "npm start" command.
The main page shows a list of people from Star Wars movies, taken from SWAPI. The list is shown in pages, consists of 6 people each (easily changeable).
This page includes a search bar - a text field that filters the list of the people by their name.
The user is able to navigate through the pages, and whenever the user clicks on a name of a person, a page within all the data about this particular person appears.
It is possible to go back to the main page by clicking the "back" button.

The program consists of the following files:
app.js: includes the routing components from 'react-router-dom' which allow the program switching pages easily.
home.js: includes the home page component within the logo, search bar, list of people and its buttons. The search bar is a TextField from Material-UI.
The list of people is made by the SWAPI and Axios.
item.js: includes the item component, which is the component that represents the name in the list; it includes a nice CSS styling for the name and a custom sword image below.
person.js: includes the second page component, the one that shows the information about the person that was clicked.
