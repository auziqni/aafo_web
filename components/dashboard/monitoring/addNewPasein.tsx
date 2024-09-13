"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { FiPhoneCall } from "react-icons/fi";
// import { TbMailHeart } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";
import { Pasien, PrismaClient } from "@prisma/client";
import { set } from "firebase/database";
import { toast } from "react-toastify";
const prisma = new PrismaClient();

// import { Textarea } from "@/components/ui/textarea";
// import Footer from "@/components/footer";
// import { toast } from "react-toastify";
interface DataRead {
  time: Date;
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
}
interface loadingProps {
  state: "idle" | "loading" | "success" | "error";
  percentage: number;
  message: string;
}

const formSchema = z.object({
  nama: z
    .string()
    .min(3, { message: "Nama Kamu Pasti lebih Dari Dua Huruf" })
    .max(50),
  ttl: z.string().max(50),
  telepon: z.string().max(50),
  tinggi: z.number().int().positive(),
  berat: z.number().int().positive(),
});

export default function AddPasien({
  className,
  pasien,
  setPasien,
  isLoading,
  setIsLoading,
  setData,
  setDataFirebase,
}: {
  className?: string;
  pasien: PasienData | null;
  setPasien: (pasien: PasienData) => void;
  isLoading: loadingProps;
  setIsLoading: (loading: loadingProps) => void;
  setData: (data: DataRead[]) => void;
  setDataFirebase: () => void;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "test",
      ttl: "123",
      telepon: "345",
      tinggi: 123,
      berat: 56,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    setData([]);
    const norekam = generateCode();
    setDataFirebase();

    try {
      setOpen(false);
      setPasien({
        norekam: norekam,
        nama: values.nama,
        ttl: values.ttl,
        telepon: values.telepon,
        tinggi: values.tinggi,
        berat: values.berat,
        waktu: new Date().toISOString(),
      });

      setIsLoading({
        state: "idle",
        percentage: 1,
        message: `Memulai sesi untuk ${values.nama}`,
      });

      const succesCreateNewPatient = await fetch("/api/createpasien", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          norekam,
          nama: values.nama,
          ttl: values.ttl,
          telepon: values.telepon,
          tinggi: values.tinggi,
          berat: values.berat,
          waktu: new Date().toISOString(),
        }),
      });

      if (succesCreateNewPatient.status === 200) {
        setIsLoading({
          state: "loading",
          percentage: 0,
          message: `Memulai sesi untuk ${values.nama}`,
        });
      } else {
        setIsLoading({
          state: "error",
          percentage: -1,
          message: `Error: gagal membuat pasien ${values.nama}`,
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading({
        state: "error",
        percentage: -1,
        message: `Error: ${error}`,
      });
    }
  }

  const handleRefreshButton = () => {
    setData([]);
    setIsLoading({
      state: "idle",
      percentage: 0,
      message: "",
    });
  };

  return (
    <div className={twMerge("flex relative w-full", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex w-full relative gap-2 h-12">
          <button
            onClick={() => {
              if (isLoading.state === "idle") {
                setOpen(true);
              } else {
                toast("Sesi Sedang Berlangsung");
              }
            }}
            className={twMerge(
              "h-full flex-1 bg-sky-500  hover:bg-blue-700 text-white font-bold py-2 px-4 uppercase rounded-md",
              isLoading.state === "error" ? "bg-red-500 hover:bg-red-600" : ""
            )}
          >
            {isLoading.state === "error"
              ? isLoading.message
              : isLoading.percentage === 0
              ? "Start Session"
              : isLoading.message === ""
              ? "Reading..."
              : isLoading.message}
          </button>
          {(isLoading.state === "success" || isLoading.state === "error") && (
            <button
              id="RefreshButton"
              onClick={handleRefreshButton}
              className={twMerge(
                "bg-sky-500  hover:bg-blue-700 h-full aspect-square text-white font-bold py-2 px-4 uppercase rounded-md",
                isLoading.state === "error" ? "bg-red-500 hover:bg-red-600" : ""
              )}
            >
              <RefreshCw size={20} />
            </button>
          )}
        </div>
        <DialogContent className="max-w-5xl ">
          <DialogHeader>
            <DialogTitle>
              {/* Edit Pasien Dengan Nomor Rekam <span>{pasien.norekam}</span> */}
              add pasien
            </DialogTitle>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 "
                >
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize  sm:text-lg">
                          username:
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama Kamu"
                            className=" "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ttl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize  sm:text-lg">
                          Tempat Tanggal Lahir:
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dimana dan kapan Kamu Lahir"
                            className=" "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="berat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize  sm:text-lg">
                          Berat:
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Berat Kamu"
                            className=" "
                            {...field}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tinggi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize  sm:text-lg">
                          Tinggi:
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Tinggi Kamu"
                            className=""
                            {...field}
                            onChange={(event) =>
                              field.onChange(+event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telepon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize  sm:text-lg">
                          Telepon:
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Telepon Kamu"
                            className=" "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="border-black border text-sm sm:text-base text-black bg-transparent"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function generateCode(length = 7) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
}
