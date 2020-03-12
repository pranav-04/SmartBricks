$(document).ready(function(){
    $('.delete-property').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('data-id');
      $.ajax({
        type:'DELETE',
        url: '/property/'+id,
        success: function(response){
          alert('Deleting Property');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });
  