function runsearch(form) {
  let search = document.getElementById("searchImage");
  var imagesearch = "http://www.google.com/search?q=" + escape(search.value);
  form.action = imagesearch;
  form.submit();
}
