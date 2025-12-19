"use client";

import { useEffect, useState } from "react";

export default function SnowEffect() {
    const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; animationDuration: number; animationDelay: number; opacity: number; size: number }>>([]);

    useEffect(() => {
        const count = 50;
        const flakes = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // percentage
            animationDuration: Math.random() * 5 + 5, // 5-10s
            animationDelay: Math.random() * 5, // 0-5s
            opacity: Math.random() * 0.5 + 0.3,
            size: Math.random() * 10 + 10, // 10-20px
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute top-[-20px] text-red-400 animate-snowfall"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        opacity: flake.opacity,
                        fontSize: `${flake.size}px`,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
}
