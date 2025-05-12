'use client';

import React from 'react';
import { MedicalSpinner, HeartbeatLine, HealthStatus, HealthMeter, VitalsChart } from './components/MedicalUI';

export default function ThemeTest() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-primary">Medical Theme Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Card 1 - Basic Card */}
        <div className="card p-6">
          <h3 className="card-header mb-4">Standard Card</h3>
          <p className="mb-4">This is a standard card with hover effects. Try hovering over it!</p>
          <button className="btn btn-primary">Primary Button</button>
        </div>
        
        {/* Card 2 - Medical Components */}
        <div className="card p-6">
          <h3 className="card-header mb-4">Medical UI Components</h3>
          <div className="flex items-center mb-4 space-x-4">
            <MedicalSpinner size="sm" />
            <HeartbeatLine />
          </div>
          <div className="mb-4">
            <p className="mb-2">Patient Status:</p>
            <HealthStatus status="positive" />
          </div>
          <div className="mb-4">
            <p className="mb-2">Recovery Progress:</p>
            <HealthMeter percentage={75} />
          </div>
        </div>
        
        {/* Card 3 - Vitals Chart */}
        <div className="card p-6">
          <h3 className="card-header mb-4">Vitals Chart</h3>
          <VitalsChart />
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 gradient-text">Button Styles</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-outline">Outline Button</button>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Status Indicators</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h4 className="mb-2 font-bold">Health Status:</h4>
            <div className="flex flex-col gap-2">
              <HealthStatus status="positive" />
              <HealthStatus status="warning" />
              <HealthStatus status="critical" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="mb-2 font-bold">Health Meters:</h4>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm mb-1">Good (80%)</p>
                <HealthMeter percentage={80} status="positive" />
              </div>
              <div>
                <p className="text-sm mb-1">Caution (45%)</p>
                <HealthMeter percentage={45} status="warning" />
              </div>
              <div>
                <p className="text-sm mb-1">Critical (15%)</p>
                <HealthMeter percentage={15} status="critical" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Typography & Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h1 className="mb-2">H1 Heading</h1>
            <h2 className="mb-2">H2 Heading</h2>
            <h3 className="mb-2">H3 Heading</h3>
            <p className="mb-2">Body text in Inter or Open Sans</p>
            <p className="text-sm">Small text</p>
          </div>
          <div>
            <div className="mb-2 p-4 bg-primary text-white">Primary (Dark Green)</div>
            <div className="mb-2 p-4 bg-secondary text-white">Secondary (Light Green)</div>
            <div className="mb-2 p-4 bg-accent text-white">Accent (Orange)</div>
            <div className="mb-2 p-4 bg-off-white border">Off White</div>
          </div>
        </div>
      </div>
      
      <div className="scroll-reveal bg-white p-6 rounded-lg shadow-md border border-primary/20">
        <h2 className="text-2xl font-bold mb-4">Scroll Animation Test</h2>
        <p>This element should fade in as you scroll down to it.</p>
      </div>
    </div>
  );
} 