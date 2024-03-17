//เตรียมโดน append
const pokeContainer = document.getElementById("pokeContain");

//ตัวแปรสำหรับ เก็บค่า  Favorite
const pokeDeck = {};
let pokemon = [];

//สร้าง function สำหรับจัดการ Fav
const updateDeck = () => {
    document.querySelector("#deckSummary").replaceChildren([]);

    let totalPrice = 0;

    for (const key of Object.keys(pokeDeck)) {
        const quantity = pokeDeck[key];

        const itemRow = document.createElement("tr");

        const itemName = document.createElement("th");
        itemName.innerText = key;

        const itemQuantity = document.createElement("td");
        itemQuantity.innerText = quantity;

        itemRow.append(itemName, itemQuantity);

        document.querySelector("#deckSummary_items").append(itemRow);

        // ค้นหา Pokemon ที่ตรงกับ key ใน pokeDeck
        const foundPokemon = pokemon.find(poke => poke.name === key);
        if (foundPokemon) {
            totalPrice += foundPokemon.price * quantity;
        }
    }

    document.querySelector("#deckSummary_total").innerText = totalPrice;
};

//ตรงนี้คือ fetch ข้อมูลมาแสดง
fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
  .then((res) => res.json())
  .then((data) => {
    pokemon = data.pokemon;

    //ตรงนี้คือสั่งสร้าง container name img และ ปุ่มกดเพิ่ม Fav
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
        // เพิ่มโค้ดที่คุณต้องการเมื่อกดปุ่ม Add to Favorites ที่นี่
        if (pokeDeck[poke.name] === undefined) pokeDeck[poke.name] = 0;
        pokeDeck[poke.name] = pokeDeck[poke.name] + 1;

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
    const viewCartButton = document.querySelector('#viewCart');
    viewCartButton.addEventListener('click', () => {
        
        const deckSummary = document.querySelector('#deckSummary');
        const display = deckSummary.style.display;

        if (display === 'none') {
            deckSummary.style.display = 'block';
        } else {
            deckSummary.style.display = 'none';
        }
    });
};
deckViewCart()
