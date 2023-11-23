import React from 'react';
import {MaterialReactTable} from 'material-react-table';
import {columns} from "./setup";
import {IconButton, Tooltip} from "@mui/material";
import FestivalIcon from '@mui/icons-material/Festival';
import CategoryIcon from '@mui/icons-material/Category';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Controls from "../UI/Controls/Controls";

const ListaUputnica = ({data, setPodaciUputnice, otvoriPretrage, columnFilters, setColumnFilters, prikaziSveUputnice, setPrikaziSveUputnice, korisnik}) => {
  const statusData = [], vrstaData = [], prioritetData = [];

  for (const uputnica of data) {
    if (statusData.indexOf(uputnica.naziv_statusa) === -1) statusData.push(uputnica.naziv_statusa);
    if (vrstaData.indexOf(uputnica.vrsta_naziv) === -1) vrstaData.push(uputnica.vrsta_naziv);
    if (prioritetData.indexOf(uputnica.prioritet_naziv) === -1) prioritetData.push(uputnica.prioritet_naziv);
  }

  columns[6] = {
    ...columns[6],
    filterVariant: 'select',
    filterSelectOptions: statusData
  }

  columns[7] = {
    ...columns[7],
    filterVariant: 'select',
    filterSelectOptions: vrstaData
  }

  columns[8] = {
    ...columns[8],
    filterVariant: 'select',
    filterSelectOptions: prioritetData
  }

  const postaviFilter = naziv => {
    const filterMap = {
      'naziv_statusa': statusData,
      'vrsta_naziv': vrstaData,
      'prioritet_naziv': prioritetData,
    };

    const filterData = filterMap[naziv];

    const currentStatusFilterIndex = columnFilters.findIndex(filter => filter.id === naziv);

    if (currentStatusFilterIndex === -1) columnFilters.push({ id: naziv, value: filterData[0] });
    else {
      const currentStatusIndex = filterData.indexOf(columnFilters[currentStatusFilterIndex].value);
      const nextStatusIndex = (currentStatusIndex + 1) % filterData.length;
      columnFilters[currentStatusFilterIndex].value = filterData[nextStatusIndex];
    }

    setColumnFilters([...columnFilters]);
  }

  const handleInputChange = e => {
    setPrikaziSveUputnice(+e.target.value);

    const jesteFiltriranIndex = columnFilters.findIndex(filter => filter.id === 'kreirano_korisnik');
    if (jesteFiltriranIndex !== -1) columnFilters.splice(jesteFiltriranIndex, 1);
    else columnFilters.push({ id: 'kreirano_korisnik', value: `${korisnik}` });

    setColumnFilters([...columnFilters]);
  }

  const ocistiFiltere = () => {
    setColumnFilters([...columnFilters.filter(filter => filter.id === 'kreirano_korisnik')]);
  }

  return (
    <div>
      <MaterialReactTable columns={columns} data={data} enableGrouping enableColumnDragging={false} enableStickyHeader
                          enableRowVirtualization onColumnFiltersChange={setColumnFilters}
                          enableColumnActions={false}
                          muiTablePaginationProps={{
                            rowsPerPageOptions: [1000, 2000],
                            showFirstButton: false,
                            showLastButton: false,
                          }}
                          state={{ columnFilters }}
                          initialState={{
                            pagination: { pageSize: 1000, pageIndex: 0 },
                            showColumnFilters: true,
                            showGlobalFilter: true,
                            columnVisibility: {
                              kreirano_korisnik: false
                            }
                          }}
                          muiTableBodyRowProps={({ row }) => ({
                            onClick: () => {
                              setPodaciUputnice(row.original);
                              otvoriPretrage();
                            },
                            sx: {
                              cursor: 'pointer',
                            },
                          })}
                          muiTablePaperProps={{
                            elevation: 5,
                            sx: {
                              borderRadius: '10px',
                            },
                          }}
                          muiTableBodyCellProps={{
                            sx: {
                              borderRight: '1px solid rgb(170, 170, 170)',
                            },
                          }}
                          renderTopToolbarCustomActions={({}) => {
                            const aktivniFilteri = columnFilters.filter(filter => filter.id !== 'kreirano_korisnik');
                            return (
                              <div style={{display: 'flex', gap: '1rem'}}>
                                <Tooltip arrow title={'Filtriraj po statusu'}>
                                  <IconButton onClick={() => postaviFilter('naziv_statusa')}>
                                    <FestivalIcon fontSize={'large'} sx={theme => ({
                                      color: theme.palette.primary.dark,
                                      cursor: 'pointer'
                                    })}/>
                                  </IconButton>
                                </Tooltip>

                                <Tooltip arrow title={'Filtriraj po vrsti'}>
                                  <IconButton onClick={() => postaviFilter('vrsta_naziv')}>
                                    <CategoryIcon fontSize={'large'} sx={theme => ({
                                      color: theme.palette.secondary.dark,
                                      cursor: 'pointer'
                                    })}/>
                                  </IconButton>
                                </Tooltip>

                                <Tooltip arrow title={'Filtriraj po prioritetu'}>
                                  <IconButton onClick={() => postaviFilter('prioritet_naziv')}>
                                    <PriorityHighIcon fontSize={'large'} sx={theme => ({
                                      color: theme.palette.success.dark,
                                      cursor: 'pointer'
                                    })}/>
                                  </IconButton>
                                </Tooltip>

                                <Tooltip arrow title={'Poništi sve filtere'}>
                                  <IconButton onClick={aktivniFilteri.length > 0 ? ocistiFiltere : () => {}}>
                                    <BackspaceIcon fontSize={'large'} sx={theme => ({
                                      color: aktivniFilteri.length > 0 ? theme.palette.error.dark : theme.palette.grey['200'],
                                      cursor: aktivniFilteri.length > 0 ? 'pointer' : 'not-allowed'
                                    })}/>
                                  </IconButton>
                                </Tooltip>
                              </div>)
                          }}
                          renderBottomToolbarCustomActions={({}) => {
                            return (
                                <Controls.RadioGroup
                                  name="prikazi_sve_pacijente"
                                  value={prikaziSveUputnice}
                                  onChange={handleInputChange}
                                  items={[{id: 0, title: 'Po laborantu'}, {id: 1, title: 'Svi Pacijenti'}]}
                                />
                            )
                          }}
                          localization={{
                            actions: 'Opcije',
                            and: 'i',
                            cancel: 'Ponisti',
                            changeFilterMode: 'Promjeni mod filtriranja',
                            changeSearchMode: 'Promjeni mod pretrage',
                            clearFilter: 'Ponisti filtere',
                            clearSearch: 'Poništi pretragu',
                            clearSort: 'Poništi sortiranja',
                            clickToCopy: 'Klikni da kopiraš',
                            collapse: 'Skupi',
                            collapseAll: 'Skupi sve',
                            columnActions: 'Column Actions',
                            copiedToClipboard: 'Kopirano u clipboard',
                            dropToGroupBy: 'Prevuci da grupišeš po {column}',
                            edit: 'Uredi',
                            expand: 'Raširi',
                            expandAll: 'Raširi sve',
                            filterArrIncludes: 'Uključuje',
                            filterArrIncludesAll: 'Uključuje sve',
                            filterArrIncludesSome: 'Uključuje',
                            filterBetween: 'Između',
                            filterBetweenInclusive: 'Između inkluzivnog',
                            filterByColumn: 'Filtriraj po {column}',
                            filterContains: 'Sadrži',
                            filterEmpty: 'Prazno',
                            filterEndsWith: 'Završava sa',
                            filterEquals: 'Jednako',
                            filterEqualsString: 'Jednako',
                            filterFuzzy: 'Fuzzy',
                            filterGreaterThan: 'Veće od',
                            filterGreaterThanOrEqualTo: 'Veće ili jednako',
                            filterInNumberRange: 'Između',
                            filterIncludesString: 'Sadrži',
                            filterIncludesStringSensitive: 'Sadrži',
                            filterLessThan: 'Manje od',
                            filterLessThanOrEqualTo: ' Manje ili jednako',
                            filterMode: 'Filter mod: {filterType}',
                            filterNotEmpty: 'Nije prazno',
                            filterNotEquals: 'Nije jednako',
                            filterStartsWith: 'Počinje sa',
                            filterWeakEquals: 'Jednako',
                            filteringByColumn: 'Filtriraj po {column} - {filterType} {filterValue}',
                            goToFirstPage: 'Idi na prvu stranu',
                            goToLastPage: 'Idi na poslednju stranu',
                            goToNextPage: 'Idi na iduću stranu',
                            goToPreviousPage: 'Idi na prethodnu stranu',
                            grab: 'Uzmi',
                            groupByColumn: 'Grupiši po {column}',
                            groupedBy: 'Grupisano po ',
                            hideAll: 'Sakrij sve',
                            hideColumn: 'Sakrij {column} kolonu',
                            max: 'Max',
                            min: 'Min',
                            move: 'Pomjeri',
                            noRecordsToDisplay: 'Nema podataka',
                            noResultsFound: 'Nisu pronađeni rezultati',
                            of: 'od',
                            or: 'ili',
                            pinToLeft: 'Zakači lijevo',
                            pinToRight: 'Zakači desno',
                            resetColumnSize: 'Resetuj veličinu kolone',
                            resetOrder: 'Resetuj redoslijed',
                            rowActions: 'Resetuj opcije',
                            rowNumber: '#',
                            rowNumbers: 'Broj redova',
                            rowsPerPage: 'Redova po strani',
                            save: 'Sačuvaj',
                            search: 'Traži',
                            selectedCountOfRowCountRowsSelected: '{selectedCount} od {rowCount} redova selektovano',
                            select: 'Izaberi',
                            showAll: 'Prikaži sve',
                            showAllColumns: 'Prikaži sve kolone',
                            showHideColumns: 'Prikaži/sakrij kolone',
                            showHideFilters: 'Prikaži/sakrij filtere',
                            showHideSearch: 'Prikaži/sakrij pretragu',
                            sortByColumnAsc: 'Sortiraj {column} A-Z',
                            sortByColumnDesc: 'Sortiraj {column} Z-A',
                            sortedByColumnAsc: 'Sortirano {column} A-Z',
                            sortedByColumnDesc: 'Sortirano {column} Z-A',
                            thenBy: ', onda po ',
                            toggleDensity: 'Promjeni prored',
                            toggleFullScreen: 'Promjeni veličinu ekrana',
                            toggleSelectAll: 'Selektuj sve',
                            toggleSelectRow: 'Selektuj red',
                            toggleVisibility: 'Promjeni vidljivost',
                            ungroupByColumn: 'Odgrupiši po {column}',
                            unpin: 'Otkači',
                            unpinAll: 'Otkači sve',
                            unsorted: 'Poništi sortiranje',
                          }}
      />
    </div>
  );
};

export default ListaUputnica;