"use client";

import React from "react";
import "./Hero.css";
import doctor from "../../images/DrDAlessandro.jpg";
import stetho from "../../images/stetho.png"
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Hero(): JSX.Element {
  const router = useRouter();
  const handleInviteClick = () => {
    router.push('/Invite')
  }
  return (
    <section className="heroSection">
      <div className="heroContent">
        <h1>Optimice sus consultas. Atienda mejor sus pacientes</h1>
        <p>Recupere su tiempo. Experiencia superior con su HCE.</p>
        <Image className="stethoImage" src={stetho} alt="stethoscope"></Image>
        <button onClick={handleInviteClick} className="start">Empecemos!</button>
      </div>
      <div className="heroImage">
        <Image src={doctor} alt="Doctor" />
      </div>
    </section>
  );
}
