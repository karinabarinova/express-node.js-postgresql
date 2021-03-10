function deleteLead(id) {
    $.ajax({
        url: '/lead/' + id + '/delete-json',
        dataType: 'json',
        data: JSON.stringify({id}),
        type: 'POST',
        success: (res => {
            console.log("Result: ", res)
            $("#"+id).remove();
        }),
        error: (error => {
            console.log("Error: ", error)
        })
    })
}