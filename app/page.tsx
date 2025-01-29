"use client"
import React from "react";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import { ChevronDown, Leaf, Mountain, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/1080"
            alt="Safari landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
            NuLeaf Planning & Environmental
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mb-8">
            Integrated Solutions for Sustainable Development in Southern Africa
          </p>
          <Button 
            className="group flex items-center gap-2"
            color="primary"
            variant="solid"
            endContent={<ChevronDown className="group-hover:translate-y-1 transition-transform duration-300" />}
          >
            Explore Our Services
          </Button>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background dark:bg-background">
              <CardHeader className="flex gap-3">
                <Leaf className="text-primary w-8 h-8" />
                <h3 className="text-2xl font-semibold text-foreground">Environmental Planning</h3>
              </CardHeader>
              <CardBody>
                <p className="text-foreground/80 dark:text-foreground/80">
                  Sustainable solutions for environmental challenges through expert planning and assessment.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-background dark:bg-background">
              <CardHeader className="flex gap-3">
                <Mountain className="text-primary w-8 h-8" />
                <h3 className="text-2xl font-semibold text-foreground">Landscape Planning</h3>
              </CardHeader>
              <CardBody>
                <p className="text-foreground/80 dark:text-foreground/80">
                  Creating harmonious landscapes that blend natural beauty with functional design.
                </p>
              </CardBody>
            </Card>

            <Card className="bg-background dark:bg-background">
              <CardHeader className="flex gap-3">
                <Users className="text-primary w-8 h-8" />
                <h3 className="text-2xl font-semibold text-foreground">Tourism Planning</h3>
              </CardHeader>
              <CardBody>
                <p className="text-foreground/80 dark:text-foreground/80">
                  Developing sustainable tourism experiences that showcase Southern Africa's natural heritage.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 bg-background/50 dark:bg-background/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/api/placeholder/800/600"
              alt="Team at work"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-foreground/80 dark:text-foreground/80 mb-6">
              Established in 2012, NuLeaf Planning and Environmental (Pty) Ltd has grown into a leading multi-disciplinary company specializing in Environmental, Landscape and Tourism planning services throughout Southern Africa.
            </p>
            <p className="text-foreground/80 dark:text-foreground/80 mb-6">
              Our unique combination of expertise and close association with diverse specialists enables us to offer integrated and sustainable solutions that support planners, developers, and decision-makers in both government and private sectors.
            </p>
            <Button 
              color="primary"
              variant="solid"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}