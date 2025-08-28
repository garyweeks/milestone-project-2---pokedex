# Milestone Project 2: Pokedex
[Pokedex](https://garyweeks.github.io/milestone-project-2---pokedex/)

## Name of the project: Pokdex

Pokedex is a website designed to locate, search and bring up basic details about the 1,000 base pokemon that are available on your phone, on the go.

My thoughts were around the many people who play Pokemon Go on mobile phones and the official site having too many presses to access relevant data, at speed.

![pokedex mockup](/documentation/mockup.png)

### UX

I kept the UX very simple in order to make the search process easier. The colour scheme was designed round the Pokemon colour palette and although not perfect in terms of accessibility, fits the brand’s colour scheme to make the site look more familiar to people that would use it.

### TYPOGRAPHY

I wanted to emulate a font for the main banner that fits the style of the Pokemon brand without directly copying it. For this I found close version on dafont.com (https://www.dafont.com/pokemon.font) which I downloaded and added directly to the website. I have supported this with Arial and Helvetica for a clean look.

### EXISTING FEATURES

Currently the website utilises a search bar with a reset bottom and a tile of cards to show 20 Pokemon at the time on the home screen. Using JavaScript I have linked to pokeapi.co (no api key needed) to feed the pokemon to the website in a card form.

Clicking on each card will display a popup of the card with base stats for each Pokemon selected.

The search bar also has a partial search function so inputting a part of the Pokemon name will respond with a selection of Pokemon based around the partial search.

### TESTING

The website has been tested on Chrome, Firefox and Edge and performs in the same way on each. I have also sent the code through the validators on w3c and no problems were seen. The website has also been put through lighthgood scores with good scores all round, although performance dropped on mobile devices.

- tested load times on all browsers
- tested search button for partial and full searches
- tested reset button to make sure the search resets
- tested page buttons to make sure the page scrolls

![W3C HTML validation](/documentation/htmlvalidation.png)
![W3C css validation](/documentation/cssvalidation.png)
![Lighhouse scores mobile](/documentation/lighthousemobile.png)
![Lighthouse scores desktop](/documentation/lighthousedesktop.png)

### ISSUES

There are issues with the image dropping below the banner text on smaller devices.
There is an issue with the cards not aligning correctly when viewed on a larger screen device (1440 and above)

### CREDITS

pokeapi.co
chatgpt.com - to iron out issues that I couldn’t solve directly through research
dafont.com




