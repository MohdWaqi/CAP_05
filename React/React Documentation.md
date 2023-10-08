# All About React

**1. What is React?**
> React is an open source Javascript library that is primarily used for building beautiful user interfaces for Web applications. The reason react is attractive for web developers as it provides a component based architecture and these components can be reusable in other areas of a web application in short there is no need of duplication and in Real DOM whenever any changes are made it re-renders the entire web page whereas in react there is a concept of Virtual DOM where it makes changes in the memory of webpage and renders only changes to actual DOM just like patch request in APIs.

**2. Who made React?**
> React is made by Meta Platforms, Inc. formerly known as Facebook, Inc.

**3. What is Babel?** 
> As javascript evolve new features are also incorporated in it but some browsers still don't support modern javascript so here comes babel into picture it converts the modern JavaScript into older version of javascript that can run in all browsers and it also used in react to convert jsx syntax into that older javascript version in short it is just like a Translator.

**4. How does Babel convert html code in React into valid code?**
> That HTML code in react is jsx(javascript XML) which is look like HTML code but it is not, it's actually javascript and Babel is used to transform that JSX code into standard javascript code which browsers can understand.
>> Here is a simple example:- Babel takes JSX code like this
>>
>>`const element = <h1>Waqi is Creative.</h1>;`
>>
>>and transform it into plain javascript like this
>> 
>>`cosnt element = React.createElement("h1", null, "Waqi is Creative");`

**5. What is ReactDOM used for? Write an example?**
> React DOM is used for rendering React components to the actual or Real DOM of a webpage.
>
>Here is an example
>
>`import React from "react";`
>
>`import ReactDOM from "react";`
>
>Defining a component in React
>
>`function exampleComponent() {`
>
>>`return  <h1>Yeah!! We made it.</h1>`
>
>`}`
>
> Render the react component to DOM
>
>`ReactDOM.render(<exampleComponent/>, document.getElementById("root"));`

**6. What are the packages that you need to import for react to work with?**
>- React
>- ReactDOM
>- Babel (although it is optional)

**7. How do you add react to a web application?**
> First go to the terminal and type  `npx create-react-app my-app`
>
> then, `cd my-app`
>
> then, `npm start` to start the react application.

**8. What is React.createElement?**
> React.createElement is a fundamental function in React that is used to create React elements it is the part that constructs virtual representation or virtual DOM of our user interface.

**9. What are the three properties that createElement accept?**
>- Type (can be a HTML element in string format or can be a react Component)
>- Props (an object that contains attributes of HTML element and it is optional)
>- Children (it is the content inside that type(html element or component))

**10. What is the meaning of render and root?**
> - Render means taking an element or a react Component and converting it into a representation that can be displayed on the screen.
> - Root means the place in HTML element where that rendered element or react component should be displayed.



