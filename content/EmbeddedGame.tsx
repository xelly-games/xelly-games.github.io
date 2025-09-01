import {useEffect, useRef} from 'react';

export default function EmbeddedGame({src, width}: {
    src: string;
    width: number;
}) {
    const ref = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const origin = new URL(src).origin;
        const onMsg = (e: MessageEvent) => {
            if (e.origin !== origin) {
                return;
            }
            if (e.source !== ref.current.contentWindow) {
                return;
            }
            const d = (e.data || {}) as any;
            if (d.type !== 'xg-embed-size') {
                return;
            }
            if (ref.current) {
                ref.current.style.height = Math.ceil(d.h) + 'px';
            }
        };
        // we don't expect a lot of instances of this, so we'll add a listener
        //  here for every instantiation; alternatively could have single
        //  listener and keep registry of instances/refs and handle
        //  dispatching appropriately.
        window.addEventListener('message', onMsg);
        return () => window.removeEventListener('message', onMsg);
    }, [/*empty array to only run once, at component mount*/]);

    // referrerPolicy="origin" allows the child to read document.referrer to get
    //   the parent origin in order determine origin to postMessage to
    return <iframe referrerPolicy="origin" ref={ref} src={src} width={width}
        style={{border: 0}}/>;
};
