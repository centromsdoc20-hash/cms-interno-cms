import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./hooks/useProtectedRoute";
import { Sidebar } from "./components/SiderBar";
import { PdfViewer } from "./components/PdfViewer";
import { VideoPlayer } from "./components/VideoPlayer";
import { Alertas } from "./components/Alerts/Alerts";
import Login from "./pages/Login/Login";
import CreateAlert from "./pages/CreateAlert/CreateAlert";
import placeholderImage from "./assets/background.jpg";
import styles from './styles/styles.module.scss';

interface VideoData {
  url: string;
  title: string;
}

const Layout = () => {
  const [selectedManual, setSelectedManual] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  
  const showAlertas = !selectedManual && !selectedVideo;

  const handleSelectManual = (manualUrl: string | null) => {
    setSelectedManual(manualUrl);
    setSelectedVideo(null);
  };

  const handleSelectVideo = (videoUrl: string, title: string) => {
    setSelectedVideo({ url: videoUrl, title });
    setSelectedManual(null);
  };

  return (
    <div className={styles.appContainer}>
      <Sidebar 
        onSelectManual={handleSelectManual}
        onSelectVideo={handleSelectVideo}
      />
      
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          {selectedManual && (
            <>
              <PdfViewer fileUrl={selectedManual} />
            </>
          )}

          {selectedVideo && (
            <>
              <VideoPlayer
                videoUrl={selectedVideo.url}
              />
            </>
          )}
          
          {showAlertas && (
            <div className={styles.placeholderContainer}>
              <img
                src={placeholderImage}
                alt="Imagem ilustrativa"
                className={styles.backgroundImage}
              />
              <div className={styles.overlay} />
              <Alertas isVisible={showAlertas} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota de login - pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas principais - todas públicas (sem proteção) */}
          <Route path="/" element={<Layout />} />
          <Route path="/rec" element={<Layout />} />
          
          {/* Única rota protegida - só essa precisa de login */}
          <Route 
            path="/criar-alerta" 
            element={
              <ProtectedRoute>
                <CreateAlert />
              </ProtectedRoute>
            } 
          />
           
          {/* Rota curinga - pública também */}
          <Route path="*" element={<Layout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;