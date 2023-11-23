import "./CheckBox.css";
import { useStore } from "../../store";

const CheckBox = ({ pretraga }) => {
  const odaberiPretragu = useStore((store) => store.odaberiPretragu);
  const ponistiPretragu = useStore((store) => store.ponistiPretragu);
  const odabranePretrage = useStore((store) => store.odabranePretrage);
  // console.log("pretraga", pretraga);

  const unesiLabPretragu = (id) => {
    let checkBox = document.getElementById(id);
    if (checkBox.checked === true) {
      odaberiPretragu(id);
    } else {
      ponistiPretragu(id);
    }
  };
  return (
    <label key={pretraga.pretraga_id} className="label_container">
      <p className="naziv_usluge">{pretraga.pretraga_naz}</p>
      <input
        type="checkbox"
        id={pretraga.pretraga_id}
        onClick={() => unesiLabPretragu(pretraga.pretraga_id)}
        checked={odabranePretrage.includes(pretraga.pretraga_id) ? true : false}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
