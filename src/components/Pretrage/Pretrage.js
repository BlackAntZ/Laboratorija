import "./App.css";
import IzborAnaliza from "./components/grupeanalize/IzborAnaliza";
import "react-toastify/dist/ReactToastify.css";
import {useStore} from "./store";

function Pretrage({sesija, pretrage, zatvoriPretrage, pacijent, otvoriDetalj}) {
  const dodajSesiju = useStore((store) => store.dodajSesiju);
  const unesiPretrage = useStore((store) => store.unesiPretrage);

  dodajSesiju(sesija);
  unesiPretrage(pretrage);

  return (
    <div className="App">
      <IzborAnaliza zatvoriPretrage={zatvoriPretrage} pacijent={pacijent} otvoriDetalj={otvoriDetalj} />
    </div>
  );
}

export default Pretrage;
