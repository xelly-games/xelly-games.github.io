import {useEffect, useMemo, useRef} from 'react';

export default function EmbeddedGame({src, width}: {
    src: string;
    width: number;
}) {
    const ref = useRef<HTMLIFrameElement>(null);
    const myId = `xg-${Math.random().toString(36).slice(2, 9)}`;

    const finalSrc = useMemo(() => {
        try {
            const u = new URL(src);
            const params = new URLSearchParams(u.hash.replace(/^#/, ''));
            params.set('id', myId);
            u.hash = params.toString();
            return u.toString();
        } catch {
            return src + (src.includes("#") ? "&" : "#") + "id=" + encodeURIComponent(myId);
        }
    }, [src]);

    useEffect(() => {
        const origin = new URL(src).origin;
        const onMsg = (e: MessageEvent) => {
            console.log('[EmbeddedGame]', 'onMsg', e); // todo lose
            if (e.origin !== origin) {
                return;
            }
            const d = (e.data || {}) as any;
            console.log('[EmbeddedGame]', '<data>', d.type, d.id); // todo lose
            if (d.type !== 'xg-embed-size' || d.id !== myId) {
                return;
            }
            if (ref.current) {
                ref.current.style.height = Math.ceil(d.h) + 'px';
            }
        };
        window.addEventListener('message', onMsg);
        return () => window.removeEventListener('message', onMsg);
    }, [src]);

    // referrerPolicy="origin" allows the child to read document.referrer to get
    //   the parent origin in order determine origin to postMessage to
    return <iframe referrerPolicy="origin" ref={ref} src={finalSrc} width={width}
        style={{border: 0}}/>;
};
