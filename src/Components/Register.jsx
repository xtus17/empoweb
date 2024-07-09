import { useState } from "react";
import { useAutenticado } from "../utils/authContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function Register() {
  const { signup } = useAutenticado();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/home");
    } catch (error) {
      setError("Upss! Sucedió un error");
    }
  };

  return (
    <div>
      <form className="max-w-sm mx-auto pt-24" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoFocus
            placeholder="Tu correo"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Tu contraseña"
            minLength={6}
            onChange={handleChange}
            autoComplete="off"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar
        </button>
      </form>

      <Modal
        isOpen={error}
        onClose={() => setError(false)}
        message="Sucedió un error, por favor inténtalo de nuevo"
      />
    </div>
  );
}
