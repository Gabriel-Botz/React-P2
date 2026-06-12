import axios from "axios";

const RANDOM_USER_URL = "https://randomuser.me/api";

async function fetchCharacters() {
  const response = await axios.get(RANDOM_USER_URL);
  const characters = response.data.results.map((person) => {
    return {
      name: person.name.first + " " + person.name.last,
      age: person.dob.age,
      gender: person.gender,
      nationality: person.nat,
      image: person.picture.large,
    };
  });

  return characters;
}

export default fetchCharacters;
