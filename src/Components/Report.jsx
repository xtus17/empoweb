import { useEffect, useState } from "react";
import { db } from "./../utils/firebase";
import ModalDeleteReport from "./ModalDeleteReport";

export default function Report() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState();

  useEffect(() => {
    const getData = () => {
      db.collection("buttonPanicEmpoderadas").onSnapshot((querySnapshot) => {
        const array = [];
        querySnapshot.forEach((doc) => {
          array.push({ ...doc.data(), id: doc.id });
        });
        setData(array);
      });
    };

    getData();
  }, []);

  const ModalDelete = (id) => {
    setIdDelete(id);
    setOpen(true);
  };

  return (
    <div className="relative overflow-x-auto pt-20">
      <ModalDeleteReport
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
              Dirección
            </th>
            <th scope="col" className="px-6 py-3">
              Audio
            </th>
            <th scope="col" className="px-6 py-3">
              Móvil
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
                {datas.direccion}
              </td>
              <td
                className="px-5 py-6"
                style={{ maxHeight: "100px", overflow: "hidden" }}
              >
                {start(datas.audio)}
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
    </div>
  );
}

function convertDate(fecha) {
  const dateTime = new Date(fecha);
  const date = dateTime.toLocaleString();
  return <div>{date}</div>;
}

function start(audio) {
  if (audio.length !== 0) {
    var mp3 = audio[0];
    return (
      <>
        <div>
          <a target="_blank" rel="noreferrer" href={mp3}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={35}
              height={35}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M9.66984 13.9219C8.92984 13.9219 8.33984 14.5219 8.33984 15.2619C8.33984 16.0019 8.93984 16.5919 9.66984 16.5919C10.4098 16.5919 11.0098 15.9919 11.0098 15.2619C11.0098 14.5219 10.4098 13.9219 9.66984 13.9219Z"
                  fill="#292D32"
                ></path>{" "}
                <path
                  d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17.12 9.8C17.12 10.41 16.86 10.95 16.42 11.27C16.14 11.47 15.8 11.58 15.44 11.58C15.23 11.58 15.02 11.54 14.8 11.47L12.51 10.71C12.5 10.71 12.48 10.7 12.47 10.69V15.25C12.47 16.79 11.21 18.05 9.67 18.05C8.13 18.05 6.87 16.79 6.87 15.25C6.87 13.71 8.13 12.45 9.67 12.45C10.16 12.45 10.61 12.59 11.01 12.8V8.63V8.02C11.01 7.41 11.27 6.87 11.71 6.55C12.16 6.23 12.75 6.15 13.33 6.35L15.62 7.11C16.48 7.4 17.13 8.3 17.13 9.2V9.8H17.12Z"
                  fill="#292D32"
                ></path>{" "}
              </g>
            </svg>
          </a>
        </div>
      </>
    );
  }
}
