function checkMaxSelected (select, maxSelected, displ_error_nummaxcat) {
    if (!select.storeSelections) {
        select.storeSelections = new Array(select.options.length);
        select.optionsSelected = 0;
    }

    for (var i = 0; i < select.options.length; i++) {
        console.log('select.options[i].selected: '+select.options[i].selected+' select.storeSelections[i]: '+select.storeSelections[i]);
        if (select.options[i].selected && !select.storeSelections[i]) {
            if (select.optionsSelected < maxSelected) {
                select.storeSelections[i] = true;
                select.optionsSelected++;
            }
            else {
                alert(displ_error_nummaxcat + maxSelected);
                console.log('HERE I SHOW ALERT!');
                select.options[i].selected = false;
            }
        }
        else if (!select.options[i].selected && select.storeSelections[i]) {
            select.storeSelections[i] = false;
            select.optionsSelected--;
        }
    }
}
