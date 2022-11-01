import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Textfield from '@/components/ui/Textfield';
import { loginUser } from '@/api/ApiClient';
import { statuses, loggedInPages } from '@/misc/Constants';
import { setTokens, resetTokens, setRoles } from '@/api/LocalStorage';
import 'react-toastify/dist/ReactToastify.css';
import TitleBar from '@/components/ui/TitleBar.jsx';

const Login = ({ logout }) => {
  const navigation = useNavigate();
  useEffect(() => {
    if (logout) {
      resetTokens();
      setRoles([]);
      toast.success('Logged Out!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then((response) => {
        if (response === undefined) throw new Error('response undefined in loginUser');

        setTokens(response.data.access, response.data.refresh);
        if (response.data.roles) {
          setRoles(response.data.roles);
          const mainRole = response.data.roles.filter((x) => x.main)
            .sort((a, b) => a.int + b.int)[0].name.toLowerCase();
          const num = statuses[mainRole];
          const url = loggedInPages.find((x) => (num & x.int) !== 0).path;
          navigation(url);
        } else {
          console.error('No roles found in response, sending user to student dashboard');
          navigation('/dashboard/student');
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if ('error' in error.response.data) {
          toast.error(error.response.data.error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full rounded bg-white shadow-xl flex flex-col items-center p-4">
        <div className="w-full">
          <TitleBar text="Login" />
        </div>
        <form onSubmit={submitLogin} className="w-full flex flex-col items-center gap-4">
          <Textfield
            name="email"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textfield
            name="password"
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-3/4 rounded bg-purple-500 text-center py-2 text-zinc-100 font-light text-2xl"
          >
            Submit
          </button>
          <Link to="/auth/register">
            <p className="text-gray-700 transition-all hover:text-purple-500 cursor-pointer">
              Don&apos;t have an account? Register
            </p>
          </Link>
        </form>
      </div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default Login;
