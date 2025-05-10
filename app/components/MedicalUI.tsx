'use client';

import React from 'react';

// Medical-themed loading spinner
export function MedicalSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };
  
  return (
    <div className={`medical-spinner ${sizeClasses[size]}`} aria-label="Loading"></div>
  );
}

// Heartbeat Line
export function HeartbeatLine() {
  return <div className="heartbeat-icon" aria-hidden="true"></div>;
}

// Health Status Indicator
export function HealthStatus({ 
  status 
}: { 
  status: 'positive' | 'warning' | 'critical' 
}) {
  return (
    <span className="inline-flex items-center">
      <span className={`status-icon ${status}`} aria-hidden="true"></span>
      <span className={`status-${status}`}>
        {status === 'positive' && 'Normal'}
        {status === 'warning' && 'Caution'}
        {status === 'critical' && 'Critical'}
      </span>
    </span>
  );
}

// Health Meter
export function HealthMeter({ 
  percentage, 
  status = 'positive' 
}: { 
  percentage: number;
  status?: 'positive' | 'warning' | 'critical' 
}) {
  return (
    <div className={`health-meter ${status}`}>
      <div className="health-meter-fill" style={{ width: `${percentage}%` }}></div>
    </div>
  );
}

// Vitals Chart
export function VitalsChart() {
  return (
    <div className="vitals-chart" aria-label="Vitals chart">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="vitals-bar" style={{ height: `${20 + Math.random() * 60}%` }}></div>
      ))}
    </div>
  );
}

// Medical Icon
export function MedicalIcon({ 
  icon, 
  variant = 'default' 
}: { 
  icon: React.ReactNode;
  variant?: 'default' | 'accent' 
}) {
  return (
    <div className={`icon-medical ${variant === 'accent' ? 'accent' : ''}`}>
      {icon}
    </div>
  );
}

// Pulse Effect Wrapper
export function PulseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="icon-pulse relative">
      {children}
    </div>
  );
} 