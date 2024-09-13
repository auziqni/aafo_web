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
  servoAngle: number;
};

type PasienData = {
  norekam: string;
  nama: string;
  ttl: string;
  telepon: string;
  tinggi: number;
  berat: number;
  waktu: string;
};

interface DataMonitoringFirebase {
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
  sessionStart: boolean;
  deviceStart?: boolean;
}
