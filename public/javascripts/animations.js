$(function(ready){
    $('#addAnim').click(function() {
        parent.location = 'animations/add';
    });
    $('#deleteAnim').click(function() {
        parent.location = 'animations/delete';
    });
    $('#listAnim').click(function() {
        parent.location= 'animations/list';
    });
});