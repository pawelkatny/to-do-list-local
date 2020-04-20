$(".btn-delete").click((event) => {
    var listID = $(event.target).parent().parent().parent().prop('id');
    $.ajax({
        method: 'POST',
        url: '/deletelist',
        data: { listID: listID },
        dataType: 'json',
        success: (response) => {
            window.location.href = response.redirect_path;
        }
    })
})