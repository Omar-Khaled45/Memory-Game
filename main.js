// Select The Start Button
document.querySelector(".start span").onclick = () => {
  let name = prompt("What Is Your Name?");

  // If Name Is Empty
  if (name === null || name === "") {
    document.querySelector(".info .name span").textContent = "Unknown";

    blocks.forEach((block) => {
      block.classList.add("clicked");
      setTimeout(() => {
        block.classList.remove("clicked");
      }, 2000);
    });
  } else {
    name = name.slice(0, 1).toUpperCase() + name.slice(1, name.length);
    document.querySelector(".info .name span").textContent = name;

    blocks.forEach((block) => {
      block.classList.add("clicked");
      setTimeout(() => {
        block.classList.remove("clicked");
      }, 2000);
    });
  }

  // Remove Start Game Screen
  document.querySelector(".start").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".blocks-container");

let blocks = Array.from(document.querySelectorAll(".block"));

// Make Order Range
let orderRange = [...Array(blocks.length).keys()];

// Trigger Shuffle Function
shuffle(orderRange);

blocks.forEach((block, index) => {
  // Add Order Property to Blocks
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger Flip Function
    flip(block);
  });
});

// Shuffle Function
function shuffle(arr) {
  let currentIndex = arr.length,
    temp,
    random;

  while (currentIndex != 0) {
    random = Math.floor(Math.random() * currentIndex);

    currentIndex--;

    // Save Current Element in Stash
    temp = arr[currentIndex];

    // New Element = Current Element
    arr[currentIndex] = arr[random];

    // Random Element = Element in Stash
    arr[random] = temp;
  }

  return arr;
}

// Flip Function
function flip(block) {
  // Add Clicked Class
  block.classList.add("clicked");

  // Collect All Flipped Blocks
  let flippedBlocks = blocks.filter((ele) => {
    return ele.classList.contains("clicked");
  });

  if (flippedBlocks.length === 2) {
    // Trigger Stop Clicking Function
    stopClicking();

    // Trigger Check Matched Blocks
    checkBlocks(flippedBlocks[0], flippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add no-clicking Class
  blocksContainer.classList.add("no-clicking");

  // Remove no-clicking Class
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Blocks Function
function checkBlocks(first, second) {
  let tries = document.querySelector(".info .tries span");

  if (first.dataset.name === second.dataset.name) {
    // Remove Clicked Class
    first.classList.remove("clicked");
    second.classList.remove("clicked");

    // Add Matched Class
    first.classList.add("matched");
    second.classList.add("matched");
  } else {
    // Increment tries
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    // Remove Clicked Class
    setTimeout(() => {
      first.classList.remove("clicked");
      second.classList.remove("clicked");
    }, duration);
  }
}
