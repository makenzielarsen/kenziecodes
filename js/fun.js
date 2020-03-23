function runsearch(form) {
  let search = document.getElementById("searchImage");
  var imagesearch = "http://www.google.com/search?q=" + escape(search.value);
  form.action = imagesearch;
  form.submit();
}

$(document).ready(function() {
  $("#thumbnailPictures img").on({
    mouseover: function() {
      $(this).css({
        cursor: "pointer",
        "border-color": "#0277bd"
      });
    },
    mouseout: function() {
      $(this).css({
        cursor: "default",
        "border-color": "gray"
      });
    },
    click: function() {
      var imageURL = $(this).attr("src");
      $("#imageDisplay")
        .fadeOut(1000, function() {
          $(this).attr("src", imageURL);
        })
        .fadeIn(500);
    }
  });
});
