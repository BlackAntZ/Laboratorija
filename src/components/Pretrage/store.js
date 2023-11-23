import { create } from "zustand";

const store = (set) => ({
  sesijaPodaci: [],
  dodajSesiju: (data) => {
    set((store) => ({ sesijaPodaci: data }));
  },
  pretrage: [],
  unesiPretrage: (data) => {
    set((store) => ({ pretrage: data }));
  },
  ucitavanje: false,
  promjeniUcitavanje: (state) => {
    set((store) => ({ ucitavanje: state }));
  },
  odabranePretrage: [],
  odaberiPretragu: (pretraga) => {
    set((store) => ({
      odabranePretrage: [...store.odabranePretrage, pretraga],
    }));
  },
  ponistiPretragu: (pretraga) => {
    set((store) => ({
      odabranePretrage: store.odabranePretrage.filter((p) => p !== pretraga),
    }));
  },
  pretragaZaIzmjenu: null,
  unesiPretraguZaIzmjenu: (usluga) => {
    set((store) => ({ pretragaZaIzmjenu: usluga }));
  }
});

export const useStore = create(store);
