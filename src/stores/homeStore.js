import axios from "axios";
import { create } from "zustand";
import debounce from "../helpers/debounce";

const homeStore = create((set) => ({
  coins: [],
  trending: [],
  query: "",
  searching: false,
  searched: false,

  setQuery: (e) => {
    set({ query: e.target.value });
    homeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    set({ searching: true });
    const { query, trending } = homeStore.getState();

    if (query.length > 2) {
      // console.log(query);
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const coins = res.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
          symbol: coin.symbol,
          market_cap_rank: coin.market_cap_rank,
        };
      });
      // console.log(res.data);

      set({ coins, searching: false, searched: true });
    } else {
      set({ coins: trending, searching: false, searched: false });
    }
  }, 500),

  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/search/trending"),
      axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      ),
      // axios.get(
      //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false"
      // ),
      console.log("coin is being fetched"),
    ]);

    const btcPrice = btcRes.data.bitcoin.usd;
    console.log(btcPrice);

    const coins = res.data.coins.map((coin) => {
      return {
        name: coin.item.name,
        image: coin.item.large,
        id: coin.item.id,
        priceBtc: coin.item.price_btc.toFixed(7),
        priceUsd: (coin.item.price_btc * btcPrice).toFixed(7),
        market_cap_rank: coin.item.market_cap_rank,
        slug: coin.item.slug,
      };
    });

    set({ coins, trending: coins });
  },
}));

export default homeStore;
