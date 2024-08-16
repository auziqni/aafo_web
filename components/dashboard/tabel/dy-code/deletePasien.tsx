"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeletePasien({
  className,
  pasien,
}: {
  className?: string;
  pasien: PasienData;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteButton = async () => {
    setOpen(false);
    console.log("delete", pasien);

    const response = await fetch(`/api/deletepasien`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pasien),
    });

    if (response.status === 202) {
      toast.success("Pasien berhasil dihapus");
      router.push("/pasien");
      router.refresh();
    } else {
      toast.error("Gagal menghapus pasien");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        id="DeleteButton"
        onClick={() => setOpen(true)}
        className={twMerge("font-bold", className)}
      >
        Delete
      </button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold ">
            Delete Pasien{" "}
            <span className="font-bold text-red-700">{pasien.nama}</span>
          </DialogTitle>
          <DialogDescription>
            <p>Apakah anda yakin ingin menghapus pasien?</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={handleDeleteButton}
            className=" bg-red-600 text-white h-8 px-3 border-2 border-black rounded-lg "
          >
            Yes
          </button>
          <button
            onClick={() => setOpen(false)}
            className="   h-8 px-3 border-2 border-black rounded-lg "
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
