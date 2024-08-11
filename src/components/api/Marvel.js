import axios from "axios";
import md5 from "md5";

const publicKey = "6ebfd7a18ff301e4b0288300d28dde8b";
const privateKey = "a02685010313c3f6c65e24e2d16e95c7dca8b3a2";

export const fetchCharacters = async () => {
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);

  try {
    const response = await axios.get("http://gateway.marvel.com/v1/public/characters", {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });

    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching data from Marvel API", error);
    return [];
  }
};

export const fetchCharacterById = async (id) => {
  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey);

  try {
    const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });

    return response.data.data.results[0];
  } catch (error) {
    console.error(`Error fetching character with ID ${id} from Marvel API`, error);
    return null;
  }
};
