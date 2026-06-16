import axios from "axios";

const RANDOM_USER_URL = "https://randomuser.me/api";

const maleImages = Array.from({ length: 13 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `/src/assets//male/male-${num}.png`;
});

const femaleImages = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return `/src/assets/famale/famale-${num}.png`;
});

function getRandomImage(gender, usedImages) {
  const list = gender === "male" ? maleImages : femaleImages;
  const available = list.filter((img) => !usedImages.includes(img));
  const pool = available.length > 0 ? available : list;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

async function fetchCharacters(count = 5) {
  const response = await axios.get(RANDOM_USER_URL, {
    params: {
      results: count,
      nat: "br",
      inc: "name,gender,dob,nat",
    },
  });

  const usedImages = [];

  const characters = response.data.results.map((person) => {
    const image = getRandomImage(person.gender, usedImages);
    usedImages.push(image);

    return {
      name: person.name.first + " " + person.name.last,
      age: person.dob.age,
      gender: person.gender,
      nationality: person.nat,
      image,
    };
  });

  return characters;
}

export function stripImages(characters) {
  return characters.map(({ image, ...rest }) => rest);
}

export default fetchCharacters;
