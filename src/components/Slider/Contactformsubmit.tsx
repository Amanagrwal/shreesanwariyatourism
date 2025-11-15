import React, { useEffect, useState, useCallback } from "react";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { BASE_URL } from "../Helper/Base_Url";


function Contactformsubmit() {
 const [loading, setLoading] = useState(false);
  const { toast } = useToast();
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

   const validateForm = () => {
      if (!formData.name.trim()) return 'Please enter your full name.';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
        return 'Please enter a valid email address.';
      if (!formData.phone.trim() || formData.phone.length < 8)
        return 'Please enter a valid phone number.';
      if (!formData.date) return 'Please select a travel date.';
      return null;
    };


     const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: 'Validation Error',
        description: validationError,
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);

    const payload = {
      ContectUs_name: formData.name,
      ContectUs_email: formData.email,
      ContectUs_cono: formData.phone,
      // ContectUs_Destination: itemName || 'Ask The Expert',
      ContectUs_message: formData.message,
      ContectUs_Travel_Date: formData.date || null,
    };
console.log(payload)
    try {
      const response = await fetch(`${BASE_URL}/contactsubmit/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log("res",response)
      const data = await response.json();
     console.log(data);
      if (response.ok) {
        toast({
          title: data?.message || 'Inquiry Sent!',
          description: "We'll contact you shortly via WhatsApp and Email.",
          //  variant : 'success',
        });

        setFormData({ name: '', email: '', phone: '', date: '', message: '' });
        // onClose?.();
      } else {
        toast({
          title: 'Submission Failed',
          description: data?.message || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Network Error',
        description: 'Unable to submit your inquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
   <>
   
     <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/20 text-left">
      <h2 className="text-2xl font-bold text-primary-foreground mb-4">
        Book Your Tour
      </h2>

      {/* You can reuse form inputs from BookingModal here */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        </div>

        <Textarea
          placeholder="Special requests or message..."
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />

        <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 text-white">
          {loading ? "Sending..." : "Send Inquiry"}
        </Button>
      </form>
    </div>
   </>
  )
}

export default Contactformsubmit
