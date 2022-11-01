import React from 'react';
import Login from '@/pages/Login';
import Banner from '@/treasury/example-school-banner.png';
import TitleBar from '@/components/ui/TitleBar.jsx';
import Button from '@/components/ui/Button';

const FrontPage = () => (
  <div className="flex flex-col space-y-10">
    <div className="bg-white rounded rounded-t-3xl shadow-xl">
      <img src={Banner} className="rounded-t-3xl w-full" />
      <h1 className="text-5xl p-3 text-center">Example School</h1>
      <div className="text-center text-l p-2">The worst in everyone - Example School Motto</div>
    </div>
    {
      // TODO: change to if logged in... else
      // eslint-disable-next-line no-constant-condition
      true ? <Login /> : <Button>Go to the Dashboard!</Button>
    }
    <div className="bg-white rounded shadow-xl rounded-b-3xl">
      <TitleBar text="Help" />
      <p className="text-xl p-5 text-center">
        Do you need help signing in? Ask your teacher!
      </p>
    </div>
  </div>
);
export default FrontPage;
