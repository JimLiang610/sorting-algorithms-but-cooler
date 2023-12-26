# sorting-algorithms-but-cooler
visualize sorting algorithms 

HTML NOTES:
-use  of a lot of divs in main to seperate content and give styles to certain content.probably why i see the same for other projects
-id and classes of elements
    -when theres a lot of similar html elements, we can group them together by giving them a class
    -but if the html element serves a unique purpose that we want to access in JS, we can give it an ID. note, we can still give a class to group it with other elements 
-to create icon buttons: 1)link to an icon library 2)append icons to buttons by nesting an i or span tag and using the class attribute to fill the desired icon

Program notes:
1. since script tag is in the html head, we need to wait for the dom object to finish constructing before running js code

2. A visualization of a sorting alogrithm can be broken down into these core steps: 
    - select and create html elements with document.querySelector and document.create.Element
    - updating the style/property of the height 
    - adding and removing classes (or styles) to indicate comparison of bars 
    -using setTimeOut to add delays to visulaize a sorting process 
