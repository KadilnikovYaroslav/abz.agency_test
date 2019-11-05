import { extend } from "vee-validate";
import {
    required,
    min,
    max,
    digits,
    email,
    dimensions,
    numeric,
    regex,
    confirmed,
    ext,
    image,
    mimes,
    size } from "vee-validate/dist/rules";
import { localize } from 'vee-validate';



// Install required rule and message.
extend("required", required);

// Install confirmed rule and message.
extend("confirmed", confirmed);

// Install email rule and message.
extend("email", email);

// Install min rule and message.
extend("min", min);

// Install max rule and message.
extend("max", max);

// Install digits rule and message.
extend("digits", digits);

// Install dimensions rule and message.
extend("dimensions", dimensions);

// Install numeric rule and message.
extend("numeric", numeric);

// Install regex rule and message.
extend("regex", regex);

// Install size rule and message.
extend("size", size);

// Create my rule for validate resolution image.
extend('resolution', {
    validate: async (value) => {

        let promise = new Promise((resolve, reject) => {

            let minWidth = 70;
            let minHeight = 70;
            let url = URL.createObjectURL(value[0]);
            let img = new Image;
    
            img.src = url;
        
            img.onload = function() {
    
                if(img.width < minWidth && img.height < minHeight) {
                    return resolve(false);
                }else{
                    return resolve(true);
                }
            }
        });
        
        let result = await promise;

        if(!result) {
            return result;
        }else{

            let el = document.getElementById("inputFile");

            el.dispatchEvent(new CustomEvent("getValidNameLoadFile", {
                detail: { name: value[0].name }
            }));

            return result;
        }

    },
    message(result) {
        if(result) "";
        return 'Minimum resolution image 70x70px';
    }
});

localize('en', {
    messages: {
        required: "This field is required",
        min: "Min length name 2 characters",
        max: "Max length name 60 characters",
        regex: "Phone not valid",
        digits: "You entered is not a complete phone number",
        numeric: "Entered only number",
        email: "Email not valid",
        size: "Max size 5 MB"
    }
});
