import axios from "axios";

const RANDOM_USER_URL = "https://randomuser.me/api";

async function fetchCharacters(count = 5) {
  const response = await axios.get(RANDOM_USER_URL, {
    params: {
      results: count,
      nat: "br",
      inc: "name,gender,location,picture,dob,nat",
    },
  });

  const characters = response.data.results.map((person) => {
    const gender = person.gender === "male" ? "man" : "woman";
    const age = person.dob.age;

    const imagePrompt = encodeURIComponent(
      `dark noir cinematic portrait of a ${age} year old brazilian ${gender}, dramatic blue lighting, dark background, realistic, high quality, detective game character, mysterious atmosphere`,
    );

    return {
      name: person.name.first + " " + person.name.last,
      age,
      gender: person.gender,
      nationality: person.nat,
      image: `https://image.pollinations.ai/prompt/${imagePrompt}`,
    };
  });

  return characters;
}

export function stripImages(characters) {
  return characters.map(({ image, ...rest }) => rest);
}

export default fetchCharacters;
