import { Fragment, useState } from "react";
import { useStore } from "../../store";
import CheckBox from "../ui/CheckBox";
import "./PodgrupeRutina.css";

const KlickaHemija = () => {
  const [podGrupaHormoni, setPodGrupaHormoni] = useState("HORMONI1");
  const [podGrupaLiquor, setPodGrupaLiquor] = useState("LIQUOR");
  const pretrage = useStore((store) => store.pretrage);

  return (
    <div className="r_klinicka">
      <h4>Klinička hemija</h4>
      <div className="r_klin">
        <div className="r_klin1">
          <div className="r_podgrupa">
            <p className="r_podnaslov">Serum</p>
            <div className="r_podgrupa_checkbox r_serum_checkbox">
              {pretrage
                .filter((u) => {
                  return u.grupa_pretraga === "Serum";
                })
                .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                .map((pretraga) => (
                  <CheckBox pretraga={pretraga} />
                ))}
            </div>
          </div>
          <div className="r_podgrupa r_hormoni">
            <div className="podgrupa_header">
              <div
                className={
                  podGrupaHormoni === "HORMONI1" ? "izabranaPodGrupa" : ""
                }
                onClick={() => setPodGrupaHormoni("HORMONI1")}
              >
                <p>Hormoni</p>
              </div>
              <div
                className={
                  podGrupaHormoni === "HORMONI2" ? "izabranaPodGrupa" : ""
                }
                onClick={() => setPodGrupaHormoni("HORMONI2")}
              >
                <p>Hormoni štitnjače</p>
              </div>
            </div>
            {podGrupaHormoni === "HORMONI1" && (
              <div className="r_podgrupa_checkbox r_hormoni_checkbox">
                {pretrage
                  .filter((u) => {
                    return u.grupa_pretraga === "Hormoni";
                  })
                  .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                  .map((pretraga) => (
                    <CheckBox pretraga={pretraga} />
                  ))}
              </div>
            )}
            {podGrupaHormoni === "HORMONI2" && (
              <div className="r_podgrupa_checkbox r_hormoni_checkbox">
                {pretrage
                  .filter((u) => {
                    return u.grupa_pretraga === "Hormoni stitnjace";
                  })
                  .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                  .map((pretraga) => (
                    <CheckBox pretraga={pretraga} />
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="r_klin2">
          <div className="r_podgrupa">
            <p className="r_podnaslov">Imunološke pretrage</p>
            <div className="r_podgrupa_checkbox r_imun_checkbox">
              {pretrage
                .filter((u) => {
                  return (
                    u.grupa_pretraga === "Imunoloske pretrage" &&
                    u.pretrage_podgrupa === "Klinicka Hemija"
                  );
                })
                .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                .map((pretraga) => (
                  <CheckBox pretraga={pretraga} />
                ))}
            </div>
          </div>
          <div className="r_podgrupa">
            <p className="r_podnaslov">Specifični proteini Lijekovi</p>
            <div className="r_podgrupa_checkbox r_spec_checkbox ">
              {pretrage
                .filter((u) => {
                  return u.grupa_pretraga === "Specificni proteini";
                })
                .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                .map((pretraga) => (
                  <CheckBox pretraga={pretraga} />
                ))}
            </div>
          </div>
          <div className="r_podgrupa">
            <p className="r_podnaslov">Tumor markeri</p>
            <div className="r_podgrupa_checkbox r_tumor_checkbox">
              {pretrage
                .filter((u) => {
                  return u.grupa_pretraga === "Tumor markeri";
                })
                .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                .map((pretraga) => (
                  <CheckBox pretraga={pretraga} />
                ))}
            </div>
          </div>
          <div className="r_podgrupa r_liq">
            <div className="podgrupa_header">
              <div
                className={
                  podGrupaLiquor === "LIQUOR" ? "izabranaPodGrupa" : ""
                }
                onClick={() => setPodGrupaLiquor("LIQUOR")}
              >
                <p>Liquor</p>
              </div>
              <div
                className={
                  podGrupaLiquor === "PUNKTAT" ? "izabranaPodGrupa" : ""
                }
                onClick={() => setPodGrupaLiquor("PUNKTAT")}
              >
                <p>Punktat</p>
              </div>
              <div
                className={podGrupaLiquor === "RAZNO" ? "izabranaPodGrupa" : ""}
                onClick={() => setPodGrupaLiquor("RAZNO")}
              >
                <p>Razno</p>
              </div>
            </div>
            {podGrupaLiquor === "LIQUOR" && (
              <div className="r_podgrupa_checkbox r_liq_checkbox">
                {pretrage
                  .filter((u) => {
                    return u.grupa_pretraga === "Liquor";
                  })
                  .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                  .map((pretraga) => (
                    <CheckBox pretraga={pretraga} />
                  ))}
              </div>
            )}
            {podGrupaLiquor === "PUNKTAT" && (
              <div className="r_podgrupa_checkbox">
                {pretrage
                  .filter((u) => {
                    return u.grupa_pretraga === "Punktat";
                  })
                  .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                  .map((pretraga) => (
                    <CheckBox pretraga={pretraga} />
                  ))}
              </div>
            )}
            {podGrupaLiquor === "RAZNO" && (
              <div className="r_podgrupa_checkbox">
                <div className="prve_podgrupe_razno">
                  <div className="razno_checkbox">
                    {pretrage
                      .filter((u) => {
                        return u.grupa_pretraga === "Znoj";
                      })
                      .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                      .map((pretraga) => (
                        <Fragment>
                          <p>{pretraga.grupa_pretraga}</p>
                          <CheckBox pretraga={pretraga} />
                        </Fragment>
                      ))}
                  </div>
                  <div className="razno_checkbox">
                    <p>Bris</p>
                    {pretrage
                      .filter((u) => {
                        return u.grupa_pretraga === "Bris";
                      })
                      .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                      .map((pretraga) => (
                        <CheckBox pretraga={pretraga} />
                      ))}
                  </div>
                </div>
                <div className="zadnje_podgrupe_razno">
                  <div className="razno_checkbox">
                    {pretrage
                      .filter((u) => {
                        return u.grupa_pretraga === "Dijalizat";
                      })
                      .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                      .map((pretraga) => (
                        <Fragment>
                          <p>{pretraga.grupa_pretraga}</p>
                          <CheckBox pretraga={pretraga} />
                        </Fragment>
                      ))}
                  </div>
                  <div className="razno_checkbox">
                    {pretrage
                      .filter((u) => {
                        return u.grupa_pretraga === "Zglobna tecnost";
                      })
                      .sort((a, b) => (a.redni_br > b.redni_br ? 1 : -1))
                      .map((pretraga) => (
                        <Fragment>
                          <p>{pretraga.grupa_pretraga}</p>
                          <CheckBox pretraga={pretraga} />
                        </Fragment>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KlickaHemija;
