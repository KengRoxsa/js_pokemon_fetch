// เตรียมโดน append
const pokeContainer = document.getElementById("pokeContain");

// ตัวแปรสำหรับเก็บค่า Favorite
const pokeDeck = {};
let pokemon = [];

// สร้าง function สำหรับจัดการ Fav
const updateDeck = () => {
  const deckSummaryItems = document.querySelector("#deckSummary_items");
  deckSummaryItems.innerHTML = "";

  let totalPokemon = 0;

  for (const key of Object.keys(pokeDeck)) {
    const quantity = pokeDeck[key];
    totalPokemon += quantity;

    const itemRow = document.createElement("tr");

    const itemName = document.createElement("th");
    itemName.innerText = key;

    const itemQuantity = document.createElement("td");
    itemQuantity.innerText = quantity;

    itemRow.appendChild(itemName);
    itemRow.appendChild(itemQuantity);

    

    deckSummaryItems.appendChild(itemRow);
  }
  document.querySelector("#deckSummary_total").innerText = totalPokemon; // แสดงผลรวมของจำนวน Pokemon ทั้งหมดใน total
};

// ตรงนี้คือ fetch ข้อมูลมาแสดง
fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
  .then((res) => res.json())
  .then((data) => {
    pokemon = data.results;

    // ตรงนี้คือสั่งสร้าง container name img และ ปุ่มกดเพิ่ม Fav
    data.results.forEach((poke) => {
      const pokeContainer = document.createElement("div");
      pokeContainer.classList.add("pokemon-container");

      const namePoke = document.createElement("p");
      namePoke.textContent = poke.name;

      const imagePoke = document.createElement("img");
      imagePoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonId(
        poke.url
      )}.png`;
      imagePoke.alt = poke.name;

      // สร้างปุ่ม Fav + รับ onClick
      const favoriteButton = document.createElement("button");
      favoriteButton.textContent = "Add to Favorites";
      favoriteButton.addEventListener("click", () => {
        if (pokeDeck[poke.name] === undefined) pokeDeck[poke.name] = 0;
        pokeDeck[poke.name] += 1; // เพิ่มทีละ 1 เมื่อกด

        updateDeck();
      });

      pokeContainer.appendChild(namePoke);
      pokeContainer.appendChild(imagePoke);
      pokeContainer.appendChild(favoriteButton);

      pokeContain.appendChild(pokeContainer);
    });
  })
  .catch((error) => {
    console.error("เกิดข้อผิดพลาด:", error);
  });

// ตรงนี้คือปรับ part
function extractPokemonId(url) {
  const parts = url.split("/");
  return parts[parts.length - 2];
}

const deckViewCart = () => {
  const viewCartButton = document.querySelector("#viewCart");
  viewCartButton.addEventListener("click", () => {
    const deckSummary = document.querySelector("#deckSummary");
    const display = deckSummary.style.display;

    if (display === "none") {
      deckSummary.style.display = "block";
      document.querySelector("#viewCart").innerText = ":"
    } else {
      deckSummary.style.display = "none";
      document.querySelector("#viewCart").innerText = "Watch Deck"
    }
  });
};
// เพิ่มปุ่ม Submit
const submitButton = document.createElement("button");
submitButton.textContent = "Submit";
submitButton.addEventListener("click", () => {
    alert("ขอบคุณสำหรับการใช้บริการ");
    location.reload()
});

// เพิ่มปุ่ม Submit ไว้ใต้ Total
document.querySelector("#deckSummary").appendChild(submitButton);


deckViewCart();
