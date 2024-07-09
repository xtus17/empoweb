import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, Suspense, useEffect } from "react";
import upload from "./../assets/upload.png";
import { db } from "./../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Toaster, toast } from "sonner";
import Loading from "./Loading";
import Datepicker from "flowbite-datepicker/Datepicker";

export default function Add() {
  const [arrayImage, setArrayImage] = useState([]);
  const currentDateTimeLocal = new Date().toLocaleString();
  const [loader, setloader] = useState(false);

  const currentDateTimeMillis = new Date().getTime();
  const reportId = `report-${currentDateTimeMillis}`;

  useEffect(() => {
    const datepickerEl = document?.getElementById("datepickerId");
    new Datepicker(datepickerEl, {
      autohide: true,
      title: "Calendario",
      format: "dd/mm/yyyy",
    });
  }, []);

  function showCurrentMilliseconds() {
    const date = new Date();
    return date.getTime();
  }

  function ids() {
    const milis = showCurrentMilliseconds();
    return `image-${milis}`;
  }

  const uploadImage = async (imagenes) => {
    try {
      const imageBlob = [];
      await Promise.all(
        imagenes.map(async (image) => {
          const storage = getStorage();
          const archivoRef = ref(storage, `post/${ids()}`);
          const uploadTask = await uploadBytes(archivoRef, image);
          const snap = uploadTask.metadata.fullPath;
          const imageRef = ref(storage, snap);
          const imageUrl = await getDownloadURL(imageRef);
          imageBlob.push(imageUrl);
        })
      );

      return imageBlob;
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloader(true);
      const responseImage = await uploadImage(arrayImage);
      const id = reportId;
      const category = document.getElementById("categoria").value;
      const title = document.getElementById("title").value;
      const message = document.getElementById("message").value;
      const datepickerId = document.getElementById("datepickerId").value;
      const image = responseImage;
      const date = currentDateTimeLocal;

      const infoData = {
        id,
        title,
        message,
        category,
        datepickerId,
        image,
        date,
      };

      const myDb = doc(db, "postEmpoderadas", infoData.id);
      setDoc(myDb, infoData);
      toast.success("El post se ha publicado correctamente");

      e.target.reset();
      setArrayImage([]);
      setSelectedImages([]);
    } catch (error) {
      toast.error("Sucedió un error, por favor inténtalo más tarde");
    } finally {
      setloader(false);
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      const updatedList = [...arrayImage, newFile];
      setArrayImage(updatedList);
    }

    const files = event.target.files;
    const imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      imageUrls.push(imageUrl);
    }
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleImageRemove = (index) => {
    const updatedList = [...arrayImage];
    updatedList.splice(arrayImage.indexOf(index), 1);
    setArrayImage(updatedList);

    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto pt-24">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Selecciona una opción
          </label>
          <select
            id="categoria"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option disabled hidden>
              Elige una opción
            </option>
            <option value="DEMUNA Végueta">DEMUNA Végueta</option>
            <option value="Provincial Huaura">Provincial Huaura</option>
            <option value="Gobierno Regional Lima">
              Gobierno Regional Lima
            </option>
            <option value="Gobierno Nacional">Gobierno Nacional</option>
            <option value="ONG">ONG</option>
            <option value="Otros">Otros</option>
          </select>

          <br />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Título del post
          </label>
          <input
            id="title"
            placeholder="Lugar Nombre"
            type="text"
            required
            autoFocus
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <br />
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descripción
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escribe una descripción"
          ></textarea>

          <br />

          <input
            datepicker
            datepicker-autohide
            type="text"
            id="datepickerId"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Selecciona Fecha"
            data-flatpickr='{ "locale": "es" }'
          />

          <div className="flex flex-col items-center justify-center pt-24">
            <label htmlFor="files" className="drop-file-input mb-4">
              <div className="w-24 h-24 flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-full cursor-pointer">
                <img src={upload} alt="" className="mb-2" />
                <p>Carga tus imágenes</p>
              </div>
            </label>
            <input
              id="files"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              //multiple
              onChange={handleImageChange}
            />

            <div className="flex flex-wrap justify-center">
              {selectedImages.map((imageUrl, index) => (
                <div key={index} className="relative m-2">
                  <img
                    src={imageUrl}
                    alt={`Image ${index}`}
                    className="w-32 h-32 object-cover"
                  />
                  <button
                    className="absolute top-0 right-0 rounded-fullp-1 text-white -mt-2 -mr-2"
                    onClick={() => handleImageRemove(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="25"
                      height="25"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#f44336"
                        d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
                      ></path>
                      <line
                        x1="16.9"
                        x2="31.1"
                        y1="16.9"
                        y2="31.1"
                        fill="none"
                        stroke="#fff"
                      ></line>
                      <line
                        x1="31.1"
                        x2="16.9"
                        y1="16.9"
                        y2="31.1"
                        fill="none"
                        stroke="#fff"
                      ></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <br />

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Enviar
          </button>
        </form>
        <Toaster position="bottom-right" expand={true} />

        <br />

        {loader && (
          <>
            <div className="flex justify-center" role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </>
        )}
      </Suspense>
    </div>
  );
}
