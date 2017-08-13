# Grudus Timepicker

![dependencies](https://img.shields.io/david/grudus/timepicker.svg?style=flat-square)
![dev dependencies](https://img.shields.io/david/dev/grudus/timepicker.svg?style=flat-square)

Material design timepicker written in Javascript (without any external dependencies - **no jQuery, no Bootstrap, only one file!**)

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

First, download it from npm 

````
npm install --save-dev grudus-timepicker
```` 

Then, add css file into your project, e.g. in html file

````
 <link href="https://raw.githubusercontent.com/grudus/Timepicker/master/src/styles/index.css" type="text/css" rel="stylesheet">
````

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

You can set initial time by passing `time` field in argument. `time` may be a `Date` object, an object `{hours: 12, minutes: 44}` or a string in format `HH:mm`
