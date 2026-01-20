import { useState, useEffect } from 'react';

const HealthCheck = () => {
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [data, setData] = useState(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                // Access environment variable in Vite
                const apiUrl = import.meta.env.VITE_API_URL;

                if (!apiUrl) {
                    throw new Error('VITE_API_URL is not defined');
                }

                console.log('Connecting to:', apiUrl);

                const response = await fetch(`${apiUrl}/api/health`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
                setStatus('success');
            } catch (error) {
                console.error('Health check failed:', error);
                setStatus('error');
            }
        };

        checkHealth();
    }, []);

    // UI States
    if (status === 'loading') {
        return (
            <div className="p-4 rounded-lg bg-gray-100 animate-pulse">
                <p className="text-gray-600">Connecting to server...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <h3 className="font-bold text-red-700">❌ Connection Failed</h3>
                <p className="text-red-600 text-sm mt-1">
                    Could not reach backend. Check your internet or API URL.
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <h3 className="font-bold text-green-700">✅ Backend Online</h3>
            <div className="mt-2 p-2 bg-white rounded border border-green-100 text-xs font-mono text-gray-600">
                <p>Status: {data.status}</p>
                <p>Time: {data.timestamp}</p>
            </div>
        </div>
    );
};

export default HealthCheck;
