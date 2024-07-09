import { db } from "./../utils/firebase";
import { Toaster, toast } from "sonner";

export default function ModaleDeleteDemuna({ isOpen, onClose, message, id }) {
  async function deleteItem() {
    const idDelete = id;
    await db.collection("demunaEmpoderadas").doc(idDelete).delete();
    onClose();
    toast.success("Se eliminó un reporte");
  }

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black opacity-50 w-full"></div>
        <div className="absolute bg-white rounded-lg shadow dark:bg-gray-700 p-8">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <button
              data-modal-hide="popup-modal"
              onClick={deleteItem}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Aceptar
            </button>
            <button
              data-modal-hide="popup-modal"
              onClick={onClose}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
        <Toaster position="bottom-right" expand={true} />
      </div>
    </>
  );
}
