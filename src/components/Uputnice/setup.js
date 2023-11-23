import {format} from "date-fns";

export const columns = [
  // 0
  {
    accessorKey: 'id',
    header: 'Broj Lab',
    size: 100,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
  // 1
  {
    accessorKey: 'lis_broj',
    header: 'Broj LIS',
    size: 90,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
  // 2
  {
    accessorKey: 'broj_protokola',
    header: 'Protokol',
    size: 100,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
  },
  // 3
  {
    accessorKey: 'jmbg',
    header: 'JMBG',
    size: 100,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
  },
  // 4
  {
    accessorFn: (row) => `${row['prezime']} (${row['ime_roditelja']}) ${row['ime']} ${row['datum_rodjenja'] ? format(new Date(row['datum_rodjenja']), 'dd.MM.yyyy') : ''}`,
    header: 'Pacijent',
    size: 250,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
  },
  // 5
  {
    header: 'Datum',
    size: 80,
    accessorFn: (row) => row['datum_uputnice'] ? format(new Date(row['datum_uputnice']), 'dd.MM.yyyy') : '',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
    type: 'string'
  },
  // 6
  {
    accessorKey: 'naziv_statusa',
    header: 'Status',
    size: 120,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
  },
  // 7
  {
    accessorKey: 'vrsta_naziv',
    header: 'Vrsta',
    size: 120,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
  },
  // 8
  {
    accessorKey: 'prioritet_naziv',
    header: 'Prioritet',
    size: 120,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
  },
  // 9
  {
    accessorKey: 'id_pacijenta',
    header: 'KISS protokol',
    size: 120,
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
  // 10
  {
    accessorKey: 'napomena',
    header: 'Napomena',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'left',
    },
  },
  // 11
  {
    accessorKey: 'kreirano_korisnik',
    header: 'Korisnik',
    filterVariant: 'select',
    enableHiding: false
  },
];