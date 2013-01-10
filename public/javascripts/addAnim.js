$(function(ready){

    var dropDownListValues = new Array();
    var s = 0;
    var sheepItForm = $('#sheepItForm').sheepIt({
        separator: '',
        allowRemoveLast: true,
        allowRemoveCurrent: true,
        allowRemoveAll: true,
        allowAdd: true,
        allowAddN: true,
        maxFormsCount: 15,
        minFormsCount: 0,
        iniFormsCount: 0,
        afterClone: function(source, clone) {
            var selectElement = $(clone).find('select');
            $(selectElement).find('option').each(function(i){
                if($(this).val()==dropDownListValues[s]){
                    $(this).attr('selected',true);
                }else{
                    $(this).removeAttr('selected');
                }
            });
            s++;

        }
    });
});