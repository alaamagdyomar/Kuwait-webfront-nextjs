"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import aboutUs from "@/appImages/aboutus.png";

type Props = {};

export default function CustomerCarsoul({}: Props) {
  const CarouselSlide = () => {
    return (
      <div className="grid grid-cols-2 gap-x-3">
        <Image alt="kk" src={aboutUs} className="" width={1024} height={1024} />
        <div>
          <p>Customers come first</p>
          <p>
            We're far more than just swift food delivery. Picks app enables
            customers to pick up their takeaway meals, skip boring grocery trips
            and send parcels. Customer needs are the core and center of our
            business. Download the app to experience true convenience.
          </p>
        </div>
      </div>
    );
  };

  return (
    <Carousel className="h-[50vh]">
      <CarouselSlide />
      <CarouselSlide />
    </Carousel>
  );
}
