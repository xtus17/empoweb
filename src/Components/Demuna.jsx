import { useEffect, useState, useRef } from "react";
import { db } from "./../utils/firebase";
import ModaleDeleteDemuna from "./ModaleDeleteDemuna";
import { Toaster, toast } from "sonner";

export default function Demuna() {
  const lastIdRef = useRef(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState();

  //   useEffect(() => {
  //     const getData = () => {
  //       db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //         const array = [];
  //         querySnapshot.forEach((doc) => {
  //           array.push({ ...doc.data(), id: doc.id });
  //         });
  //         setData(array);
  //       });
  //     };

  //     getData();
  //   }, []);

  //   useEffect(() => {
  //     const getData = () => {
  //       db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //         querySnapshot.docChanges().forEach((change) => {
  //           if (change.type === "added") {
  //             // Se ha agregado un nuevo documento
  //             const newData = { ...change.doc.data(), id: change.doc.id };
  //             setData((prevData) => [...prevData, newData]);
  //             toast.success("El post se ha publicado correctamente");
  //           }
  //         });
  //       });
  //     };

  //     getData();
  //   }, []);

  //   useEffect(() => {
  //     const getData = () => {
  //       const processedIds = new Set();
  //       db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //         querySnapshot.docChanges().forEach((change) => {
  //           if (change.type === "added" && !processedIds.has(change.doc.id)) {
  //             // Se ha agregado un nuevo documento
  //             const newData = { ...change.doc.data(), id: change.doc.id };
  //             setData((prevData) => [...prevData, newData]);
  //             processedIds.add(change.doc.id);

  //             // Mostrar toast
  //             toast.success("El post se ha publicado correctamente");
  //           }
  //         });
  //       });
  //     };

  //     getData();
  //   }, []);

  // useEffect(() => {
  //     const getData = () => {
  //       db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //         const newData = [];
  //         querySnapshot.forEach((doc) => {
  //           newData.push({ ...doc.data(), id: doc.id });
  //         });
  //         setData(newData);

  //         // Mostrar toast si hay nuevos documentos
  //         if (querySnapshot.docChanges().some((change) => change.type === "added")) {
  //             toast.success("El pomente");
  //         }
  //       });
  //     };

  //     getData();
  //   }, []);

  //   useEffect(() => {
  //     let isFirstLoad = true;

  //     const getData = () => {
  //       db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //         const newData = [];
  //         querySnapshot.forEach((doc) => {
  //           newData.push({ ...doc.data(), id: doc.id });
  //         });
  //         setData(newData);

  //         // Mostrar toast solo en el primer carga y cuando se agregan nuevos documentos
  //         if (
  //           isFirstLoad &&
  //           querySnapshot.docChanges().some((change) => change.type === "added")
  //         ) {
  //           toast.success("El pomente");
  //           isFirstLoad = false;
  //         }
  //       });
  //     };

  //     getData();
  //   }, []);

  //   let isFirstLoad = true;
  //   useEffect(() => {
  //     const getData = () => {
  //       db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //         const newData = [];
  //         querySnapshot.forEach((doc) => {
  //           newData.push({ ...doc.data(), id: doc.id });
  //         });
  //         setData(newData);

  //         // Mostrar toast solo en el primer carga y cuando se agregan nuevos documentos
  //         if (
  //           isFirstLoad &&
  //           querySnapshot.docChanges().some((change) => change.type === "added")
  //         ) {
  //           toast.success("El pomente");
  //           isFirstLoad = false;
  //         }
  //       });
  //     };

  //     getData();
  //   }, []);

  //funciona con duplicados
  // useEffect(() => {
  //   const getData = () => {
  //     db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //       const array = [];
  //       let newDocAdded = false; // Variable para controlar si se ha agregado un nuevo documento

  //       querySnapshot.forEach((doc) => {
  //         array.push({ ...doc.data(), id: doc.id });
  //         if (doc.id !== lastIdRef.current) {
  //           newDocAdded = true; // Si hay un documento con un ID diferente al último conocido, se ha agregado un nuevo documento
  //         }
  //       });

  //       setData(array);

  //       if (newDocAdded) {
  //         const lastDocument = array[array.length - 1];
  //         if (lastDocument) {
  //           lastIdRef.current = lastDocument.id; // Actualiza el último ID conocido solo si se ha agregado un nuevo documento
  //           toast.success("Se ha actualizado");
  //         }
  //       }
  //     });
  //   };

  //   getData();
  // }, []);

  //funciona
  useEffect(() => {
    const getData = () => {
      db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          array.push({ ...doc.data(), id: doc.id });
        });

        setData(array);

        // Obtiene el último documento de la lista actual
        const lastDocument = array[array.length - 1];
        if (lastDocument && lastDocument.id !== lastIdRef.current) {
          lastIdRef.current = lastDocument.id; // Actualiza el último ID conocido
          toast.success("Se agregó un nuevo reporte");
        }
      });
    };

    getData();
  }, []);

  // useEffect(() => {
  //     const getData = () => {
  //       db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //         const array = [];
  //         let newDocFound = false;

  //         querySnapshot.forEach((doc) => {
  //           array.push({ ...doc.data(), id: doc.id });
  //           if (doc.id === lastId) {
  //             newDocFound = true;
  //           }
  //         });

  //         setData(array);

  //         if (newDocFound) {
  //             toast.success("El pomente");
  //         }
  //       });
  //     };

  //     getData();
  //   }, [lastId]);

  // useEffect(() => {
  //   const getData = () => {
  //     db.collection("demunaEmpoderadas").onSnapshot((querySnapshot) => {
  //       const array = [];
  //       let largestId = lastId; // Inicializa con el último id conocido

  //       querySnapshot.forEach((doc) => {
  //         array.push({ ...doc.data(), id: doc.id });
  //         // Encuentra el id más grande
  //         if (doc.id > largestId) {
  //           largestId = doc.id;
  //         }
  //       });

  //       setData(array);

  //       // Muestra el toast si se encuentra un id más grande que el último conocido
  //       if (largestId && largestId !== lastId) {
  //         toast.success("El pomente");
  //         setLastId(largestId); // Actualiza el último id conocido
  //       }
  //     });
  //   };

  //   getData();
  // }, [lastId]);

  const ModalDelete = (id) => {
    setIdDelete(id);
    setOpen(true);
  };

  return (
    <div className="relative overflow-x-auto pt-20">
      <ModaleDeleteDemuna
        isOpen={open}
        id={idDelete}
        onClose={() => setOpen(false)}
        message="¿Deseas borrar este item?"
      />

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Mensaje
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((datas, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {convertDate(datas.create)}
              </td>
              <td
                className="px-5 py-6"
                style={{ maxHeight: "100px", overflow: "hidden" }}
              >
                {datas.comment}
              </td>
              <td
                className="px-5 py-6"
                style={{ maxHeight: "100px", overflow: "hidden" }}
              >
                {datas.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => ModalDelete(datas.id)}
                >
                  <div className="ml-2">
                    <svg
                      fill="red"
                      height="25"
                      width="25"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 330 330"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="XMLID_6_">
                          <g id="XMLID_11_">
                            <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z"></path>{" "}
                          </g>
                          <g id="XMLID_18_">
                            <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z"></path>{" "}
                          </g>
                          <g id="XMLID_23_">
                            <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z"></path>{" "}
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Toaster position="bottom-right" expand={true} />
    </div>
  );
}

function convertDate(fecha) {
  const dateTime = new Date(fecha);
  const date = dateTime.toLocaleString();
  return <div>{date}</div>;
}
