const statusMap = {
  0: 'Novi nalaz',
  1: 'Poslano u lab.'
};

const vrstaMap = {
  1: 'Ambulantni',
  2: 'Bolnički',
  3: 'Dnevna bolnica'
};

const prioriterMap = {
  0: 'Redovno',
  1: 'Hitno'
};

export const uputnicaTransformer = (uputnice, setUputnice) => {
  const izmUputnice = [];

  for (const uputnica of uputnice) {
    const uputnicaData = {...uputnica}
    uputnicaData.naziv_statusa = statusMap[uputnica.status];
    uputnicaData.vrsta_naziv = vrstaMap[uputnica.vrsta];
    uputnicaData.prioritet_naziv = prioriterMap[uputnica.prioritet];

    izmUputnice.push(uputnicaData);
  }

  if (setUputnice) setUputnice(izmUputnice);
  return izmUputnice;
}