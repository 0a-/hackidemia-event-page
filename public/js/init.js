//form width
$(function() {
    var length = 0,
        inputDefaultWidth, f = $("form");
    f.children("p").each(function() {
        if (length === 0) {
            length = $(this).outerWidth();
            inputDefaultWidth = $(this).children("input").width();
        } else {
            var l = $(this).outerWidth();
            $(this).children("input").width(inputDefaultWidth - (l - length));
        }
    });
    var msg = $(".message");
    $(".submit").on("click", function() {
        var data = {
                inited: "true"
            },
            err = false;
        $("input").each(function() {
            if (this.value !== "") {
                data[this.name] = this.value;
            } else {
                err = true;
            }
        });
        if (err) {
            msg.text("You need to fill up every blank before submission~");
        } else {
            $.get("/init", data);
            msg.text("Done~ You can restart your server now ;)");
        }
    });
});
