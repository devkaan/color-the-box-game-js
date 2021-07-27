function popup(p, o, s, u) {
  "0" == $(".popup").css("opacity") && ($(".popup .message").html(p), s || (s = "default"), $(".popup").addClass("popupactive " + s), "auto" == o && setTimeout(() => { $(".popup").removeClass("popupactive").delay("slow").removeClass("warning danger info success") }, u))
} $(".closepopup").on("click", () => {
  // $(".popup").removeClass("");
  $(".popup").removeClass("popupactive");
});
document.querySelector('.container').innerHTML += `<div class="popup">
<div class="message"></div>
<div class="closepopup">
  <i class="fas fa-times"></i>
</div>
</div>`