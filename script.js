function scroll_up() {
  window.scrollBy(0, -20);
}

function scroll_down() {
  window.scrollBy(0, 20);
}

function calc_scroll_percent(scroll_y) {
  const total_height =
    document.documentElement.scrollHeight - window.innerHeight;
  const scroll_percent = (scroll_y / total_height) * 100;
  return scroll_percent;
}

function handle_scroll() {
  let scroll_pos = window.scrollY;
  const line_counter = document.getElementById("line-counter");
  let scroll_percent = Math.ceil(calc_scroll_percent(scroll_pos));
  if (scroll_percent == 100) {
    line_counter.innerHTML = "&nbsp;Manual page orhun(1) (END)";
    line_counter.style.filter = "invert(0%)";
  } else {
    if (isNaN(scroll_percent)) {
      scroll_percent = 0;
    }
    line_counter.innerHTML =
      "&nbsp;Manual page orhun(1) " + scroll_percent + "%";
    line_counter.style.filter = "invert(0%)";
  }
  // line_counter.innerHTML += " (press h for help)";
  if (document.getElementById("mainContainer").style.display === "none") {
    line_counter.innerHTML += " (press q to go back)";
  } else {
    line_counter.innerHTML += " (press h for help)";
  }
  line_counter.style.display = "block";
}

//makes sure init scroll% is accurate
handle_scroll();

document.addEventListener("scroll", () => {
  handle_scroll();
});

function is_number(key) {
  return !isNaN(parseInt(key)) && isFinite(key);
}

let str_num = "";
let was_g_last = false;

document.addEventListener("keydown", function(e) {
  const line_counter = document.getElementById("line-counter");
  let add_num = true;
  let repeat = 1;
  let key = e.key;
  if (key == "Backspace") {
    str_num = str_num.substr(0, str_num.length - 1);
    if (str_num.length == 0) {
      handle_scroll();
    } else {
      line_counter.style.filter = "invert(100%)";
      line_counter.innerHTML = ":" + str_num;
    }
  }
  if (is_number(key) && add_num) {
    str_num = str_num + key;
    line_counter.style.filter = "invert(100%)";
    line_counter.innerHTML = ":" + str_num;
  } else if (add_num == false) {
    //do nothing
  } else {
    if (key == "Escape") {
      str_num = "";
      was_g_last = false;
      repeat = 0;
      line_counter.style.filter = "invert(100%)";
      line_counter.innerHTML = "ESC";
    }
    if (str_num != "") {
      repeat = Number(str_num);
    }

    if (key == "g") {
      if (was_g_last) {
        document.documentElement.scrollTop = 0;
        handle_scroll();
        repeat = 0;
      } else {
        was_g_last = true;
      }
    } else {
      was_g_last = false;
    }

    if (key == "G") {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;
      handle_scroll();
      repeat = 0;
    }

    switch (key) {
      case "h":
        document.getElementById("mainContainer").style.display = "none";
        document.getElementById("helpContainer").style.display = "block";
        line_counter.style.display = "none";
        handle_scroll();
        break;
      case "q":
        document.getElementById("mainContainer").style.display = "block";
        document.getElementById("helpContainer").style.display = "none";
        line_counter.style.display = "none";
        handle_scroll();
        break;
      case "j":
        for (let i = 0; i < repeat; i++) {
          scroll_down();
        }
        break;
      case "k":
        for (let i = 0; i < repeat; i++) {
          scroll_up();
        }
        break;
    }
    str_num = "";
  }
});
