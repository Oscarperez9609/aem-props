(function($) {

    let REGEX_SELECTOR = 'regex.validation',
    foundationReg = $(window).adaptTo('foundation-registry');

    foundationReg.register("foundation.validation.validator", {
        selector: "[data-validation='" + REGEX_SELECTOR + "']",
        validate: function(el) {
            let regex_pattern = /^\S*$/;
            let error_message = 'Please enter valid FAQ ID.';
            let result = el.value.match(regex_pattern);

            if (result === null) {
                return error_message;
            }
        }
    });

}(jQuery));
