$("#postTextArea").keyup((event) => {
    var textbox = $(event.target);
    var value = textbox.val().trim();

    var submitButton =$("#submitPostButton");

    if(submitButton.length == 0) return alert("No submit button found")

    if(value =="") {
        submitButton.prop("disabled", true);
        return;
    }

    submitButton.prop("disabled", false)

})

$("#submitPostButton"). click(() => {
    var button = $(event.target);
    var textbox = $("#postTextArea")

    //object we want to send to the server
    var data = {
        content: textbox.val()
    }

    //sending a post AJAX request "$.post()"
    $.post("/api/posts", data, postData => {

        var html = createPostHtml(postData);
        $(".postsContainer").prepend(html); //"prepend" adds post to the top or beginning
        textbox.val(""); //removes users text from the textbox to clear it again
        button.prop("disabled", true)
    })

})

function createPostHtml(postData) {
    return postData.content;
}