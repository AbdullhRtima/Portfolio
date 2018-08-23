$document.ready(function(){
   $('.deleteProject').on('click', deleteProject);
});

function deleteProject(){
    deleteId = $(this).data('id');
    var confirmation = confirm('Are You Sure wanna delete this item ??');

    if (confirmation){
        $.ajax({
            type :'DELETE',
            url  :'/admin/delete/'+deleteId 
        }).done(function(response){

        });
        window.location = '/admin' ;

    }else{
        return false ; 
    }
}