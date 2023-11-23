// init

let $left = 0;
let $counter = 0;
let $isAlive = true;
let $characterPositionMin;
let $characterPositionMax;

$(document).keydown(function (e) {
  $characterPositionMin = $("#character").position().left; // dino left position value

  if (e.keyCode == 32 && $isAlive) {
    // is space pressed
    $("#character").addClass("animate");
    setTimeout(() => {
      $("#character").removeClass("animate");
    }, 400);
  } else if (e.keyCode == 39 && $isAlive) {
    // if right arrow is pressed
    $left += 10;
    $("#character").css({
      left: $left + "px",
    });
  } else if (e.keyCode == 37 && $isAlive && $characterPositionMin >= 0) {
    // don't go outside the game border
    $left -= 10;
    $("#character").css({
      left: $left + "px",
    });
  }
});

// check dead
function checkDead() {
  const $characterBottom = parseInt($("#character").css("bottom")); // did i jump ?
  const $blockLeft = parseInt($("#block").css("left"));
  // 2 lines below give us position of our dino
  $characterPositionMin = $("#character").position().left;
  $characterPositionMax = $("#character").position().left + 50; // why 50? dino width = 50px

  if (
    $blockLeft <= $characterPositionMax &&
    $blockLeft >= $characterPositionMin &&
    $blockLeft >= -40 &&
    $characterBottom <= 20
  ) {
    $("#block").css({
      animation: "none", // stop animation
    });
    $counter = 0; // end game
    $("#scoreSpan").html($counter);
    $("#character").addClass("rotated");
    $isAlive = false; // dino bead
    $(document).keydown(function (e) {
      if (e.keyCode == 82) {
        // press "r" to start again
        location.reload();
      }
    });
    return;
  } else if (
    $blockLeft != $characterPositionMax &&
    $blockLeft != $characterPositionMin &&
    $characterBottom >= 20
  ) {
    $counter += 1;
    $("#scoreSpan").html($counter);
  }
}

$(document).ready(function () {
  setInterval(checkDead, 10); // let's run this function every 10ms
});
