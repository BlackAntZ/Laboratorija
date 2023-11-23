import { useState, useEffect } from "react";
import { useStore } from "../../store";
import "./IzborAnaliza.css";
import KlinickaHemija from "../podgrupeanalize/KlinickaHemija";
import Hgu from "../podgrupeanalize/HematologijaGasneUrin";
import Kou from "../podgrupeanalize/KoagulacijaOsmolaritetUsluge";
import Alergija from "../podgrupeanalize/Alergija";
import Profil from "../podgrupeanalize/Profil";
import Autoimune from "../podgrupeanalize/Autoimune";
import ListaPretraga from "../ui/ListaPretraga";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import HashLoader from "react-spinners/HashLoader";
import Select, { components } from "react-select";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PretragaUnosForm from "../ui/PretragaUnosForm";

const IzborAnaliza = ({zatvoriPretrage, pacijent, otvoriDetalj}) => {
  const [tab, setTab] = useState("Rutina");
  const [isPregledDrawerOpen, setIsPregledDrawerOpen] = useState(false);
  const [isDodajDrawerOpen, setIsDodajDrawerOpen] = useState(false);
  const [opcije, setOpcije] = useState([]);
  const ucitavanje = useStore((store) => store.ucitavanje);
  const pretrage = useStore((store) => store.pretrage);
  const odabranePretrage = useStore((store) => store.odabranePretrage);
  const odaberiPretragu = useStore((store) => store.odaberiPretragu);
  const ponistiPretragu = useStore((store) => store.ponistiPretragu);

  const togglePregledDrawer = () => {
    setIsPregledDrawerOpen(!isPregledDrawerOpen);
  };

  const toggleDodajDrawer = () => {
    setIsDodajDrawerOpen(!isDodajDrawerOpen);
  };

  const grupe = pretrage.map((u) => {
    return u.pretrage_grupa;
  });
  const gg = [...new Set(grupe)];

  useEffect(() => {
    const opcijePretrage = pretrage
      .filter((p) => {
        return !odabranePretrage.includes(p.pretraga_id);
      })
      .map((u) => {
        return { label: u.pretraga_naz, value: u.pretraga_id };
      });
    setOpcije(opcijePretrage);
  }, [pretrage, odabranePretrage]);

  const notifyUnosPretrage = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1000,
      transition: Slide,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const Control = ({ children, ...props }) => {
    const style = {
      width: "42px",
      height: "40px",
      color: "#0e5959",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.5em",
    };
    return (
      <components.Control {...props}>
        <span style={style}>
          <i className="bx bx-test-tube"></i>
        </span>
        {children}
      </components.Control>
    );
  };

  const selectStyle = {
    control: (styles, state) => ({
      ...styles,
      borderWidth: "1px",
      "&:hover": {
        borderColor: "#2684ff",
      },
      borderColor: state.isFocused ? "#2684ff" : "#84dcc6",
      borderRadius: "5px",
      fontSize: "0.9em",
    }),
  };

  const handleChange = (odabranaPretraga, { action }) => {
    console.log(odabranaPretraga);
    console.log(action);
    if (action === "select-option") {
      odaberiPretragu(odabranaPretraga.value);
      notifyUnosPretrage("Labaratorijska pretraga unešena u nalog!");
    }
  };

  return (
    <div className="ia_container">
      <div className="ia_header">
        {gg.map((g) => (
          <div
            className={`ia_tab ${tab === g ? "izabranaGrupa" : ""}`}
            onClick={() => setTab(g)}
          >
            <p>{g.toUpperCase()}</p>
          </div>
        ))}
        <div className="ia_naslov">
          <p>{pacijent}</p>
        </div>
        <div className="dugme dugme_alt">
          <button onClick={zatvoriPretrage}>NAZAD</button>
        </div>
        <div className="dugme">
          <button onClick={togglePregledDrawer}>
            DODAJ/ PREGLEDAJ/ POŠALJI
          </button>
        </div>
        <div className={"uredi"}>
          <i onClick={() => otvoriDetalj(true)} className='bx bxs-user-rectangle'></i>
        </div>
        {/*<div className={`uredi ${tab === "Uredi" ? "uredi_aktivno" : ""}`}>*/}
        {/*  <i*/}
        {/*    className="bx bx-grid-horizontal"*/}
        {/*    onClick={() => setTab("Uredi")}*/}
        {/*  ></i>*/}
        {/*</div>*/}
      </div>
      <ToastContainer />
      <div className={tab === "Uredi" ? "ia_lista" : "ia_main"}>
        {ucitavanje === true && (
          <div className="ia_loader_container">
            <HashLoader
              color={"#d8315b"}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {tab === "Rutina" && ucitavanje === false && (
          <div className="ia_rutina">
            <KlinickaHemija />
            <Hgu />
            <Kou />
          </div>
        )}
        {tab === "Alergija" && ucitavanje === false && <Alergija />}
        {tab === "Profil" && ucitavanje === false && <Profil />}
        {tab === "Autoimune bolesti" && ucitavanje === false && <Autoimune />}
        {tab === "Uredi" && ucitavanje === false && <ListaPretraga />}
      </div>
      <Drawer
        open={isPregledDrawerOpen}
        onClose={togglePregledDrawer}
        direction="right"
        size="450px"
        className="draw_backdrop"
      >
        <div className="draw_menu">
          <p>DODAJ LAB. PRETRAGU U NALOG</p>
          <Select
            placeholder="Traži i izaberi lab. pretragu.."
            options={opcije}
            isSearchable
            isClearable
            //hideSelectedOptions
            color="var(--color-labos-400)"
            onChange={handleChange}
            styles={selectStyle}
            components={{ Control }}
          />
        </div>
        {odabranePretrage.length === 0 && (
          <div className="lista_dodatih_usluga">
            <p>Nema dodatih labaratorijskih pretraga !</p>
          </div>
        )}
        {odabranePretrage.length > 0 && (
          <div className="lista_dodatih_usluga">
            <p>Labaratorijske pretrage dodate u nalog:</p>
            <ol>
              {pretrage
                .filter((u) => {
                  return odabranePretrage.includes(u.pretraga_id);
                })
                .map((pretraga) => (
                  <li key={pretraga.pretraga_id}>
                    {" "}
                    {pretraga.pretraga_naz}{" "}
                    <i
                      className="bx bx-trash"
                      onClick={() => ponistiPretragu(pretraga.pretraga_id)}
                    ></i>
                  </li>
                ))}
            </ol>
          </div>
        )}
        <div className="dugme slanje">
          <button>UNESI NALOG / POŠALJI PODATKE</button>
        </div>
      </Drawer>
      <Drawer
        open={isDodajDrawerOpen}
        onClose={toggleDodajDrawer}
        direction="top"
        size="350px"
        className="draw_backdrop"
      >
        <div className="draw_menu">
          <p>DODAJ NOVU LABARATORIJSKU PRETRAGU U POSTOJEĆI RASPORED</p>
          <PretragaUnosForm />
        </div>
      </Drawer>
    </div>
  );
};

export default IzborAnaliza;
