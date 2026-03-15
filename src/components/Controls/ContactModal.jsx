import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from './Controls.module.css'; // Reusing your modal styles!

const ContactModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    // Use your Service ID, but create a NEW Template ID for direct messages
    emailjs.send('service_2xtan57', 'YOUR_NEW_CONTACT_TEMPLATE_ID', templateParams, 'niMes68dhAM6tWyNm')
      .then(() => {
        alert("Message sent! I'll get back to you soon.");
        onClose();
      })
      .catch((error) => {
        console.error("Failed to send:", error);
        alert("Something went wrong, but you can reach me at ekrishnakishor@gmail.com");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className={styles.editorContainer} style={{ height: 'auto', padding: '2rem' }} initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Let's Build Something</h3>
          <button onClick={onClose} className={styles.closeBtn}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            required type="text" placeholder="Your Name" disabled={isSending}
            style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid #30363d', color: 'white', outline: 'none' }}
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            required type="email" placeholder="Your Email" disabled={isSending}
            style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid #30363d', color: 'white', outline: 'none' }}
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          <textarea 
            required placeholder="How can I help you?" disabled={isSending} rows="4"
            style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid #30363d', color: 'white', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
            onChange={e => setFormData({...formData, message: e.target.value})} 
          />
          
          <button type="submit" disabled={isSending} style={{ background: '#3b82f6', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', cursor: 'pointer' }}>
            {isSending ? 'Sending...' : <><Send size={16} /> Send Message</>}
          </button>
        </form>

      </motion.div>
    </motion.div>
  );
};

export default ContactModal;