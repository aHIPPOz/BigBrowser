import { useState, useRef } from 'react';

export default function Home() {
  // État pour stocker l'URL actuelle
  const [url, setUrl] = useState('https://www.google.com');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fonction pour mettre à jour l'URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // Fonction pour charger l'URL dans l'iframe
  const loadUrl = () => {
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  // Fonction pour actualiser la page dans l'iframe
  const refreshPage = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barre d'adresse et boutons de navigation */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        {/* Boutons de navigation */}
        <div className="flex space-x-2">
          <button 
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded" 
            onClick={() => window.history.back()}>
            Retour
          </button>
          <button 
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded" 
            onClick={() => window.history.forward()}>
            Avancer
          </button>
          <button 
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded" 
            onClick={refreshPage}>
            Actualiser
          </button>
        </div>

        {/* Barre d'adresse */}
        <input 
          type="text" 
          className="w-2/3 bg-gray-700 text-white px-3 py-1 rounded" 
          value={url} 
          onChange={handleUrlChange} 
          onKeyDown={(e) => e.key === 'Enter' && loadUrl()}
        />

        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" 
          onClick={loadUrl}>
          Aller
        </button>
      </div>

      {/* Zone d'affichage de la page web */}
      <div className="flex-grow">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full"
          title="Navigateur intégré"
        />
      </div>
    </div>
  );
}
