"use client";

import React, { useState, useEffect, useRef } from 'react';
import useDeviceDetect from '../hooks/useDeviceDetect';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  value?: string;
}

interface ResponsiveFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel?: string;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

const ResponsiveForm: React.FC<ResponsiveFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  className = '',
  successMessage = 'Form submitted successfully!',
  errorMessage = 'There was an error submitting the form. Please try again.',
  layout = 'vertical',
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const device = useDeviceDetect();

  // Initialize form data
  useEffect(() => {
    const initialData: Record<string, string> = {};
    fields.forEach((field) => {
      initialData[field.id] = field.value || '';
    });
    setFormData(initialData);
  }, [fields]);

  // Handle field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked ? 'true' : 'false' }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
        isValid = false;
      }

      // Email validation
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Please enter a valid email address';
          isValid = false;
        }
      }

      // Phone validation
      if (field.type === 'tel' && formData[field.id]) {
        const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
        if (!phoneRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Please enter a valid phone number';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setSubmitted(true);
        await onSubmit(formData);
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        if (formRef.current) {
          formRef.current.reset();
          const initialData: Record<string, string> = {};
          fields.forEach((field) => {
            initialData[field.id] = '';
          });
          setFormData(initialData);
        }
        
        // Clear success message after delay
        setTimeout(() => {
          setSubmitted(false);
          setSubmitSuccess(false);
        }, 3000);
      } catch (error) {
        setSubmitSuccess(false);
        console.error('Form submission error:', error);
        
        // Clear error message after delay
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };

  // Handle focus and blur for better mobile UX
  const handleFocus = (fieldId: string) => {
    setActiveField(fieldId);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // Get CSS classes based on layout
  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'md:grid md:grid-cols-2 md:gap-x-6 gap-y-4';
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 gap-4';
      case 'vertical':
      default:
        return 'flex flex-col gap-4';
    }
  };

  // Apply iOS-specific styles
  const getIOSSpecificClass = (type: string) => {
    if (device.isIOS) {
      if (type === 'select') {
        return 'ios-select';
      } else if (type === 'checkbox' || type === 'radio') {
        return 'ios-checkbox';
      }
    }
    return '';
  };

  return (
    <div className={`responsive-form-container ${className}`}>
      <form 
        ref={formRef}
        onSubmit={handleSubmit}
        className={`responsive-form ${getLayoutClasses()}`}
        noValidate
      >
        {fields.map((field) => (
          <div 
            key={field.id}
            className={`form-field ${
              activeField === field.id ? 'active' : ''
            } ${errors[field.id] ? 'has-error' : ''}`}
          >
            {field.type !== 'checkbox' && field.type !== 'radio' && (
              <label 
                htmlFor={field.id}
                className={`block text-gray-700 font-medium mb-1.5 ${
                  field.required ? 'required' : ''
                }`}
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}

            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                value={formData[field.id] || ''}
                onChange={handleChange}
                onFocus={() => handleFocus(field.id)}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                required={field.required}
                className={`w-full px-4 py-2.5 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300'
                } ${device.isMobile ? 'text-base' : ''}`}
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                name={field.id}
                value={formData[field.id] || ''}
                onChange={handleChange}
                onFocus={() => handleFocus(field.id)}
                onBlur={handleBlur}
                required={field.required}
                className={`w-full px-4 py-2.5 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-colors appearance-none bg-white ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300'
                } ${getIOSSpecificClass('select')} ${device.isMobile ? 'text-base' : ''}`}
              >
                <option value="">{field.placeholder || 'Select an option'}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center">
                <input
                  id={field.id}
                  name={field.id}
                  type="checkbox"
                  checked={formData[field.id] === 'true'}
                  onChange={handleCheckboxChange}
                  onFocus={() => handleFocus(field.id)}
                  onBlur={handleBlur}
                  required={field.required}
                  className={`w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    getIOSSpecificClass('checkbox')
                  }`}
                />
                <label 
                  htmlFor={field.id}
                  className="ml-2 block text-gray-700 cursor-pointer"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </div>
            ) : field.type === 'radio' ? (
              <div className="flex items-center">
                <input
                  id={field.id}
                  name={field.id}
                  type="radio"
                  value={field.value}
                  checked={formData[field.id] === field.value}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field.id)}
                  onBlur={handleBlur}
                  required={field.required}
                  className={`w-5 h-5 text-primary border-gray-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    getIOSSpecificClass('radio')
                  }`}
                />
                <label 
                  htmlFor={field.id}
                  className="ml-2 block text-gray-700 cursor-pointer"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              </div>
            ) : (
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formData[field.id] || ''}
                onChange={handleChange}
                onFocus={() => handleFocus(field.id)}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                required={field.required}
                className={`w-full px-4 py-2.5 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300'
                } ${device.isMobile ? 'text-base' : ''}`}
                // Apply larger font size on mobile to prevent zooming
                style={device.isMobile ? { fontSize: '16px' } : undefined}
              />
            )}
            
            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
            )}
          </div>
        ))}

        <div className={layout === 'grid' ? 'sm:col-span-2' : ''}>
          <button
            type="submit"
            className={`w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${
              submitted ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={submitted}
          >
            {submitted ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </form>

      {submitted && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            submitSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
          role="alert"
        >
          {submitSuccess ? successMessage : errorMessage}
        </div>
      )}
    </div>
  );
};

export default ResponsiveForm; 