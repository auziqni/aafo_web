type PasienDataTable = {
  id: number;
  norekam: string;
  nama: string;
  ttl: string;
  telepon: string;
  tinggi: numberv;
  berat: number;
  waktu: string;
};

type PengukuranData = {
  id: number;
  timeStamp: string;
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
};

// ini kayanya ga di pake deh
type PasienData = {
  norekam: string;
  nama: string;
  ttl: string;
  telepon: string;
  tinggi: number;
  berat: number;
};
