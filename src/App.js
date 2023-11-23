import React, {useCallback, useEffect, useState} from "react";
import ListaUputnica from "./components/Uputnice/ListaUputnica";
import {uputnicaTransformer} from "./components/util/transformer";
import Uputnica from "./components/Modals/Uputnica/Uputnica";
import Pretrage from "./components/Pretrage/Pretrage";
import {format} from "date-fns";

const App = () => {
  const [sesijaPodaci, setSesijaPodaci] = useState({});

  const [uputnice, setUputnice] = useState([]);

  const [klinike, setKlinike] = useState([]);
  const [odjeli, setOdjeli] = useState([]);

  const [doktori, setDoktori] = useState([]);

  const [pretrage, setPretrage] = useState([]);

  const [prikaziUputnice, setPrikaziUputnice] = useState(true);

  const [otvoriDetaljUputnice, setOtvoriDetaljUputnice] = useState(false);
  const [podaciUputnice, setPodaciUputnice] = useState({});

  const povuciPodatke = useCallback(async method => {
    const responose = await fetch(`../rpc/laboratorija.cfc?method=${method}`);
    return await responose.json();
  }, []);

  const [columnFilters, setColumnFilters] = useState([]);
  const [prikaziSveUputnice, setPrikaziSveUputnice] = useState(0);

  useEffect(() => {
    povuciPodatke('get_session').then(r => {
      setSesijaPodaci(r);
      setColumnFilters([{ id: 'kreirano_korisnik', value: `${r['id_korisnika']}` }]);
    });
  }, [povuciPodatke]);

  useEffect(() => {
    povuciPodatke('laboratorija_uputnice_lista').then(r => uputnicaTransformer(r['lista'], setUputnice));
  }, [povuciPodatke]);

  useEffect(() => {
    povuciPodatke('lista_klinike').then(r => setKlinike(r['lista_klinike']));
  }, [povuciPodatke]);

  useEffect(() => {
    povuciPodatke('lista_odjeli').then(r => setOdjeli(r['lista_odjeli']));
  }, [povuciPodatke]);

  useEffect(() => {
    povuciPodatke('lista_doktori').then(r => setDoktori(r['lista']));
  }, [povuciPodatke]);

  useEffect(() => {
    povuciPodatke('lista_pretraga').then(r => setPretrage(r['lista_pretraga']));
  }, [povuciPodatke]);

  const pacijentPodaci = `${podaciUputnice['prezime']} (${podaciUputnice['ime_roditelja']}) ${podaciUputnice['ime']} ${podaciUputnice['datum_rodjenja'] ? format(new Date(podaciUputnice['datum_rodjenja']), 'dd.MM.yyyy') : ''}`;

  const povuciFzoPodatke = async () => {
    const responose = await fetch(`../rpc/izis_rs.cfc?method=OsiguranikUID2&id=3121299108&__BDRETURNFORMAT=json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return await responose.json();
  }

  const povuciEpizodu = async id => {
    const newData = new URLSearchParams();

    newData.append('id_epizode', id);

    const responose = await fetch(`../rpc/laboratorija.cfc?method=ucitaj_epizodu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: newData
    });
    return await responose.json();
  }

  const updateUputniceHandler = async id => {
    const fetchUputnica = await fetch(`../rpc/laboratorija.cfc?method=laboratorija_uputnice_lista&id=${id}`);

    const uputnicaParse = await fetchUputnica.json();

    const izmUputnice = [...uputnice];
    const novaUputnica = uputnicaTransformer(uputnicaParse['lista']);

    izmUputnice.push(novaUputnica[0]);

    setUputnice(izmUputnice);
    return novaUputnica[0];
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('id_epizode')) {
      const epizodaId = urlParams.get('id_epizode');
      povuciEpizodu(epizodaId).then(r => {
        updateUputniceHandler(r.id).then(rez => {
          setPodaciUputnice(rez);
          setPrikaziUputnice(false);
        });
      });
    }
  }, []);

  useEffect(() => {
    povuciFzoPodatke().then(r => console.log(r));
  }, []);

  return (
    <div>
      {prikaziUputnice && uputnice && uputnice.length > 0 && <ListaUputnica data={uputnice} setPodaciUputnice={setPodaciUputnice} columnFilters={columnFilters}
                                                                            setColumnFilters={setColumnFilters} prikaziSveUputnice={prikaziSveUputnice}
                                                                            setPrikaziSveUputnice={setPrikaziSveUputnice} korisnik={sesijaPodaci['id_korisnika']}
                                                                            otvoriPretrage={() => setPrikaziUputnice(false)} />}

      {otvoriDetaljUputnice && <Uputnica klinike={klinike} odjeli={odjeli} recordForEdit={podaciUputnice} doktori={doktori}
                                         closeModal={() => setOtvoriDetaljUputnice(false)} prikaziPretrage={setPrikaziUputnice} />}

      {!prikaziUputnice && <Pretrage pretrage={pretrage} sesija={sesijaPodaci} pacijent={pacijentPodaci} otvoriDetalj={setOtvoriDetaljUputnice}
                                     zatvoriPretrage={() => setPrikaziUputnice(true)} />}
    </div>
  );
}

export default App;
