// Script to help clear service worker and browser cache
(function() {
    // Function to unregister service worker
    async function unregisterServiceWorker() {
        try {
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (let registration of registrations) {
                    await registration.unregister();
                    console.log('Service worker unregistered');
                }
                return true;
            }
        } catch (error) {
            console.error('Error unregistering service worker:', error);
        }
        return false;
    }

    // Function to clear caches
    async function clearCaches() {
        try {
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
                console.log('Caches cleared');
                return true;
            }
        } catch (error) {
            console.error('Error clearing caches:', error);
        }
        return false;
    }

    // Run on page load
    window.addEventListener('load', async function() {
        // Check if cache has already been cleared in this session
        if (sessionStorage.getItem('cacheCleared') === 'true') {
            console.log('Cache already cleared in this session, skipping...');
            return;
        }

        const serviceWorkerUnregistered = await unregisterServiceWorker();
        const cachesCleared = await clearCaches();
        
        if (serviceWorkerUnregistered || cachesCleared) {
            console.log('Cache cleared. Reloading page...');
            // Set flag to indicate cache has been cleared
            sessionStorage.setItem('cacheCleared', 'true');
            // Force reload without cache
            window.location.reload(true);
        } else {
            // If nothing was cleared, still set the flag to prevent future attempts
            sessionStorage.setItem('cacheCleared', 'true');
        }
    });
})(); 