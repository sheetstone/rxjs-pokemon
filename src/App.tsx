import React, { useEffect, useState, useMemo } from "react";
import { useObservableState } from "observable-hooks";

import "./App.css";

import { pokemon$, selected$, deck$, Pokemon } from "./store";

const Deck = () => {
  const deck = useObservableState(deck$, []);
  return (
    <>
      <h4>Deck</h4>
      <div></div>
    </>
  );
};

const Search = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const sub = pokemon$.subscribe(setPokemon);
    return () => sub.unsubscribe();
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, pokemon]);

  return (
    <div className="grid">
      <input
        type="text"
        value={search}
        className="header"
        onChange={(evt) => {
          setSearch(evt.target.value);
        }}
      />
      <div>
        {filteredPokemon.map((p) => (
          <div key={p.name}>
            <input
              type="checkbox"
              checked={p.selected}
              onChange={() => {
                if (selected$.value.includes(p.id)) {
                  selected$.next(selected$.value.filter((id) => id !== p.id));
                } else {
                  selected$.next([...selected$.value, p.id]);
                }
              }}
            />
            <strong>{p.name}</strong> - {p.power}
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App grid">
      <div>{Search()}</div>
      <div>{Deck()}</div>
    </div>
  );
}

export default App;
