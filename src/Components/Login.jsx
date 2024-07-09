import { useState } from "react";
import { useAutenticado } from "../utils/authContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export default function Login() {
  const [error, setError] = useState(false);
  const { login, loginGoogle, resetPassword } = useAutenticado();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.email) return setError("Por favor ingresa un correo");
    try {
      await resetPassword(user.email);
      setError("Por favor revisa tu correo, se envío un enlace");
      //onOpen();
    } catch (error) {
      setError("Correo no registrado");
      //  onOpen();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/home");
    } catch (error) {
      setError("Usuario o contraseña incorrectos");
      // onOpen();
    }
  };

  const handleGoogle = async () => {
    try {
      await loginGoogle();
      navigate("/home");
    } catch (error) {
      setError(error);
      console.log(error)
    }
  };

  return (
    <div>
      <form className="max-w-sm mx-auto pt-24">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoFocus
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            name="password"
            placeholder="Tu contraseña"
            minLength={6}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Enviar
        </button>
      </form>

      <div className="flex justify-center items-center pt-4">
        <button
          onClick={handleGoogle}
          className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center"
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
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>{" "}
          Acceder con Google
        </button>
      </div>

      <Modal
        isOpen={error}
        onClose={() => setError(false)}
        message="Sucedió un error, por favor inténtalo de nuevo"
      />
    </div>
  );
}
