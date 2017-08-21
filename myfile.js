function darkPicker() {
    Timepicker.showPicker({
        time: {"hours": 3, "minutes": "05"},
        headerBackground: '#424242',
        headerColor: '#e0e0e0',
        headerSelected: '#fafafa',
        wrapperBackground: "#424242",
        footerBackground: "#424242",
        submitColor: "#F44336",
        cancelColor: "#F44336",
        clockBackground: "#424242",
        clockItemColor: "#fafafa",
        clockItemInnerColor: "#e0e0e0",
        handColor: "#F44336"
    })
}

function showWithButtons() {
    Timepicker.showPicker({
        onSubmit: (time) => {
            alert(`You selected time: ${time.formatted()}`)
        },
        onCancel: () => {
            alert("Cancelled")
        }
    });
}

function fancyPicker() {
    Timepicker.showPicker({
        time: document.getElementById("selected").value,
        headerBackground: '#11aadd',
        headerColor: '#abcdef',
        headerSelected: '#ff0fff',
        wrapperBackground: "#720000",
        footerBackground: "#00fa00",
        submitColor: "#ab0923",
        clockBackground: "#1100cc",
        clockItemColor: "#e934fa",
        clockItemInnerColor: "#2bff71",
        handColor: "#f1234f",
        onSubmit: (selected) => {
            document.getElementById("selected").value = selected.formatted();
        }
    })
}