import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Textfield from '@/components/ui/Textfield';
import { registerUser } from '@/api/ApiClient';
import { setTokens } from '@/api/LocalStorage';
import TitleBar from '@/components/ui/TitleBar.jsx';

const Register = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const submitRegister = (e) => {
    e.preventDefault();
    registerUser(firstname, surname, email, password, studentId)
      .then((response) => {
        setTokens(response.data.access, response.data.refresh);
        navigate('/dashboard/student');
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full rounded bg-white shadow-xl flex flex-col items-center p-4">
        <div className="w-full">
          <TitleBar text="Register" />
        </div>
        <form onSubmit={submitRegister} className="w-full flex flex-col items-center gap-4">
          <Textfield
            name="firstname"
            type="text"
            label="Firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Textfield
            name="surname"
            type="text"
            label="Surname"
            onChange={(e) => setSurname(e.target.value)}
          />
          <Textfield
            name="email"
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textfield
            name="student-id"
            type="text"
            label="Student ID"
            onChange={(e) => setStudentId(e.target.value)}
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
          <Link to="/auth/login">
            <p className="text-gray-700 transition-all hover:text-purple-500 cursor-pointer">
              Already have an account? Login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Register;
