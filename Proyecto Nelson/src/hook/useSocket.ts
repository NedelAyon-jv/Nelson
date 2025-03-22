import { useEffect, useRef, useState } from "react"

export const useSocket = ({url}:{url:string}) => {
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);
  
    useEffect(() => {
      const socket = new WebSocket(url);
      socket.binaryType = "arraybuffer"; // Enable binary support
  
      socket.onopen = () => setIsReady(true);
      socket.onclose = () => setIsReady(false);
      socket.onmessage = (event) => {
        setVal(event.data)
      };
  
      ws.current = socket;
  
      return () => {
        socket.close();
      };
    }, [url]);
  
    const send = (data: string | Blob | File) => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(data);
      }
    };
  
    return [isReady, val, send] as const;
}
