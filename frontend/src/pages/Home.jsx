import { Link } from "react-router-dom";

import Card from "../components/Card";

import Button from "../components/Button";

export default function Home() {

 return (

  <div className="space-y-8">

   <div className="text-center space-y-4">

    <h1

     className="text-5xl font-bold text-white tracking-tight leading-tight animate-fade-in uppercase

     font-sans [text-shadow:_2px_2px_0_rgb(0_0_0),_4px_4px_0_rgb(0_0_0),_6px_6px_0_rgb(0_0_0)]

     hover:translate-y-[-4px] transition-transform duration-300"

    >

     Welcome to BusHub

    </h1>

    <p

     className="text-xl text-white/90 font-semibold tracking-wide leading-relaxed max-w-2xl mx-auto

      animate-fade-in-delayed normal-case font-sans -mt-4

      [text-shadow:_1px_1px_0_rgb(0_0_0),_2px_2px_0_rgb(0_0_0)]"

    >

     Your one-stop solution for bus management

    </p>

   </div>

  </div>

 );

}