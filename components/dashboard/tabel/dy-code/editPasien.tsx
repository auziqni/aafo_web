"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
// import { Textarea } from "@/components/ui/textarea";
// import Footer from "@/components/footer";
// import { toast } from "react-toastify";

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

export default function EditPasien({
  className,
  pasien,
}: {
  className?: string;
  pasien: PasienData;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: pasien.nama,
      ttl: pasien.ttl,
      telepon: pasien.telepon,
      tinggi: pasien.tinggi,
      berat: pasien.berat,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    const url = "/api/posteditpasien";

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          norekam: pasien.norekam,
          nama: values.nama,
          ttl: values.ttl,
          telepon: values.telepon,
          tinggi: values.tinggi,
          berat: values.berat,
        }),
      });
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  }

  return (
    <div className={twMerge("", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="font-semibold">EDIT</DialogTrigger>
        <DialogContent className="max-w-5xl ">
          <DialogHeader>
            <DialogTitle>
              Edit Pasien Dengan Nomor Rekam <span>{pasien.norekam}</span>
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
