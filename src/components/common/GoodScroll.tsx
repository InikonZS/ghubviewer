import React, { useEffect, useMemo, useRef, useState } from "react";
import "./GoodScroll.css";

export const GoodScroll = ({children, className}: {className?: string} & React.PropsWithChildren)=>{
    const ref = useRef<HTMLDivElement>(null);
    const [showScroll, setShowScroll] = useState(false);
    const [scrollState, setScrollState] = useState({
        top: 0,
        height: 1
    });
    const scrollWidth = useMemo(()=>{
        const hidden = document.createElement('div');
        hidden.style.visibility = 'hidden';
        hidden.style.overflow = 'hidden';
        hidden.style.pointerEvents = 'none';
        hidden.style.position = 'fixed';
        hidden.style.width = '0px';
        hidden.style.height = '0px';

        const scroll = document.createElement('div');
        scroll.style.visibility = 'hidden';
        scroll.style.overflow = 'scroll';
        scroll.style.pointerEvents = 'none';
        scroll.style.position = 'fixed';
        scroll.style.width = '50px';
        scroll.style.height = '50px';
        hidden.append(scroll);
        document.body.append(hidden);
        const scrollSize = scroll.getBoundingClientRect().width - scroll.clientWidth;
        console.log('detect scroll size', scrollSize);
        hidden.remove();
        return scrollSize;
    }, []);

    const updateScroll = ()=>{
        const scroll = ref.current;
        const maxTop = scroll.scrollHeight / scroll.clientHeight;
        setScrollState({top: (scroll.scrollTop) / (scroll.clientHeight)  * 100 /maxTop, height: 100 /maxTop});
    }

    useEffect(()=>{
        if(!ref.current){
            return;
        }
        updateScroll();
        const handler = ()=>{
            updateScroll();
        };
        window.addEventListener('resize', handler);
        return ()=> window.removeEventListener('resize', handler);
    }, [ref]);

    useEffect(()=>{
        if(!ref.current){
            return;
        }

        const config: MutationObserverInit = { attributes: true, childList: true, subtree: true, characterData: true};
        // Callback function to execute when mutations are observed
        const callback: MutationCallback = (mutationList, _observer) => {
            updateScroll();
            ref.current.ontransitionend = ()=>{
                updateScroll();
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(ref.current, config);
        return ()=>{
            observer.disconnect();
        }
    }, [ref.current]);

    return <div className={`GoodScroll ${showScroll ? 'GoodScroll--hover': ''} ${className ? className : ''}`} style={{"--scrollSize": scrollWidth+'px'} as any}
        onMouseEnter={()=>{
            setShowScroll(true)
        }}
        onMouseMove={()=>{
            setShowScroll(true);
        }}
        onMouseLeave={()=>{
            setShowScroll(false)
        }}
    >
        <div className="GoodScroll_relativeSizer">
        <div ref={ref} className="GoodScroll_realScroll" onScroll={(e)=>{
            updateScroll();
        }}>
            <div className="GoodScroll_content_zero">
                <div className="GoodScroll_content">
                    {children}
                </div>
            </div>
        </div>
        <div className="GoodScroll_visualScroll" style={{ display: scrollState.height >=100 ? "none" : ""}}>
            <div className="GoodScroll_visualScroll_bar" style={{userSelect: "none", top: scrollState.top + '%', height: scrollState.height + '%'}} onMouseDown={(downEvent)=>{
                const initialOffset = downEvent.clientY;
                const initialTop = ref.current.scrollTop
                const moveHandler = (moveEvent: MouseEvent)=>{
                    setShowScroll(true);
                    if(!ref.current){
                        return;
                    }
                    const scroll = ref.current;
                    const maxTop = scroll.scrollHeight / scroll.clientHeight;
                    ref.current.scrollTo(0, (moveEvent.clientY - initialOffset) * maxTop + initialTop);
                }
                const upHandler = (moveEvent: MouseEvent)=>{
                    setShowScroll(false);
                    window.removeEventListener('mousemove', moveHandler);
                    window.removeEventListener('mouseup', upHandler);
                }
                window.addEventListener('mousemove', moveHandler);
                window.addEventListener('mouseup', upHandler);
            }}>
                <div className="GoodScroll_visualScroll_bar_colored"></div>
            </div>
        </div>
        <div className="GoodScroll_gradient GoodScroll_gradient_top"></div>
        <div className="GoodScroll_gradient GoodScroll_gradient_bottom"></div>
        </div>
        
    </div>
}