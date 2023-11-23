import React, {useEffect, useRef} from 'react';
import {Form, useForm} from "../../UI/Forms/useForm";
import dayjs from "dayjs";
import {Grid} from "@material-ui/core";
import Controls from "../../UI/Controls/Controls";
import Popup from "../../UI/Forms/Popup";

const initialFValues = {
  id: '',
  vrsta: '',
  prioritet: '',
  broj: '',
  broj_protokola: '',
  datum_uputnice: dayjs(),
  // datum_kraj: dayjs(),
  datum_uzorak: dayjs(),
  // dijagnoza_sifra: '',
  // dijagnoza_opis: '',
  jmbg: '',
  jmbg_majka: '',
  prezime: '',
  ime: '',
  datum_rodjenja: dayjs(),
  pol: '',
  oslobodjen_placanja: '',
  // skladiste_grupa: '',
  // skldiste: '',
  // fiskalizovan: '',
  fiskalni_broj: '',
  napomena: '',
  uputio: '',
  vid_osiguranja: '',
  skladiste: '',
  skladiste_grupa: '',
  mkb: ''
}

const Uputnica = ({closeModal, recordForEdit, klinike, odjeli, doktori, prikaziPretrage}) => {
  const brojUnos = useRef(), jmbgUnos = useRef(), jmbgMajka = useRef(),
    dugmeUnos = useRef(), datumUputnice = useRef(), brojProtokola = useRef(),
    prezimeUnos = useRef(), imeUnos = useRef(), datumUzorka = useRef(),
    polUnos = useRef(), fiskalniBroj = useRef(), napomenaUnos = useRef(),
    klinikaUnos = useRef(), odjelUnos = useRef();

  const validate = (fieldValues = values) => {
    let temp = { ...errors }

    // if ('vrsta' in fieldValues) temp.vrsta = fieldValues.vrsta ? "" : "Obavezno polje."
    //
    // if ('prioritet' in fieldValues) temp.prioritet = fieldValues.prioritet ? "" : "Obavezno polje."

    if ('broj' in fieldValues) temp.broj = fieldValues.broj ? "" : "Obavezno polje."

    if ('broj_protokola' in fieldValues) temp.broj_protokola = fieldValues.broj_protokola ? "" : "Obavezno polje."

    // if ('dijagnoza_sifra' in fieldValues) temp.dijagnoza_sifra = fieldValues.dijagnoza_sifra ? "" : "Obavezno polje."

    // if ('dijagnoza_opis' in fieldValues) temp.dijagnoza_opis = fieldValues.dijagnoza_opis ? "" : "Obavezno polje."

    if ('jmbg' in fieldValues) temp.jmbg = fieldValues.jmbg ? "" : "Obavezno polje."

    if ('jmbg_majka' in fieldValues) temp.jmbg_majka = fieldValues.jmbg_majka ? "" : "Obavezno polje."

    if ('prezime' in fieldValues) temp.prezime = fieldValues.prezime ? "" : "Obavezno polje."

    if ('ime' in fieldValues) temp.ime = fieldValues.ime ? "" : "Obavezno polje."

    if ('pol' in fieldValues) temp.pol = fieldValues.pol ? "" : "Obavezno polje."

    if ('fiskalni_broj' in fieldValues) temp.fiskalni_broj = fieldValues.fiskalni_broj ? "" : "Obavezno polje."

    if ('napomena' in fieldValues) temp.napomena = fieldValues.napomena ? "" : "Obavezno polje."

    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  // const postStudijData = async () => {
  //   const newData = new URLSearchParams();
  //
  //   if (values.id.length !== 0) newData.append('id', values.id);
  //   newData.append('broj', values.broj);
  //   newData.append('datum_od', format(values.datum_od['$d'], 'dd.MM.yyyy'));
  //   newData.append('datum_do', format(values.datum_do['$d'], 'dd.MM.yyyy'));
  //   newData.append('datum_odobrenja', format(values.datum_odobrenja['$d'], 'dd.MM.yyyy'));
  //   newData.append('opis', values.opis);
  //   newData.append('monitor', values.monitor);
  //   newData.append('faza', values.faza);
  //   newData.append('br_protokola', values.br_protokola);
  //   newData.append('gl_istrazivac', values.zaposleni);
  //   newData.append('titula', values.titula);
  //   newData.append('klinika', values.klinika);
  //   newData.append('odjel', values.odjel);
  //   newData.append('id_sponzora', values.id_sponzora);
  //   newData.append('id_statusa', !edit ? '3' : values.id_statusa);
  //
  //   const responose = await fetch(`../rpc/klinicke_studije.cfc?method=unos_studija`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     body: newData
  //   });
  //   return await responose.json();
  // }

  const handleSubmit = e => {
    e.preventDefault()

    prikaziPretrage(false);
    closeModal();
  }

  const preventDefaultHandler = ev => {
    ev.preventDefault();
  }

  const selectNext = (ev, type) => {
    handleInputChange(ev);
    setTimeout(() => {
      if (type === 'klinika') odjelUnos.current['focus']();
      if (type === 'odjel') dugmeUnos.current['focus']();
    }, 100)
  }

  const keyPressHandler = ev => {
    if (ev.code === 'Enter') {
      if (ev.target.name === 'broj') brojProtokola.current['focus']();
      if (ev.target.name === 'broj_protokola') datumUputnice.current['focus']();
      if (ev.target.name === 'datum_uputnic_input') jmbgUnos.current['focus']();
      if (ev.target.name === 'jmbg') jmbgMajka.current['focus']();
      if (ev.target.name === 'jmbg_majka') prezimeUnos.current['focus']();
      if (ev.target.name === 'prezime') imeUnos.current['focus']();
      if (ev.target.name === 'ime') datumUzorka.current['focus']();
      if (ev.target.name === 'datum_rodjenja_input') polUnos.current['focus']();
      if (ev.target.name === 'pol') fiskalniBroj.current['focus']();
      if (ev.target.name === 'fiskalni_broj') napomenaUnos.current['focus']();
    }
  }

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
        datum_uputnice: dayjs(recordForEdit.datum_uputnice),
        datum_rodjenja: dayjs(recordForEdit.datum_rodjenja),
        datum_uzorak: dayjs(recordForEdit.datum_uzorak),
        uputio: `${recordForEdit.uputio}`
      })
    }
  }, [recordForEdit, setValues])

  const studijPolja = <Form onSubmit={preventDefaultHandler}>
    <Grid container>
      <Grid item xs={12}>

        <div style={{display: "flex"}}>
          <Controls.DatePicker
            ref={datumUputnice}
            onKeyPress={keyPressHandler}
            disabled={true}
            name="datum_uputnice"
            label="Datum uputnice:"
            value={values.datum_uputnice}
            onChange={handleInputChange}
          />

          <Controls.DateTimePicker
            ref={datumUzorka}
            onKeyPress={keyPressHandler}
            name="datum_uzorak"
            disabled={true}
            label="Datum i vrijeme uzorka:"
            value={values.datum_uzorak}
            onChange={handleInputChange}
          />
        </div>

        <div style={{display: "flex"}}>
          <Controls.RadioGroup
            label="Prioritet:"
            name="prioritet"
            disabled={true}
            value={values.prioritet}
            onChange={ev => setValues({...values, prioritet: +ev.target.value})}
            items={[{id: 1, title: 'Hitno'}, {id: 0, title: 'Redovno'}]}
          />

          <Controls.Checkbox
            name="oslobodjen_placanja"
            disabled={true}
            label="Pacijent oslobođen plaćanja po ugovoru"
            value={values.oslobodjen_placanja}
            onChange={handleInputChange}
          />
        </div>

        <div style={{display: "flex"}}>
          <Controls.RadioGroup
            label="Vrsta pacijenta:"
            name="vrsta"
            disabled={true}
            value={values.vrsta}
            onChange={ev => setValues({...values, vrsta: +ev.target.value})}
            items={[{id: 1, title: 'Ambulantni'}, {id: 2, title: 'Bolnički'}]}
          />

          <Controls.Checkbox
            name="oslobodjen_placanja"
            disabled={true}
            label="Pacijent plaća po komercijalnom cjenovniku"
            value={values.oslobodjen_placanja}
            onChange={handleInputChange}
          />
        </div>

        <div style={{display: "flex"}}>
          <Controls.Input
            ref={prezimeUnos}
            onKeyPress={keyPressHandler}
            name="prezime"
            disabled={true}
            label="Prezime:"
            value={values.prezime}
            onChange={handleInputChange}
            error={errors.prezime}
          />

          <Controls.Input
            ref={jmbgUnos}
            onKeyPress={keyPressHandler}
            name="jmbg"
            disabled={true}
            label="JMBG:"
            value={values.jmbg}
            onChange={handleInputChange}
            error={errors.jmbg}
          />
        </div>

        <div style={{display: "flex"}}>
          <Controls.Checkbox
            name="vid_osiguranja"
            disabled={true}
            label="Osiguran"
            value={values.vid_osiguranja}
            onChange={handleInputChange}
          />

          <Controls.Checkbox
            name="oslobodjen_placanja"
            disabled={true}
            label="Oslobođen plaćanja participacije"
            value={values.oslobodjen_placanja}
            onChange={handleInputChange}
          />
        </div>

        <Controls.Select
          ref={klinikaUnos}
          name="uputio"
          label="Poslao doktor"
          disabled={true}
          value={values.uputio}
          onChange={ev => selectNext(ev, 'doktor')}
          options={doktori}
          error={errors.uputio}
        />

        <div style={{display: "flex"}}>
          <Controls.Select
            ref={klinikaUnos}
            name="skladiste_grupa"
            label="Klinika"
            disabled={true}
            value={values.skladiste_grupa}
            onChange={ev => selectNext(ev, 'klinika')}
            options={klinike}
            error={errors.skladiste_grupa}
          />

          {values.skladiste_grupa && <Controls.Select
            ref={odjelUnos}
            name="skladiste"
            disabled={true}
            label="Odjel"
            value={values.skladiste}
            onChange={ev => selectNext(ev, 'odjel')}
            options={odjeli}
            error={errors.skladiste}
          />}
        </div>


        <div style={{display: "flex"}}>
          <Controls.Input
            ref={brojProtokola}
            onKeyPress={keyPressHandler}
            name="broj_protokola"
            disabled={true}
            label="Protokol"
            value={values.broj_protokola}
            onChange={handleInputChange}
            error={errors.broj_protokola}
          />

          <Controls.Input
            ref={brojProtokola}
            onKeyPress={keyPressHandler}
            name="mkb"
            disabled={true}
            label="MKB"
            value={values.mkb}
            onChange={handleInputChange}
            error={errors.mkb}
          />
        </div>


        <Controls.Input
          ref={napomenaUnos}
          onKeyPress={keyPressHandler}
          name="napomena"
          label="Napomena"
          disabled={true}
          value={values.napomena}
          onChange={handleInputChange}
          error={errors.napomena}
        />

        <div style={{display: "flex"}}>
          <Controls.Input
            ref={jmbgMajka}
            onKeyPress={keyPressHandler}
            name="jmbg_majka"
            disabled={true}
            label="JMBG majka"
            value={values.jmbg_majka}
            onChange={handleInputChange}
            error={errors.jmbg_majka}
          />

          <Controls.Input
            onKeyPress={keyPressHandler}
            ref={brojUnos}
            name="broj"
            disabled={true}
            label="KISS Protokol"
            value={values.broj}
            onChange={handleInputChange}
            error={errors.broj}
          />
        </div>


        <div>
          <Controls.Button
            ref={dugmeUnos}
            onClick={handleSubmit}
            type="submit"
            text="Nastavi"/>
        </div>
      </Grid>
    </Grid>
  </Form>

  return (
    <>
      <Popup
        title={`Unos pacijenta za laboratorijske pretrage`}
        openPopup={true}
        setOpenPopup={closeModal}
      >
        {studijPolja}
      </Popup>
    </>
  )
};

export default Uputnica;