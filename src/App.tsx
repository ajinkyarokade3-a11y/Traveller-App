import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import HeroLanding from './pages/HeroLanding';
import IndiaLandingExperience from './pages/IndiaLandingExperience';
import TravelerWorkspace from './components/trip/TravelerWorkspace';
import DestinationExplorer from './components/destination/DestinationExplorer';
import CatalogueExplorer from './components/booking/CatalogueExplorer';
import AIChatConsole from './components/ai/AIChatConsole';
import CreateTripModal from './components/trip/CreateTripModal';
import DynamicBackground, { BACKGROUND_SCENES } from './components/layout/DynamicBackground';
import { Destination, Trip } from './types/tourflow';
import { TourFlowApi } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'workspace' | 'destinations' | 'catalog' | 'ai_console'>('landing');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestinationSlug, setSelectedDestinationSlug] = useState('manali');
  const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [initialPrefData, setInitialPrefData] = useState<Record<string, any>>();
  const [initialDestId, setInitialDestId] = useState<string>();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState('');
  const [chatInitialDestination, setChatInitialDestination] = useState<string>();
  const [chatInitialDuration, setChatInitialDuration] = useState<string>();
  const [chatInitialPayload, setChatInitialPayload] = useState<any>(null);

  useEffect(() => {
    TourFlowApi.getDestinations().then(setDestinations).catch((error) => console.error('Failed to load destinations', error));
  }, []);

  const openCreateTrip = (destinationId?: string) => {
    setEditingTrip(null);
    setInitialDestId(destinationId);
    setInitialPrefData(undefined);
    setIsCreateTripModalOpen(true);
  };

  const startChat = (prompt: string, params?: { destination?: string; duration?: string }) => {
    setChatInitialPayload(null);
    setChatInitialPrompt(prompt);
    setChatInitialDestination(params?.destination);
    setChatInitialDuration(params?.duration);
    setActiveTab('ai_console');
  };

  const exitChat = (targetTab: 'landing' | 'workspace' = 'landing') => {
    setChatInitialPrompt('');
    setChatInitialDestination(undefined);
    setChatInitialDuration(undefined);
    setChatInitialPayload(null);
    TourFlowApi.clearActiveSession();
    setActiveTab(targetTab);
  };

  const selectedDestination = (destination: Destination) => {
    setSelectedDestinationSlug(destination.slug);
    const index = BACKGROUND_SCENES.findIndex((scene) => scene.slug === destination.slug || scene.title.toLowerCase().includes(destination.name.toLowerCase()));
    if (index !== -1) setCurrentSceneIndex(index);
    setActiveTab('destinations');
  };

  return (
    <DynamicBackground
      currentSceneIndex={currentSceneIndex}
      onSceneChange={setCurrentSceneIndex}
      isAutoPlaying={isAutoPlaying}
      onToggleAutoPlay={() => setIsAutoPlaying((value) => !value)}
      onQuickPlanDestination={(slug) => openCreateTrip(destinations.find((destination) => destination.slug === slug)?.id)}
      isImmersiveMode={isImmersiveMode}
      onToggleImmersiveMode={() => setIsImmersiveMode((value) => !value)}
      isLandingView={activeTab === 'landing'}
    >
      <div className="min-h-screen text-stone-900 flex flex-col font-sans selection:bg-[#7065F0] selection:text-white">
        {activeTab !== 'landing' && activeTab !== 'ai_console' && (
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenCreateTrip={() => openCreateTrip()}
          />
        )}
        <main className={`flex-1 transition-all duration-500 ${isImmersiveMode ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}>
          {activeTab === 'landing' && (
            <>
              <HeroLanding
                destinations={destinations}
                onSelectDestination={selectedDestination}
                onOpenCreateTrip={() => openCreateTrip()}
                onExploreWorkspace={() => setActiveTab('workspace')}
                onStartChatWithPrompt={startChat}
                onNavigateTab={setActiveTab}
              />
              <IndiaLandingExperience
                destinations={destinations}
                currentScene={BACKGROUND_SCENES[currentSceneIndex]}
                onSelectDestination={selectedDestination}
                onOpenCreateTrip={() => openCreateTrip()}
                onStartChatWithPrompt={startChat}
                onNavigateTab={setActiveTab}
              />
            </>
          )}
          {activeTab === 'workspace' && <TravelerWorkspace onOpenCreateTrip={() => openCreateTrip()} onOpenEditPreferences={(trip) => { setEditingTrip(trip); setIsCreateTripModalOpen(true); }} />}
          {activeTab === 'destinations' && <DestinationExplorer initialDestinationSlug={selectedDestinationSlug} onPlanTripForDestination={(destination) => openCreateTrip(destination.id)} onStartChatWithPrompt={startChat} />}
          {activeTab === 'catalog' && <CatalogueExplorer onStartChatWithPrompt={startChat} onOpenCreateTrip={() => openCreateTrip()} />}
          {activeTab === 'ai_console' && (
            <AIChatConsole
              initialPrompt={chatInitialPrompt}
              initialDestination={chatInitialDestination}
              initialDuration={chatInitialDuration}
              initialPayload={chatInitialPayload}
              destinations={destinations}
              onAutoFillTrip={(extracted) => { setEditingTrip(null); setInitialPrefData(extracted); setIsCreateTripModalOpen(true); }}
              onOpenEditPreferences={(trip) => { setEditingTrip(trip); setIsCreateTripModalOpen(true); }}
              onNavigateToWorkspace={() => exitChat('workspace')}
              onBackToHome={() => exitChat('landing')}
            />
          )}
        </main>
        {activeTab !== 'landing' && activeTab !== 'ai_console' && <footer className="bg-white/80 backdrop-blur-md border-t border-stone-200/80 py-6 text-center text-xs text-stone-500">WonderAi <span className="text-[#7065F0]">•</span> Where do you want to go?</footer>}
        <CreateTripModal
          isOpen={isCreateTripModalOpen}
          onClose={() => setIsCreateTripModalOpen(false)}
          destinations={destinations}
          initialDestinationId={initialDestId}
          initialPreferences={initialPrefData}
          editingTrip={editingTrip}
          onTripCreatedOrUpdated={() => setActiveTab('workspace')}
          onStartChatWithTripPayload={(payload) => { setChatInitialPayload(payload); setChatInitialPrompt(''); setChatInitialDestination(payload.destination); setChatInitialDuration(payload.durationDays ? `${payload.durationDays} days` : undefined); setActiveTab('ai_console'); setIsCreateTripModalOpen(false); }}
        />
      </div>
    </DynamicBackground>
  );
}
