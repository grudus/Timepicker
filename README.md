# Grudus Timepicker

![npm](https://img.shields.io/npm/v/grudus-timepicker.svg?style=flat-square)
![dependencies](https://img.shields.io/david/grudus/timepicker.svg?style=flat-square)
![dev dependencies](https://img.shields.io/david/dev/grudus/timepicker.svg?style=flat-square)
![license](https://img.shields.io/github/license/grudus/timepicker.svg?style=flat-square)

Material design timepicker written in Javascript (without any external dependencies - **no jQuery, no Bootstrap, only one file!**)
See https://grudus.github.io/Timepicker/ for more usage!

## How it looks?

By default picker uses blue-white theme:

![Normal](https://user-images.githubusercontent.com/18220458/29241865-a3f13518-7f82-11e7-99b2-c0fafe807b40.png)

<br/>
But you can change its colors by overriding some of default configuration:

````javascript
defaultConfig = {
    headerBackground: "#1976D2",
    headerColor: "#c7d6e1",
    headerSelected: "#ffffff",
    wrapperBackground: "#f0fff0",
    footerBackground: "#f0fff0",
    submitColor: "#1976D2",
    cancelColor: "#1976D2",
    clockBackground: "#CFD8DC",
    clockItemColor: "#212121",
    clockItemInnerColor: "#212121",
    handColor: "#1976D2"
};
````

<br/>
How custom theme can look:
<br/>

![brave](https://user-images.githubusercontent.com/18220458/29241863-a3ee3f3e-7f82-11e7-8b10-14a874813de2.png)

<br/>
But you can also create more user-friendly view - create your own dark theme:
<br/>

![dark](https://user-images.githubusercontent.com/18220458/29241864-a3f0d6d6-7f82-11e7-9349-27fed0fd0480.png)

<br />

## How to get it?

You can include all in single `html` file! Just add

````html
 <link href="https://rawgit.com/grudus/Timepicker/master/src/styles/index.css" type="text/css" rel="stylesheet">
 <script type="text/javascript" src="https://rawgit.com/grudus/Timepicker/gh-pages/dist/grudus-timepicker.es5.js"></script>
````

Or, you can download it from npm 

````bash
npm install --save grudus-timepicker
```` 

Then, include `index.css` into your project (e.g. add
`<link href="node_modules/grudus-timepicker/src/styles/index.css" rel="stylesheet" type="text/css">` into your html file)

and include js file  (e.g. add `<script src="node_modules/grudus-timepicker/dist/grudus-timepicker.es5.js" type="text/javascript"></script>`  into your html file)


And lastly, somewhere in your code put 

````javascript
 Timepicker.showPicker({
            time: new Date(),
            onSubmit: (time) => {
                //some action ...
            },
            headerColor: "#ff0000"       
            // more color configuration ...
        })
````

You can set initial time by passing `time` field in argument. `time` may be a `Date` object, an object `{hours: 12, minutes: 44}` or a string in format `HH:mm`. If you want to learn more, visit [customization section](https://grudus.github.io/Timepicker/#customization)
