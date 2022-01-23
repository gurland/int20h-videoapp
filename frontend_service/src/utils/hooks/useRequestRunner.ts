import { useState } from 'react';

export function useRequestRunner(
    requestFunc: (...args: never[]) => Promise<unknown>,
    onError?: (error: unknown) => void,
) {
    const [loading, setLoading] = useState(false);
    const runner = async (...args: never[]) => {
        setLoading(true);
        try {
            const result = await requestFunc(...args);
            setLoading(false);
            return result;
        } catch (e) {
            setLoading(false);
            if (onError) onError(e);
            return e;
        }
    };

    return [runner, loading];
}
