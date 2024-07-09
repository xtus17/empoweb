import { useEffect, useState } from "react";
import { db } from "./../utils/firebase";
import ModalDeleteUser from "./ModalDeleteUser";

export default function DeleteUser() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState();

  useEffect(() => {
    const getData = () => {
      db.collection("deleteUserEmpoderadas").onSnapshot((querySnapshot) => {
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
      <ModalDeleteUser
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
              Descripción
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
                {convertDate(datas.date)}
              </td>
              <td
                className="px-5 py-6"
                style={{ maxHeight: "100px", overflow: "hidden" }}
              >
                {datas.message}
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
