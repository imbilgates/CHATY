import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';


const WhatsApp = ({ textContent }) => {
    const { theme } = useContext(ThemeContext);
    const room = localStorage.getItem('room');
    const location = useLocation();
    const [share, setShare] = useState('')

    const handleShareButton = () => {
        const currentUrl = `${window.location.origin}${location.pathname}${"/" + room}`;

        // Copy the current URL to the clipboard
        navigator.clipboard.writeText(currentUrl).then(() => {
            console.log('URL copied to clipboard:', currentUrl, share);
            setShare(currentUrl);

            // Open WhatsApp with the copied URL
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check this out: ${currentUrl}`)}`;
            window.open(whatsappUrl, '_blank');
        }).catch(err => {
            console.error('Failed to copy URL to clipboard:', err);
        });
    };

    return (
        <div
            onClick={handleShareButton}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <i style={{ fontSize: '30px' }} className={`bx bxl-whatsapp whatsapp ${!theme &&"whatsappDark"}`}></i>
            <b style={{ marginRight: '8px', color: 'rgba(0, 0, 0, 0.5)' }}>{textContent || ""}</b>
        </div>
    )
}

export default WhatsApp