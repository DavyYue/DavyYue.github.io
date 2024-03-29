//Typed animation
function newTyped() {}
$(function () {
  $("#typed").typed({
    // Change to edit type effect
    strings: [
      "fold origami",
      "play my alto sax",
      "dance bachata",
      "explore creativity",
      "dance east-coast swing",
      "turn bugs into features",
      "do public speaking",
      "design luxury decor",
      "read great novels",
      "eat delicious sushi",
    ],
    typeSpeed: 90,
    backDelay: 2000,
    contentType: "html",
    loop: !0,
    resetCallback: function () {
      newTyped();
    },
  }),
    $(".reset").click(function () {
      $("#typed").typed("reset");
    });
});

//Blinking animation
(function blink() {
  $(".blink_me").fadeOut(3000).fadeIn(3000, blink);
})();

//Tabs
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tabcontent.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(cityName).style.display = "block";
  if (evt) {
    evt.currentTarget.classList.add("active");
  }
}

//Contact Me Form Popup
jQuery(document).ready(function ($) {
  //trigger the animation - open modal window
  $('[data-type="modal-trigger"]').on("click", function () {
    var actionBtn = $(this),
      scaleValue = retrieveScale(actionBtn.next(".cd-modal-bg"));

    actionBtn.addClass("to-circle");
    actionBtn
      .next(".cd-modal-bg")
      .addClass("is-visible")
      .one(
        "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function () {
          animateLayer(actionBtn.next(".cd-modal-bg"), scaleValue, true);
        }
      );

    //if browser doesn't support transitions...
    if (actionBtn.parents(".no-csstransitions").length > 0)
      animateLayer(actionBtn.next(".cd-modal-bg"), scaleValue, true);
  });

  //trigger the animation - close modal window
  $(".cd-section .cd-modal-close").on("click", function () {
    closeModal();
  });
  $(document).keyup(function (event) {
    if (event.which == "27") closeModal();
  });

  $(window).on("resize", function () {
    //on window resize - update cover layer dimention and position
    if ($(".cd-section.modal-is-visible").length > 0)
      window.requestAnimationFrame(updateLayer);
  });

  function retrieveScale(btn) {
    var btnRadius = btn.width() / 2,
      left = btn.offset().left + btnRadius,
      top = btn.offset().top + btnRadius - $(window).scrollTop(),
      scale = scaleValue(
        top,
        left,
        btnRadius,
        $(window).height(),
        $(window).width()
      );

    btn.css("position", "fixed").velocity(
      {
        top: top - btnRadius,
        left: left - btnRadius,
        translateX: 0,
      },
      0
    );

    return scale;
  }

  function scaleValue(topValue, leftValue, radiusValue, windowW, windowH) {
    var maxDistHor = leftValue > windowW / 2 ? leftValue : windowW - leftValue,
      maxDistVert = topValue > windowH / 2 ? topValue : windowH - topValue;
    return Math.ceil(
      Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) /
        radiusValue
    );
  }

  function animateLayer(layer, scaleVal, bool) {
    layer.velocity({ scale: scaleVal }, 400, function () {
      $("body").toggleClass("overflow-hidden", bool);
      bool
        ? layer
            .parents(".cd-section")
            .addClass("modal-is-visible")
            .end()
            .off(
              "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
            )
        : layer
            .removeClass("is-visible")
            .removeAttr("style")
            .siblings('[data-type="modal-trigger"]')
            .removeClass("to-circle");
    });
  }

  function updateLayer() {
    var layer = $(".cd-section.modal-is-visible").find(".cd-modal-bg"),
      layerRadius = layer.width() / 2,
      layerTop =
        layer.siblings(".btn").offset().top +
        layerRadius -
        $(window).scrollTop(),
      layerLeft = layer.siblings(".btn").offset().left + layerRadius,
      scale = scaleValue(
        layerTop,
        layerLeft,
        layerRadius,
        $(window).height(),
        $(window).width()
      );

    layer.velocity(
      {
        top: layerTop - layerRadius,
        left: layerLeft - layerRadius,
        scale: scale,
      },
      0
    );
  }

  function closeModal() {
    var section = $(".cd-section.modal-is-visible");
    section
      .removeClass("modal-is-visible")
      .one(
        "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function () {
          animateLayer(section.find(".cd-modal-bg"), 1, false);
        }
      );
    //if browser doesn't support transitions...
    if (section.parents(".no-csstransitions").length > 0)
      animateLayer(section.find(".cd-modal-bg"), 1, false);
  }
});
